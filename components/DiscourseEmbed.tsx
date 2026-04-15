import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DiscourseEmbed: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Clean up previous discourse comments
    const container = document.getElementById('discourse-comments');
    if (container) {
      container.innerHTML = '';
    }

    // Set Discourse configurations
    (window as any).DiscourseEmbed = {
      discourseUrl: 'https://labfab.discourse.group/',
      discourseEmbedUrl: window.location.href,
    };

    // Load the Discourse embed script
    const d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = (window as any).DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
    
    document.body.appendChild(d);

    return () => {
      // Cleanup script on unmount or route change to prevent duplicates
      if (document.body.contains(d)) {
        document.body.removeChild(d);
      }
    };
  }, [location.pathname]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-12 px-6">
      <div id="discourse-comments"></div>
    </div>
  );
};

export default DiscourseEmbed;
