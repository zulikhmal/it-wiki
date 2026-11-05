const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
// `marked` is an ES-module-only package, so it must be loaded with a dynamic
// import() instead of require() (require() of ESM fails in the Netlify runtime).
let markedPromise;
const getMarked = () => (markedPromise ||= import('marked').then(m => m.marked));
const matter = require('gray-matter');
const serverless = require('serverless-http');

});

// View single SOP document
app.get('/doc/:slug', (req, res) => {
app.get('/doc/:slug', async (req, res) => {
    const slug = req.params.slug;
    const targetDocs = fs.existsSync(DOCS_DIR) ? DOCS_DIR : path.join(process.cwd(), 'docs');
    const targetViews = fs.existsSync(VIEWS_DIR) ? VIEWS_DIR : path.join(process.cwd(), 'views');

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
