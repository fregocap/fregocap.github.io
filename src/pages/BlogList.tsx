import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';

const BlogList: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');

    const filteredPosts = categoryFilter
        ? BLOG_POSTS.filter(post => post.category.toLowerCase() === categoryFilter.toLowerCase())
        : BLOG_POSTS;

    const trendingPosts = BLOG_POSTS.slice(0, 3); // Just taking the first 3 for now
    const mustReads = BLOG_POSTS.slice(3, 6); // And the next 3

    return (
        <div className="py-12 px-4 md:px-0 max-w-7xl mx-auto">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-lexend font-bold text-slate-900 mb-2">Financial Research & Articles</h1>
                    {categoryFilter ? (
                        <p className="text-slate-500 text-lg">
                            Showing articles in <span className="text-emerald-600 font-bold capitalize">{categoryFilter}</span>
                        </p>
                    ) : (
                        <p className="text-slate-500 text-lg">Deep dives into the math and psychology of financial independence.</p>
                    )}
                </div>
                {categoryFilter && (
                    <button 
                        onClick={() => navigate('/blog')}
                        className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group bg-emerald-50 px-6 py-3 rounded-2xl"
                    >
                        <i className="fa-solid fa-filter-circle-xmark"></i> Show All Articles
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Main Articles Column */}
                <div className="lg:w-2/3 space-y-12">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <article
                                key={post.id}
                                onClick={() => { navigate(`/blog/${post.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="group cursor-pointer flex flex-col sm:flex-row gap-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-emerald-100"
                            >
                                <div className="w-full sm:w-2/5 shrink-0 overflow-hidden rounded-2xl h-48 sm:h-auto">
                                    <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                                </div>
                                <div className="flex flex-col justify-center flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase tracking-widest border border-emerald-100">{post.category}</span>
                                        <span className="text-slate-400 text-xs font-medium">{post.date}</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-lexend font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">{post.title}</h2>
                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2 italic font-light">{post.excerpt}</p>
                                    <div className="flex items-center gap-3 mt-auto border-t border-slate-50 pt-4">
                                        <img src={post.author === 'Fabio' ? '/about_me.png' : `https://i.pravatar.cc/100?u=${post.author}`} className="w-8 h-8 rounded-xl object-cover" alt={post.author} />
                                        <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">{post.author} <span className="text-slate-300 mx-2">•</span> {post.readTime}</div>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <i className="fa-solid fa-magnifying-glass text-slate-300 text-5xl mb-6 block"></i>
                            <h3 className="text-2xl font-lexend font-bold text-slate-800 mb-2">No articles found</h3>
                            <p className="text-slate-500 mb-8">We couldn't find any articles in the "{categoryFilter}" category.</p>
                            <button 
                                onClick={() => navigate('/blog')}
                                className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95"
                            >
                                View All Articles
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar Column */}
                <aside className="lg:w-1/3 space-y-12">
                    {/* Substack Newsletter Widget */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-lexend font-bold mb-4">Algorithmic Financial Freedom</h3>
                            <p className="text-slate-400 text-sm mb-6 font-light">Weekly deep-dives on FIRE delivered to your inbox.</p>
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

                    {/* Trending Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                            <i className="fa-solid fa-fire text-orange-500"></i> Trending now
                        </h3>
                        <div className="space-y-8">
                            {trendingPosts.map((post, index) => (
                                <div 
                                    key={post.id} 
                                    className="group cursor-pointer flex gap-4"
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                >
                                    <div className="text-2xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors">0{index + 1}</div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h4>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{post.category}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Must Reads Section */}
                    <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-900/20">
                        <h3 className="text-xs font-black text-emerald-200 uppercase tracking-[0.2em] mb-8">
                            <i className="fa-solid fa-star text-amber-300"></i> Must reads
                        </h3>
                        <div className="space-y-6">
                            {mustReads.map((post) => (
                                <div 
                                    key={post.id} 
                                    className="group cursor-pointer border-b border-emerald-500/50 pb-6 last:border-0 last:pb-0"
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                >
                                    <h4 className="font-bold text-base leading-snug group-hover:text-emerald-200 transition-colors">{post.title}</h4>
                                    <p className="text-emerald-200/60 text-xs mt-2 font-light italic line-clamp-2">{post.excerpt}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Browse by Topic (Replaces categories widget) */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Browse by topic</h3>
                        <div className="flex flex-wrap gap-2">
                            {Array.from(new Set(BLOG_POSTS.map(p => p.category))).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => navigate(`/blog?category=${cat}`)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        categoryFilter === cat 
                                        ? 'bg-emerald-600 text-white' 
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BlogList;
