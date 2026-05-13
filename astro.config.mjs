import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://fregocap.github.io',
  base: '/', 
  integrations: [react(), mdx(), tailwind()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeMathjax,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }]
    ],
  },
});
