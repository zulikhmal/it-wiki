const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

const app = express();
const PORT = process.env.PORT || 3000;
const DOCS_DIR = path.join(__dirname, 'docs');
const VIEWS_DIR = path.join(__dirname, 'views');

app.use(express.static('public'));

// Home: List all SOP documents
app.get('/', (req, res) => {
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

        // Generate list items HTML
        const listHtml = docs.map(d => `
            <li>
                <a href="/doc/${d.slug}">
                    <span class="title">${d.title}</span>
                    <span class="badge">${d.category}</span>
                </a>
            </li>
        `).join('');

        // Read template and replace placeholder
        let template = fs.readFileSync(path.join(VIEWS_DIR, 'index.html'), 'utf8');
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

    // Read template and replace placeholders
    let template = fs.readFileSync(path.join(VIEWS_DIR, 'view.html'), 'utf8');
    const finalHtml = template
        .replace('{{TITLE}}', data.title || slug)
        .replace('{{CONTENT}}', htmlContent);

    res.send(finalHtml);
});

app.listen(PORT, () => {
    console.log(`IT Wiki running on http://localhost:${PORT}`);
});