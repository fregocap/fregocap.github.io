import React, { useEffect, useState } from 'react';

interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const TableOfContents: React.FC<Props> = ({ headings = [] }) => {
  const [activeId, setActiveId] = useState<string>('');
  const filteredHeadings = headings.filter((h) => h.depth > 1 && h.depth < 4);

  useEffect(() => {
    if (!filteredHeadings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    filteredHeadings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredHeadings]);

  if (!filteredHeadings.length) return null;

  return (
    <nav className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-4">
      <ul className="space-y-3 border-l border-gray-100">
        {filteredHeadings.map((heading) => (
          <li 
            key={heading.slug}
            style={{ paddingLeft: `${(heading.depth - 1) * 1}rem` }}
          >
            <a
              href={`#${heading.slug}`}
              className={`block text-sm font-medium leading-tight transition-colors border-none ${
                activeId === heading.slug
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
