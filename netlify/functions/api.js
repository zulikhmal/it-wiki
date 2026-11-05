const express = require('express');
const fs = require('fs');
const path = require('path');
// `marked` is an ES-module-only package, so it must be loaded with a dynamic
// import() instead of require() (require() of ESM fails in the Netlify runtime).
let markedPromise;
const getMarked = () => (markedPromise ||= import('marked').then(m => m.marked));
const matter = require('gray-matter');
const serverless = require('serverless-http');

const app = express();

// Resolve paths safely for Netlify Lambda environment
const DOCS_DIR = path.resolve(__dirname, '../../docs');
const VIEWS_DIR = path.resolve(__dirname, '../../views');
const PUBLIC_DIR = path.resolve(__dirname, '../../public');

app.use(express.static(PUBLIC_DIR));

// Home: List all SOP documents
app.get('/', (req, res) => {
    // Fallback check for serverless root
    const targetDocs = fs.existsSync(DOCS_DIR) ? DOCS_DIR : path.join(process.cwd(), 'docs');
    const targetViews = fs.existsSync(VIEWS_DIR) ? VIEWS_DIR : path.join(process.cwd(), 'views');

    if (!fs.existsSync(targetDocs)) {
        return res.status(500).send(`Error: Docs folder not found. Checked: ${DOCS_DIR} and ${targetDocs}`);
    }

    fs.readdir(targetDocs, (err, files) => {
        if (err) return res.status(500).send('Unable to scan docs directory.');

        const docs = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(targetDocs, file);
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

        const templatePath = path.join(targetViews, 'index.html');
        if (!fs.existsSync(templatePath)) {
            return res.status(500).send(`Error: index.html template not found at ${templatePath}`);
        }

        let template = fs.readFileSync(templatePath, 'utf8');
        const finalHtml = template.replace('{{DOC_LIST}}', listHtml);

        res.send(finalHtml);
    });
});

// View single SOP document
app.get('/doc/:slug', async (req, res) => {
    const slug = req.params.slug;
    const targetDocs = fs.existsSync(DOCS_DIR) ? DOCS_DIR : path.join(process.cwd(), 'docs');
    const targetViews = fs.existsSync(VIEWS_DIR) ? VIEWS_DIR : path.join(process.cwd(), 'views');
    
    const filePath = path.join(targetDocs, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Document not found.');
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const marked = await getMarked();
    const htmlContent = marked.parse(content);

    const templatePath = path.join(targetViews, 'view.html');
    let template = fs.readFileSync(templatePath, 'utf8');
    const finalHtml = template
        .replace('{{TITLE}}', data.title || slug)
        .replace('{{CONTENT}}', htmlContent);

    res.send(finalHtml);
});

module.exports.handler = serverless(app);