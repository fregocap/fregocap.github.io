
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

    return (
        <div className="py-12 px-4 md:px-0 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-lexend font-bold text-slate-900 mb-2">Financial Research & Articles</h1>
                    {categoryFilter && (
                        <p className="text-slate-500 text-lg">
                            Showing articles in <span className="text-emerald-600 font-bold capitalize">{categoryFilter}</span>
                        </p>
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

            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-lexend font-bold text-white mb-2">Algorithmic Financial Freedom</h2>
                        <p className="text-slate-400 text-lg font-light max-w-xl">Get my weekly deep-dives on financial independence delivered straight to your inbox.</p>
                    </div>
                    <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
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
            <div className="space-y-12">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <article
                            key={post.id}
                            onClick={() => { navigate(`/blog/${post.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="group cursor-pointer flex flex-col md:flex-row gap-10 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl"
                        >
                            <div className="w-full md:w-2/5 shrink-0 overflow-hidden rounded-2xl">
                                <img src={post.imageUrl} className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest">{post.category}</span>
                                    <span className="text-slate-400 text-sm font-medium">{post.date}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-lexend font-bold text-slate-800 mb-5 group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight">{post.title}</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <img src={post.author === 'Fabio' ? '/about_me.png' : `https://i.pravatar.cc/100?u=${post.author}`} className="w-12 h-12 rounded-2xl object-cover shadow-md" alt={post.author} />
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">{post.author}</div>
                                        <div className="text-xs text-slate-400 font-medium">{post.readTime} read</div>
                                    </div>
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
        </div>
    );
};

export default BlogList;
