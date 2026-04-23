import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BLOG_POSTS } from '../../constants';
import SEO from '../components/SEO';
import { LocalizedString } from '../../types';

const BlogPostDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isCopied, setIsLangCopied] = useState(false);

    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Article not found</h2>
                <button onClick={() => navigate('/blog')} className="mt-6 text-emerald-600 font-bold hover:underline">
                    Back to Blog
                </button>
            </div>
        );
    }

    const getLocalized = (field: string | LocalizedString) => {
        if (typeof field === 'string') return field;
        const lang = i18n.language as keyof LocalizedString;
        return field[lang] || field.en;
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsLangCopied(true);
        setTimeout(() => setIsLangCopied(false), 2000);
    };

    return (
        <div className="py-12 px-4 md:px-0 max-w-7xl mx-auto">
            <SEO 
                title={getLocalized(post.title)}
                description={getLocalized(post.excerpt)}
            />
            
            <div className="flex flex-col lg:flex-row gap-16">
                <article className="lg:w-2/3">
                    <div className="mb-10">
                        <button 
                            onClick={() => navigate('/blog')}
                            className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2 mb-8 group"
                        >
                            <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i> Back to Research
                        </button>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-widest border border-emerald-100">{getLocalized(post.category)}</span>
                            <span className="text-slate-400 text-sm font-medium">{post.date}</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-lexend font-bold text-slate-900 leading-tight mb-8">
                            {getLocalized(post.title)}
                        </h1>

                        <div className="flex items-center justify-between border-y border-slate-100 py-6 mb-10">
                            <div className="flex items-center gap-4">
                                <img src={post.author === 'Fabio' ? '/about_me.png' : `https://i.pravatar.cc/100?u=${post.author}`} className="w-12 h-12 rounded-2xl object-cover shadow-md" alt={post.author} />
                                <div>
                                    <div className="text-sm font-bold text-slate-800 uppercase tracking-widest">{post.author}</div>
                                    <div className="text-xs text-slate-400 font-medium">Strategic Advisor • {post.readTime} read</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleShare}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 ${isCopied ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-400 hover:bg-emerald-50'}`}
                                >
                                    <i className={`fa-solid ${isCopied ? 'fa-check' : 'fa-share-nodes'}`}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                        <img src={post.imageUrl} className="w-full h-full object-cover" alt={getLocalized(post.title)} />
                    </div>

                    <div 
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-lexend prose-headings:font-bold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-[2.5rem] prose-img:shadow-xl"
                        dangerouslySetInnerHTML={{ __html: getLocalized(post.content) }}
                    />
                </article>

                <aside className="lg:w-1/3 space-y-12">
                    {/* Newsletter Widget */}
                    <div className="bg-emerald-600 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-lexend font-bold mb-3 relative z-10"><i className="fa-regular fa-paper-plane mr-2 text-emerald-400"></i> {t('home.newsletter_badge')}</h3>
                            <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed font-light">
                                {t('home.newsletter_desc')}
                            </p>
                            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                                <iframe 
                                    src="https://freedomcents.substack.com/embed" 
                                    width="100%" 
                                    height="320" 
                                    style={{ border: 'none', background: 'white' }} 
                                    frameBorder="0" 
                                    scrolling="no"
                                    title="Substack Newsletter"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Trending Sidebar */}
                    <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase text-[10px] tracking-widest text-slate-400">
                            <i className="fa-solid fa-fire text-orange-500"></i> {t('blog.trending', 'Trending now')}
                        </h4>
                        <div className="space-y-8">
                            {BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3).map((p, idx) => (
                                <div 
                                    key={p.id} 
                                    onClick={() => { navigate(`/blog/${p.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="group cursor-pointer flex gap-4"
                                >
                                    <div className="text-2xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors">0{idx + 1}</div>
                                    <div>
                                        <h5 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-600 transition-colors">{getLocalized(p.title)}</h5>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">{getLocalized(p.category)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900 rounded-[3rem] text-white">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-flask text-emerald-400"></i> {t('common.coaching')}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                            Ready to accelerate your journey? Let's build your custom roadmap together.
                        </p>
                        <button 
                            onClick={() => navigate('/coaching')}
                            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95 relative z-10"
                        >
                            {t('common.cta_book')}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BlogPostDetail;
