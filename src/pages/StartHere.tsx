import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const StartHere: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const steps = [
        {
            number: '01',
            title: t('start.step1_title', 'The Mindset'),
            description: t('start.step1_desc', 'Understand what Financial Independence actually means and why "Retire Early" is about choice, not just stopping work.'),
            link: '/blog/what-is-fire-beginners-guide-europe',
            icon: 'fa-brain',
            color: 'bg-blue-50 text-blue-600 border-blue-100'
        },
        {
            number: '02',
            title: t('start.step2_title', 'The Math'),
            description: t('start.step2_desc', 'Calculate your "FIRE Number" and understand the 4% rule. This is where the dream becomes a concrete target.'),
            link: '/blog/how-to-calculate-fire-number',
            icon: 'fa-calculator',
            color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
        },
        {
            number: '03',
            title: t('start.step3_title', 'The Strategy'),
            description: t('start.step3_desc', 'Learn about the different paths: Coast FIRE, Barista FIRE, and traditional FIRE. Choose the one that fits your life.'),
            link: '/blog/lifestyle-design-the-re-in-fire',
            icon: 'fa-map-location-dot',
            color: 'bg-amber-50 text-amber-600 border-amber-100'
        },
        {
            number: '04',
            title: t('start.step4_title', 'The Execution'),
            description: t('start.step4_desc', 'Open your first brokerage account, choose your index funds (ETFs), and automate your wealth building.'),
            link: '/blog/how-to-invest-10000-euros-fire-guide',
            icon: 'fa-rocket',
            color: 'bg-purple-50 text-purple-600 border-purple-100'
        }
    ];

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 md:px-0">
            <SEO 
                title={t('start.seo_title', 'Start Here - Your FIRE Journey')}
                description={t('start.seo_desc', 'A guided, step-by-step path to achieving financial independence and early retirement in Europe.')}
            />
            
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                    <i className="fa-solid fa-compass"></i> {t('start.hero_badge', 'New to FIRE? Start Here')}
                </div>
                <h1 className="text-4xl md:text-6xl font-lexend font-extrabold text-slate-900 mb-6 leading-tight">
                    {t('start.hero_title_p1', 'The Roadmap to')} <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{t('start.hero_title_p2', 'Financial Freedom')}</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
                    {t('start.hero_desc', 'Achieving financial independence isn\'t about luck. It\'s about a series of intentional choices. Follow this guided path to start your journey today.')}
                </p>
            </div>

            <div className="space-y-12 relative">
                {/* Connector line for desktop */}
                <div className="hidden md:block absolute left-[47px] top-10 bottom-10 w-0.5 bg-slate-100 -z-10"></div>

                {steps.map((step, index) => (
                    <div key={step.number} className="group relative flex flex-col md:flex-row gap-8 items-start">
                        <div className={`w-24 h-24 shrink-0 rounded-3xl border-2 flex items-center justify-center text-3xl transition-all group-hover:scale-110 shadow-sm ${step.color}`}>
                            <i className={`fa-solid ${step.icon}`}></i>
                        </div>
                        
                        <div className="flex-1 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-emerald-200 cursor-pointer" onClick={() => navigate(step.link)}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">{t('start.step_label', 'Step')} {step.number}</span>
                                <i className="fa-solid fa-arrow-right text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all"></i>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-lexend font-bold text-slate-800 mb-4">{step.title}</h2>
                            <p className="text-slate-500 text-lg leading-relaxed font-light mb-0">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-lexend font-bold mb-6 italic">{t('start.footer_quote', '"The best time to start was 10 years ago. The second best time is today."')}</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                        {t('start.footer_desc', 'Ready to deep dive into specific tools or see the latest research?')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate('/tools')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                        >
                            {t('start.cta_tools', 'Explore Tools')}
                        </button>
                        <button 
                            onClick={() => navigate('/blog')}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold transition-all active:scale-95"
                        >
                            {t('start.cta_blog', 'Latest Articles')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartHere;
