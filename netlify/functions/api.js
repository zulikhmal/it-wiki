const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const serverless = require('serverless-http');

const app = express();

// Force correct paths for Netlify's serverless environment
const DOCS_DIR = path.resolve(process.env.LAMBDA_TASK_ROOT || __dirname, '../../docs');
const VIEWS_DIR = path.resolve(process.env.LAMBDA_TASK_ROOT || __dirname, '../../views');
const PUBLIC_DIR = path.resolve(process.env.LAMBDA_TASK_ROOT || __dirname, '../../public');

app.use(express.static(PUBLIC_DIR));

// Home: List all SOP documents
app.get('/', (req, res) => {
    if (!fs.existsSync(DOCS_DIR)) {
        // Fallback search path if lambda root differs
        const altDocs = path.join(process.cwd(), 'docs');
        if (!fs.existsSync(altDocs)) {
            return res.status(500).send(`Docs directory missing. Looked at: ${DOCS_DIR} and ${altDocs}`);
        }
    }

    const activeDocsDir = fs.existsSync(DOCS_DIR) ? DOCS_DIR : path.join(process.cwd(), 'docs');
    const activeViewsDir = fs.existsSync(VIEWS_DIR) ? VIEWS_DIR : path.join(process.cwd(), 'views');

    fs.readdir(activeDocsDir, (err, files) => {
        if (err) return res.status(500).send('Unable to scan docs directory.');

        const docs = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(activeDocsDir, file);
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

        const templatePath = path.join(activeViewsDir, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        const finalHtml = template.replace('{{DOC_LIST}}', listHtml);

        res.send(finalHtml);
    });
});

// View single SOP document
app.get('/doc/:slug', (req, res) => {
    const slug = req.params.slug;
    const activeDocsDir = fs.existsSync(DOCS_DIR) ? DOCS_DIR : path.join(process.cwd(), 'docs');
    const activeViewsDir = fs.existsSync(VIEWS_DIR) ? VIEWS_DIR : path.join(process.cwd(), 'views');
    
    const filePath = path.join(activeDocsDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Document not found.');
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked.parse(content);

    const templatePath = path.join(activeViewsDir, 'view.html');
    let template = fs.readFileSync(templatePath, 'utf8');
    const finalHtml = template
        .replace('{{TITLE}}', data.title || slug)
        .replace('{{CONTENT}}', htmlContent);

    res.send(finalHtml);
});

module.exports.handler = serverless(app);