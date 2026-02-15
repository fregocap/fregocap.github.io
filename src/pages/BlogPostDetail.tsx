
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';
import { BlogPost } from '../../types';
import SEO from '../components/SEO';

const BlogPostDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [copyFeedback, setCopyFeedback] = useState(false);

    useEffect(() => {
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
            setSelectedPost(post);
        } else {
            // Handle 404 - post not found
            navigate('/blog');
        }
    }, [slug, navigate]);

    if (!selectedPost) return null;

    const handleTwitterShare = (post: BlogPost) => {
        const text = encodeURIComponent(`Analyzing strategic wealth with labfab.io: ${post.title}`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };

    const handleGeneralShare = async (post: BlogPost) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `labfab.io | ${post.title}`,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (err) {
                console.debug('Share cancelled or failed', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        }
    };

    return (
        <div className="py-12 px-4 md:px-0 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title={selectedPost.title}
                description={selectedPost.excerpt}
                image={selectedPost.imageUrl}
                type="article"
            />
            <button
                onClick={() => navigate('/blog')}
                className="mb-10 flex items-center gap-3 text-slate-400 hover:text-slate-800 font-bold transition-all group"
            >
                <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i> Back to Insights
            </button>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-4 py-1.5 rounded-xl font-bold uppercase tracking-[0.2em]">{selectedPost.category}</span>
                    <span className="text-slate-400 text-sm font-medium">{selectedPost.date} • {selectedPost.readTime} read</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-lexend font-extrabold text-slate-900 leading-[1.1] mb-8">
                    {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 py-6 border-y border-slate-100">
                    <img src={selectedPost.author === 'Fabio' ? '/about_me.png' : `https://i.pravatar.cc/100?u=${selectedPost.author}`} className="w-14 h-14 rounded-2xl object-cover shadow-lg" alt={selectedPost.author} />
                    <div>
                        <div className="text-base font-bold text-slate-800">{selectedPost.author}</div>
                        <div className="text-xs text-slate-400 font-medium">Strategic Advisor, labfab.io</div>
                    </div>
                    <div className="ml-auto flex items-center gap-3 relative">
                        {copyFeedback && (
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                                Link Copied!
                            </span>
                        )}
                        <button
                            onClick={() => handleTwitterShare(selectedPost)}
                            title="Share on X (Twitter)"
                            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm active:scale-95"
                        >
                            <i className="fa-brands fa-x-twitter"></i>
                        </button>
                        <button
                            onClick={() => handleGeneralShare(selectedPost)}
                            title="Copy or Share"
                            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm active:scale-95"
                        >
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                    </div>
                </div>
            </header>

            <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl mb-16 relative">
                <img src={selectedPost.imageUrl} className="w-full h-full object-cover" alt={selectedPost.title} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                    <div
                        className="prose prose-slate prose-lg max-w-none text-slate-600 prose-headings:font-lexend prose-headings:text-slate-900 prose-strong:text-slate-900"
                        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-slate-100">
                        <h3 className="font-lexend font-bold text-2xl text-slate-900 mb-8">Related Strategy</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {BLOG_POSTS.filter(p => p.id !== selectedPost.id).slice(0, 2).map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => { navigate(`/blog/${p.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-100">
                                        <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.title} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{p.title}</h4>
                                    <p className="text-xs text-slate-400 mt-2">{p.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-8">
                        <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-900/20">
                            <h3 className="text-xl font-lexend font-bold mb-4">Want a personal exit roadmap?</h3>
                            <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                                I offer direct consulting for traders and high-net-worth individuals aiming for FIRE.
                            </p>
                            <button
                                onClick={() => window.open('https://calendly.com/capela625/review', '_blank')}
                                className="w-full py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-700/40"
                            >
                                Book Strategy Session
                            </button>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <h3 className="text-xl font-lexend font-bold mb-3 relative z-10"><i className="fa-regular fa-paper-plane mr-2 text-emerald-400"></i> Money Milestones</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10">
                                Join my personal newsletter for weekly insights on wealth building and FIRE strategies.
                            </p>
                            <button
                                onClick={() => window.open('https://substack.com/@moneymilestones', '_blank')}
                                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95 relative z-10"
                            >
                                Subscribe for Free
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-fire text-orange-500"></i> Trending now
                            </h4>
                            <div className="space-y-6">
                                {BLOG_POSTS.slice(0, 3).map((p, i) => (
                                    <div key={p.id} className="flex gap-4 group cursor-pointer" onClick={() => { navigate(`/blog/${p.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                        <span className="text-2xl font-lexend font-black text-slate-100 group-hover:text-emerald-100 transition-colors">0{i + 1}</span>
                                        <div className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">{p.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;
