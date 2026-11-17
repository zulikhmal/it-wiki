const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, 'docs');
const VIEWS_DIR = path.join(__dirname, 'views');
const OUT_DIR = path.join(__dirname, 'public');

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const files = fs.readdirSync(DOCS_DIR);
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

// 1. Build Document List HTML with category badges
const listHtml = docs.map(d => `
    <li>
        <a href="/doc/${d.slug}.html">
            <span class="title">${d.title}</span>
            <span class="badge">${d.category}</span>
        </a>
    </li>
`).join('');

let indexTemplate = fs.readFileSync(path.join(VIEWS_DIR, 'index.html'), 'utf8');
let finalIndexHtml = indexTemplate.replace('{{DOC_LIST}}', listHtml);
fs.writeFileSync(path.join(OUT_DIR, 'index.html'), finalIndexHtml);
console.log('✓ Generated static index.html');

// 2. Build Individual Document Pages
const docOutDir = path.join(OUT_DIR, 'doc');
if (!fs.existsSync(docOutDir)) {
    fs.mkdirSync(docOutDir, { recursive: true });
}

files.filter(file => file.endsWith('.md')).forEach(file => {
    const slug = file.replace('.md', '');
    const filePath = path.join(DOCS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked.parse(content);

    let viewTemplate = fs.readFileSync(path.join(VIEWS_DIR, 'view.html'), 'utf8');
    let finalViewHtml = viewTemplate
        .replace('{{TITLE}}', data.title || slug)
        .replace('{{CONTENT}}', htmlContent);

    fs.writeFileSync(path.join(docOutDir, `${slug}.html`), finalViewHtml);
    console.log(`✓ Generated static page for: ${slug}`);
});

console.log('Static site build complete!');