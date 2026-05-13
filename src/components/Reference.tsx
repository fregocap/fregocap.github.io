import React, { useState, useEffect } from 'react';

interface PostData {
  slug: string;
  title: string;
  description: string;
}

interface Props {
  slug: string;
  text?: string;
}

const Reference: React.FC<Props> = ({ slug, text }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Read from pre-injected global metadata
    const metadata = (window as any).__POSTS_METADATA__;
    if (metadata) {
      const found = metadata.find((p: PostData) => p.slug === slug);
      if (found) setPost(found);
    }
  }, [slug]);

  return (
    <span 
      className="relative inline-block group"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <a 
        href={`/blog/${slug}`} 
        className="text-orange-600 hover:text-orange-700 transition-colors border-none font-medium cursor-pointer"
      >
        {text || (post ? post.title : slug)}
      </a>

      {showPreview && post && (
        <div className="absolute left-0 bottom-full mb-3 w-80 p-6 bg-white border border-slate-200 shadow-2xl rounded-2xl z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            Internal Reference
          </div>
          <h4 className="text-sm font-sans font-bold text-slate-900 mb-2 leading-tight">
            {post.title}
          </h4>
          <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3 mb-0 italic font-light">
            "{post.description}"
          </p>
          <div className="absolute left-6 -bottom-2 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45"></div>
        </div>
      )}
    </span>
  );
};

export default Reference;
