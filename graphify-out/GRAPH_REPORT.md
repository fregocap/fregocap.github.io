# Graph Report - .  (2026-06-11)

## Corpus Check
- Large corpus: 62 files · ~2,858,312 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 70 nodes · 63 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Core Dependencies|Core Dependencies]]
- [[_COMMUNITY_Routing & Navigation|Routing & Navigation]]
- [[_COMMUNITY_Project Manifest|Project Manifest]]
- [[_COMMUNITY_Post Components & Layout|Post Components & Layout]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Reference Component|Reference Component]]
- [[_COMMUNITY_Vite Environment|Vite Environment]]

## God Nodes (most connected - your core abstractions)
1. `../../layouts/Layout.astro` - 7 edges
2. `scripts` - 6 edges
3. `compilerOptions` - 5 edges
4. `paths` - 2 edges
5. `getPostsMetadata()` - 2 edges
6. `dev` - 1 edges
7. `build` - 1 edges
8. `preview` - 1 edges
9. `astro` - 1 edges
10. `@astrojs/mdx` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (12 total, 2 thin omitted)

### Community 0 - "Core Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, astro, @astrojs/mdx, @astrojs/react, @astrojs/tailwind, lucide-react, react, react-dom (+8 more)

### Community 1 - "Routing & Navigation"
Cohesion: 0.20
Nodes (7): blog, collections, getPostsMetadata(), posts, ../../layouts/Layout.astro, ../data/posts, ../styles/global.css

### Community 2 - "Project Manifest"
Cohesion: 0.20
Nodes (9): name, scripts, astro, build, dev, preview, start, type (+1 more)

### Community 3 - "Post Components & Layout"
Cohesion: 0.22
Nodes (3): Props, ../../components/Comments, ../../components/TableOfContents

### Community 4 - "TypeScript Config"
Cohesion: 0.25
Nodes (7): compilerOptions, baseUrl, jsx, jsxImportSource, paths, extends, @/*

## Knowledge Gaps
- **37 isolated node(s):** `name`, `version`, `type`, `dev`, `start` (+32 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Core Dependencies` to `Project Manifest`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `../../layouts/Layout.astro` connect `Routing & Navigation` to `Post Components & Layout`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `version`, `type` to the rest of the system?**
  _37 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._