import React, { useEffect, useRef } from 'react';

const Comments: React.FC = () => {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "fregocap/fregocap.github.io");
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkyNzM3OTk1NDQ=");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDON7u0tM4CnR7c"); // Placeholder ID
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="mt-24 pt-12 border-t border-slate-100">
      <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-slate-400 mb-12">
        Discussion
      </h3>
      <div ref={commentsRef} />
    </div>
  );
};

export default Comments;
