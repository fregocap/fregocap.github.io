
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FireCalculator from './components/FireCalculator';
import TaxOptimizationCalculator from './components/TaxOptimizationCalculator';
import BuyVsRentCalculator from './components/BuyVsRentCalculator';
import { BLOG_POSTS } from './constants';
import { getFinancialAdvice } from './services/geminiService';
import { BlogPost } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTool, setSelectedTool] = useState<'fire' | 'tax' | 'rent'>('fire');
  const [userProfile, setUserProfile] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleGetAdvice = async () => {
    if (!userProfile) return;
    setIsGenerating(true);
    const advice = await getFinancialAdvice(userProfile);
    setAiAdvice(advice);
    setIsGenerating(false);
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-16 md:space-y-24 pb-20">
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
                    onClick={() => setActiveTab('tools')}
                    className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <span>Plan Your Path</span>
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </button>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-5 rounded-2xl font-bold transition-all active:scale-95"
                  >
                    Read the Blog
                  </button>
                </div>

                <div className="mt-12 flex items-center gap-6 text-white/60 text-sm font-medium">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    ))}
                  </div>
                  <span>Join 12,000+ Members</span>
                </div>
              </div>
            </section>

            <section className="px-4 md:px-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-lexend font-bold text-slate-900">Latest Insights</h2>
                  <p className="text-slate-500 mt-2">New strategies from our financial research</p>
                </div>
                <button onClick={() => setActiveTab('blog')} className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group">
                  View All Articles <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map(post => (
                  <div
                    key={post.id}
                    onClick={() => { setSelectedPost(post); setActiveTab('blog'); }}
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
                      <button className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">Read More <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
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
      case 'about':
        return (
          <div className="py-12 px-4 md:px-0 max-w-5xl mx-auto space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative px-4 md:px-0">
                <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl rotate-3 bg-emerald-600 border-[8px] border-white">
                  <img src="/about_me.png" alt="Fabio" className="w-full h-full object-cover -rotate-3 hover:rotate-0 transition-transform duration-500" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                  <div className="text-4xl font-lexend font-bold text-emerald-600 leading-none">Retired at 38</div>
                  <div className="text-slate-400 text-sm font-medium mt-2">Founder of labfab.io</div>
                </div>
              </div>
              <div className="space-y-8">
                <h1 className="text-4xl md:text-6xl font-lexend font-bold text-slate-900 leading-tight">
                  I'm Fabio, and I <span className="relative inline-block text-emerald-600">quit<span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-200 -z-10 rounded-full opacity-60"></span></span> the grind.
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  Ten years ago, I realized that financial freedom isn't about luck—it's about a clear, mathematical plan. I used these principles to buy back my <span className="font-bold text-slate-800 underline decoration-emerald-400 decoration-2 underline-offset-4">time</span> and now I help others do the same.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-sm shadow-sm">
                    <i className="fa-solid fa-chart-simple"></i> Math Focused
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-700 rounded-2xl font-bold text-sm shadow-sm">
                    <i className="fa-solid fa-check"></i> Proven Results
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-16 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-lexend font-bold text-center mb-20">My Journey</h2>
              <div className="space-y-12 relative">
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-slate-100 hidden md:block"></div>
                {[
                  { year: '2014', title: 'The Start', desc: 'Discovered the FIRE movement and began tracking every dollar.', icon: 'fa-lightbulb', color: 'bg-emerald-100 text-emerald-600' },
                  { year: '2017', title: 'Optimization', desc: 'Maximized savings and investment returns through simple, effective strategies.', icon: 'fa-gears', color: 'bg-blue-100 text-blue-600' },
                  { year: '2020', title: 'Financial Freedom', desc: 'Reached my FIRE number and officially transitioned to early retirement.', icon: 'fa-square-check', color: 'bg-indigo-100 text-indigo-600' },
                  { year: '2024', title: 'labfab.io Launch', desc: 'Sharing the exact blueprints and systems with a global community.', icon: 'fa-share-nodes', color: 'bg-orange-100 text-orange-600' }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                    <div className="flex items-center md:flex-col md:items-center">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${step.color} flex items-center justify-center text-xl md:text-2xl shadow-sm z-10 transition-all group-hover:rotate-6 group-hover:scale-110`}>
                        <i className={`fa-solid ${step.icon}`}></i>
                      </div>
                    </div>
                    <div className="pb-12 border-l-2 border-slate-50 md:border-none pl-8 md:pl-0">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{step.year}</span>
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
                      <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'blog':
        if (selectedPost) {
          return (
            <div className="py-12 px-4 md:px-0 max-w-4xl mx-auto animate-in fade-in duration-700">
              <button
                onClick={() => setSelectedPost(null)}
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
                          onClick={() => { setSelectedPost(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
                        {BLOG_POSTS.map((p, i) => (
                          <div key={p.id} className="flex gap-4 group cursor-pointer" onClick={() => { setSelectedPost(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
        }

        return (
          <div className="py-12 px-4 md:px-0 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-lexend font-bold text-slate-900 mb-12">Financial Research & Articles</h1>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-lexend font-bold text-white mb-2">Money Milestones Newsletter</h2>
                  <p className="text-slate-400 text-lg font-light max-w-xl">Get my weekly deep-dives on financial independence delivered straight to your inbox.</p>
                </div>
                <button
                  onClick={() => window.open('https://substack.com/@moneymilestones', '_blank')}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 whitespace-nowrap"
                >
                  <i className="fa-regular fa-envelope mr-3"></i> Subscribe Free
                </button>
              </div>
            </div>
            <div className="space-y-12">
              {BLOG_POSTS.map(post => (
                <article
                  key={post.id}
                  onClick={() => { setSelectedPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
              ))}
            </div>
          </div>
        );
      case 'tools':
        return (
          <div className="py-12 px-4 md:px-0 space-y-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-lexend font-bold text-slate-900 mb-6 lowercase">labfab.io/tools</h1>
              <p className="text-lg text-slate-600 font-light">Simple, accurate calculators to help you simulate your path to retirement.</p>
            </div>

            <div className="max-w-5xl mx-auto">
              {selectedTool === 'fire' && <FireCalculator />}
              {selectedTool === 'tax' && <TaxOptimizationCalculator />}
              {selectedTool === 'rent' && <BuyVsRentCalculator />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                onClick={() => setSelectedTool('fire')}
                className={`cursor-pointer p-8 rounded-3xl border transition-all group ${selectedTool === 'fire' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-emerald-200 shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${selectedTool === 'fire' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${selectedTool === 'fire' ? 'text-white' : 'text-slate-800'}`}>FIRE Projector</h3>
                <p className={`text-sm leading-relaxed ${selectedTool === 'fire' ? 'text-emerald-50' : 'text-slate-500'}`}>Project your timeline to financial independence based on current savings.</p>
              </div>

              <div
                onClick={() => setSelectedTool('tax')}
                className={`cursor-pointer p-8 rounded-3xl border transition-all group ${selectedTool === 'tax' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-amber-200 shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${selectedTool === 'tax' ? 'bg-white/20' : 'bg-amber-50 text-amber-600'}`}>
                  <i className="fa-solid fa-piggy-bank"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${selectedTool === 'tax' ? 'text-white' : 'text-slate-800'}`}>Tax Efficiency</h3>
                <p className={`text-sm leading-relaxed ${selectedTool === 'tax' ? 'text-emerald-50' : 'text-slate-500'}`}>See how pre-tax contributions impact your taxable income and effective rate.</p>
              </div>

              <div
                onClick={() => setSelectedTool('rent')}
                className={`cursor-pointer p-8 rounded-3xl border transition-all group ${selectedTool === 'rent' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-indigo-200 shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${selectedTool === 'rent' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                  <i className="fa-solid fa-house"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${selectedTool === 'rent' ? 'text-white' : 'text-slate-800'}`}>Buy vs. Rent</h3>
                <p className={`text-sm leading-relaxed ${selectedTool === 'rent' ? 'text-emerald-50' : 'text-slate-500'}`}>Compare the long-term wealth impact of owning vs. renting your primary residence.</p>
              </div>
            </div>
          </div>
        );

      case 'coaching':
        return (
          <div className="py-12 px-4 md:px-0 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-7xl font-lexend font-extrabold text-slate-900 mb-6">Strategy Sessions</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                Work with me directly to build a personalized plan. Skip the guesswork and reach your goals faster.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Audit */}
              <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col">
                <div className="mb-8">
                  <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Review</div>
                  <div className="text-5xl font-lexend font-bold text-slate-900">$199</div>
                  <div className="text-slate-400 text-xs mt-1">Financial Health Audit</div>
                </div>

                <ul className="text-slate-600 text-sm space-y-5 text-left mb-12 flex-1 font-medium">
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> 45-min Deep Dive Session</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Retirement Date Calculation</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Immediate Action Plan</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Session Notes & Summary</li>
                </ul>

                <button onClick={() => window.open('https://calendly.com/capela625/review', '_blank')} className="w-full py-5 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">Book Audit</button>
              </div>

              {/* Strategy */}
              <div className="p-10 bg-white rounded-[2.5rem] border-2 border-emerald-600 shadow-2xl relative transform lg:scale-105 z-10 group flex flex-col">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                <div className="mb-8">
                  <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Roadmap</div>
                  <div className="text-5xl font-lexend font-bold text-slate-900">$499</div>
                  <div className="text-slate-400 text-xs mt-1">Strategic Planning</div>
                </div>

                <ul className="text-slate-600 text-sm space-y-5 text-left mb-12 flex-1 font-medium">
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Complete Financial Roadmap</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> 3 Monthly Check-in Sessions</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Portfolio Strategy & Analysis</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Direct Email Support</li>
                </ul>

                <button onClick={() => window.open('https://calendly.com/capela625/start-roadmap', '_blank')} className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-600/20">Start Roadmap</button>
              </div>

              {/* Consulting */}
              <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col">
                <div className="mb-8">
                  <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Consulting</div>
                  <div className="text-5xl font-lexend font-bold text-slate-900">$999</div>
                  <div className="text-slate-400 text-xs mt-1">Private Consulting</div>
                </div>

                <ul className="text-slate-600 text-sm space-y-5 text-left mb-12 flex-1 font-medium">
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Ongoing Private Advisory</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Global Living & Tax Strategy</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Unlimited Private Messaging</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Advanced Investment Analysis</li>
                </ul>

                <button onClick={() => window.open('https://calendly.com/capela625/private-consulting', '_blank')} className="w-full py-5 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">Apply Now</button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="py-20 text-center text-slate-400">Section coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);

        setSelectedPost(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      <main className="flex-grow max-w-7xl mx-auto px-0 md:px-8 w-full overflow-x-hidden">
        {renderContent()}
      </main>

      <footer className="bg-slate-950 text-slate-500 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-900/40">
                  <i className="fa-solid fa-flask-vial text-2xl"></i>
                </div>
                <span className="font-lexend font-extrabold text-3xl tracking-tight lowercase">labfab.io</span>
              </div>
              <p className="text-slate-400 max-w-md text-lg leading-relaxed font-light">
                Empowering the next generation to reclaim their time through analytical wealth strategies.
              </p>
              <div className="flex space-x-6">
                <a href="https://bsky.app/profile/labfabio.bsky.social" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-xl"><i className="fa-brands fa-bluesky text-xl"></i></a>
                <a href="https://www.youtube.com/@labfabio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-xl"><i className="fa-brands fa-youtube text-xl"></i></a>
                <a href="https://www.linkedin.com/in/fabio-capela-phd-3a19925b/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-xl"><i className="fa-brands fa-linkedin text-xl"></i></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Navigation</h4>
              <ul className="space-y-5 text-sm font-medium">
                <li><button onClick={() => { setActiveTab('blog'); setSelectedPost(null); }} className="hover:text-emerald-400 transition-colors">Blog</button></li>
                <li><button onClick={() => { setActiveTab('tools'); }} className="hover:text-emerald-400 transition-colors">Tools</button></li>

              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">About</h4>
              <ul className="space-y-5 text-sm font-medium">
                <li><button onClick={() => { setActiveTab('about'); }} className="hover:text-emerald-400 transition-colors">My Story</button></li>
                <li><button onClick={() => { setActiveTab('coaching'); }} className="hover:text-emerald-400 transition-colors">Coaching</button></li>

              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-10 text-[11px] font-medium text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="max-w-sm lowercase">&copy; {new Date().getFullYear()} labfab.io. built for freedom.</p>
            <p className="text-slate-600 italic px-6 py-2 bg-slate-900/50 rounded-lg">Notice: labfab.io provides educational resources and analysis tools. Not intended as individual investment advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
