import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

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
    image = 'https://labfab.io/labfab-logo.png',
    url = 'https://labfab.io',
    type = 'website'
}) => {
    const { i18n } = useTranslation();
    const siteTitle = 'labfab.io';
    const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
    const currentUrl = url + (window.location.pathname !== '/' ? window.location.pathname : '');

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <html lang={i18n.language} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical Link */}
            <link rel="canonical" href={currentUrl} />

            {/* Hreflang for localized versions */}
            <link rel="alternate" hrefLang="en" href={`${url}${window.location.pathname}`} />
            <link rel="alternate" hrefLang="pt" href={`${url}${window.location.pathname}`} />
            <link rel="alternate" hrefLang="fr" href={`${url}${window.location.pathname}`} />
            <link rel="alternate" hrefLang="x-default" href={`${url}${window.location.pathname}`} />
        </Helmet>
    );
};

export default SEO;
