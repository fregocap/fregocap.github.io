
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';
import { getFinancialAdvice } from '../../services/geminiService';
import SEO from '../components/SEO';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState('');
    const [aiAdvice, setAiAdvice] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGetAdvice = async () => {
        if (!userProfile) return;
        setIsGenerating(true);
        const advice = await getFinancialAdvice(userProfile);
        setAiAdvice(advice);
        setIsGenerating(false);
    };

    return (
        <div className="space-y-16 md:space-y-24 pb-20">
            <SEO
                title="Financial Independence Hub"
                description="Empowering the next generation to reclaim their time through analytical wealth strategies. Learn about FIRE, investing, and lifestyle design."
            />
            <section className="relative min-h-[550px] md:h-[650px] flex items-center justify-center text-center overflow-hidden rounded-[2.5rem] mt-6 mx-2 md:mx-0 shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover scale-105 animate-pulse-slow"
                        alt="Aspirational mountain path"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="relative z-10 max-w-4xl px-6 py-12 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-bounce-subtle">
                        <i className="fa-solid fa-flask"></i> labfab.io Strategic Advisor
                    </div>

                    <h1 className="text-4xl md:text-7xl font-lexend font-extrabold text-white mb-6 leading-[1.1] drop-shadow-2xl">
                        Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Financial Exit</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Reclaim your time with labfab.io. Join a community using analytical principles to achieve Financial Independence and early retirement.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
                        <button
                            onClick={() => navigate('/tools')}
                            className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 active:scale-95"
                        >
                            <span>Plan Your Path</span>
                            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </button>
                        <button
                            onClick={() => navigate('/blog')}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-5 rounded-2xl font-bold transition-all active:scale-95"
                        >
                            Read the Blog
                        </button>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-lexend font-bold text-slate-900">Latest Insights</h2>
                        <p className="text-slate-500 mt-2">New strategies from our financial research</p>
                    </div>
                    <button onClick={() => navigate('/blog')} className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group">
                        View All Articles <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOG_POSTS.map(post => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            className="cursor-pointer group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 transition-all hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm">{post.category}</div>
                            </div>
                            <div className="p-8">
                                <div className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">{post.date} • {post.readTime} read</div>
                                <h3 className="text-xl font-lexend font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>
                                <div className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">Read More <i className="fa-solid fa-chevron-right text-[10px]"></i></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl mx-2 md:mx-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/30">
                            <i className="fa-solid fa-robot"></i> AI Personal Advisor
                        </div>
                        <h2 className="text-3xl md:text-5xl font-lexend font-bold mb-6 leading-tight">Get Your <br className="hidden md:block" />Custom Roadmap</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                            Enter your financial details and our advisor will create a personalized plan to accelerate your journey.
                        </p>
                        <textarea
                            value={userProfile}
                            onChange={(e) => setUserProfile(e.target.value)}
                            placeholder="e.g., 30 years old, earning $80k, spending $35k, no debt, $50k in investments..."
                            className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-6 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none mb-6 h-40 transition-all focus:bg-slate-800 shadow-inner"
                        ></textarea>
                        <button
                            onClick={handleGetAdvice}
                            disabled={isGenerating}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-10 py-5 rounded-2xl font-bold transition-all w-full md:w-auto shadow-lg shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3"
                        >
                            {isGenerating ? (
                                <><i className="fa-solid fa-circle-notch animate-spin"></i> Analyzing...</>
                            ) : (
                                <><i className="fa-solid fa-magnifying-glass-chart"></i> Analyze Profile</>
                            )}
                        </button>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 min-h-[400px] flex flex-col shadow-2xl">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xl shadow-lg">
                                    <i className="fa-solid fa-robot"></i>
                                </div>
                                <div>
                                    <div className="font-bold text-base lowercase">labfab.io AI</div>
                                    <div className="text-xs text-slate-500 font-medium">Wealth Analysis v3</div>
                                </div>
                            </div>
                            <div className="flex-1 text-slate-300 text-base leading-relaxed whitespace-pre-wrap animate-in fade-in duration-1000">
                                {aiAdvice ? (
                                    <div className="prose prose-invert prose-emerald max-w-none">
                                        {aiAdvice}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-12 text-slate-500">
                                        <i className="fa-solid fa-chart-line text-4xl mb-4 opacity-20"></i>
                                        <p>Fill in your profile details to receive personalized feedback.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
