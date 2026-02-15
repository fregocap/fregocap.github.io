import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image = 'https://labfab.io/og-image.jpg',
    url = 'https://labfab.io',
    type = 'website'
}) => {
    // Simple effect to update title
    useEffect(() => {
        const siteTitle = 'Financial Independence Hub';
        const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
        document.title = fullTitle;

        // We could also manually update meta tags here if needed, 
        // but for now let's just ensure the app doesn't crash.
    }, [title]);

    return null;
};

export default SEO;
