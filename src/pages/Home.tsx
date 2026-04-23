import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BLOG_POSTS } from '../../constants';
import SEO from '../components/SEO';
import { LocalizedString } from '../../types';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const getLocalized = (field: string | LocalizedString) => {
        if (typeof field === 'string') return field;
        const lang = i18n.language as keyof LocalizedString;
        return field[lang] || field.en;
    };

    return (
        <div className="space-y-16 md:space-y-24 pb-20">
            <SEO
                title={t('hero.title_highlight')}
                description={t('hero.description')}
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
                        <i className="fa-solid fa-flask"></i> {t('hero.badge')}
                    </div>

                    <h1 className="text-4xl md:text-7xl font-lexend font-extrabold text-white mb-6 leading-[1.1] drop-shadow-2xl">
                        {t('hero.title_main')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{t('hero.title_highlight')}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        {t('hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
                        <button
                            onClick={() => navigate('/start')}
                            className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 active:scale-95"
                        >
                            <span>{t('hero.cta_primary')}</span>
                            <i className="fa-solid fa-compass group-hover:rotate-12 transition-transform"></i>
                        </button>
                        <button
                            onClick={() => navigate('/blog')}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-5 rounded-2xl font-bold transition-all active:scale-95"
                        >
                            {t('hero.cta_secondary')}
                        </button>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-lexend font-bold text-slate-900">{t('home.insights_title')}</h2>
                        <p className="text-slate-500 mt-2">{t('home.insights_subtitle')}</p>
                    </div>
                    <button onClick={() => navigate('/blog')} className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group">
                        {t('home.insights_cta')} <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOG_POSTS.slice(0, 3).map(post => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            className="cursor-pointer group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 transition-all hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img src={post.imageUrl} alt={getLocalized(post.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm">{getLocalized(post.category)}</div>
                            </div>
                            <div className="p-8">
                                <div className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">{post.date} • {post.readTime} read</div>
                                <h3 className="text-xl font-lexend font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">{getLocalized(post.title)}</h3>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">{getLocalized(post.excerpt)}</p>
                                <div className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">Read More <i className="fa-solid fa-chevron-right text-[10px]"></i></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Browse by Topic */}
            <section className="px-4 md:px-0">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-lexend font-bold text-slate-900">{t('home.topics_title')}</h2>
                    <p className="text-slate-500 mt-2">{t('home.topics_subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { label: 'Foundation', icon: 'fa-key', desc: 'Start here — core FIRE concepts', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
                        { label: 'Investing', icon: 'fa-chart-line', desc: 'ETFs, index funds, allocation', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
                        { label: 'Strategy', icon: 'fa-chess', desc: 'Advanced FIRE planning', color: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
                        { label: 'Mindset', icon: 'fa-brain', desc: 'Psychology of wealth', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
                        { label: 'Lifestyle', icon: 'fa-sun', desc: 'Design your ideal life', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
                    ].map(cat => (
                        <button
                            key={cat.label}
                            onClick={() => navigate(`/blog?category=${cat.label}`)}
                            className={`group text-left p-6 rounded-3xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${cat.color}`}
                        >
                            <i className={`fa-solid ${cat.icon} text-2xl mb-3 block`}></i>
                            <div className="font-lexend font-bold text-base mb-1">{cat.label}</div>
                            <div className="text-xs opacity-70 leading-snug">{cat.desc}</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Newsletter section */}
            <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-10 md:p-16 text-white mx-2 md:mx-0 shadow-2xl shadow-emerald-900/30">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur border border-white/20 rounded-full text-sm font-bold mb-8">
                        <i className="fa-regular fa-paper-plane"></i> {t('home.newsletter_badge')}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-lexend font-extrabold mb-6 leading-tight">
                        {t('home.newsletter_title')}
                    </h2>
                    <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        {t('home.newsletter_desc')}
                    </p>
                    <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg">
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
                    <p className="text-emerald-200 text-xs mt-5 opacity-70">{t('home.newsletter_footer')}</p>
                </div>
            </section>

            {/* Community / Forum section */}
            <section className="px-4 md:px-0">
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 justify-between">
                        <div className="text-white max-w-lg">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <i className="fa-solid fa-users"></i> {t('home.forum_badge')}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-lexend font-extrabold mb-6 leading-tight">
                                {t('home.forum_title')}
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                {t('home.forum_desc')}
                            </p>
                            <button
                                onClick={() => window.open('https://labfab.discourse.group/', '_blank')}
                                className="group bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-5 rounded-2xl transition-all shadow-lg shadow-emerald-900/30 inline-flex items-center gap-3 active:scale-95"
                            >
                                <i className="fa-solid fa-comments"></i>
                                {t('home.forum_cta')}
                                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform text-sm"></i>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 text-slate-400 text-sm min-w-[200px]">
                            {['Share your FIRE number', 'Best European brokers', 'Tax strategies for Portugal', 'Coast FIRE vs Barista FIRE', 'PPR vs IWDA debate'].map(topic => (
                                <div key={topic} className="flex items-center gap-3">
                                    <i className="fa-solid fa-message text-emerald-600 text-xs"></i>
                                    <span>{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
