const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const serverless = require('serverless-http');

const app = express();

// Smart path resolution for Netlify serverless environment
const DOCS_DIR = fs.existsSync(path.join(__dirname, '../../docs'))
    ? path.join(__dirname, '../../docs')
    : path.join(process.cwd(), 'docs');

const VIEWS_DIR = fs.existsSync(path.join(__dirname, '../../views'))
    ? path.join(__dirname, '../../views')
    : path.join(process.cwd(), 'views');

const PUBLIC_DIR = fs.existsSync(path.join(__dirname, '../../public'))
    ? path.join(__dirname, '../../public')
    : path.join(process.cwd(), 'public');

app.use(express.static(PUBLIC_DIR));

// Home: List all SOP documents
app.get('/', (req, res) => {
    if (!fs.existsSync(DOCS_DIR)) {
        return res.status(500).send(`Docs directory not found at: ${DOCS_DIR}`);
    }

    fs.readdir(DOCS_DIR, (err, files) => {
        if (err) return res.status(500).send('Unable to scan docs directory.');

        const docs = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(DOCS_DIR, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(content);
                return {
                    slug: file.replace('.md', ''),
                    title: data.title || file,
                    category: data.category || 'General',
                    date: data.date || ''
                };
            });

        const listHtml = docs.map(d => `
            <li>
                <a href="/doc/${d.slug}">
                    <span class="title">${d.title}</span>
                    <span class="badge">${d.category}</span>
                </a>
            </li>
        `).join('');

        const templatePath = path.join(VIEWS_DIR, 'index.html');
        if (!fs.existsSync(templatePath)) {
            return res.status(500).send(`Template not found at: ${templatePath}`);
        }

        let template = fs.readFileSync(templatePath, 'utf8');
        const finalHtml = template.replace('{{DOC_LIST}}', listHtml);

        res.send(finalHtml);
    });
});

// View single SOP document
app.get('/doc/:slug', (req, res) => {
    const slug = req.params.slug;
    const filePath = path.join(DOCS_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Document not found.');
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked.parse(content);

    const templatePath = path.join(VIEWS_DIR, 'view.html');
    let template = fs.readFileSync(templatePath, 'utf8');
    const finalHtml = template
        .replace('{{TITLE}}', data.title || slug)
        .replace('{{CONTENT}}', htmlContent);

    res.send(finalHtml);
});

module.exports.handler = serverless(app);