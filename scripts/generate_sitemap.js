import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const constantsPath = path.join(__dirname, '../constants.tsx');
  const content = fs.readFileSync(constantsPath, 'utf-8');
  
  // Extract all slugs
  const slugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
  
  const baseUrl = 'https://labfab.io';
  const staticPages = [
    '',
    '/start',
    '/about',
    '/tools',
    '/coaching',
    '/resources',
    '/portfolio',
    '/blog'
  ];

  const date = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page}"/>
    <xhtml:link rel="alternate" hreflang="pt" href="${baseUrl}${page}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${page}"/>
  </url>
`;
  });

  // Add blog posts
  slugs.forEach(slug => {
    xml += `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="pt" href="${baseUrl}/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/blog/${slug}"/>
  </url>
`;
  });

  xml += '</urlset>';

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  console.log(`✅ Sitemap generated with ${staticPages.length + slugs.length} URLs.`);
}

generateSitemap().catch(console.error);
