import React, { useEffect, useState } from 'react';

interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const TableOfContents: React.FC<Props> = ({ headings = [] }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

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

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4">
      <h3 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
        Contents
      </h3>
      <ul className="space-y-4">
        {headings
          .filter((h) => h.depth > 1 && h.depth < 4)
          .map((heading) => (
            <li 
              key={heading.slug}
              style={{ paddingLeft: `${(heading.depth - 2) * 1}rem` }}
            >
              <a
                href={`#${heading.slug}`}
                className={`block text-xs font-sans font-bold leading-tight transition-all duration-300 border-none ${
                  activeId === heading.slug
                    ? 'text-orange-600 translate-x-1'
                    : 'text-slate-400 hover:text-slate-600'
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
