import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import NetWorthEvolution from '../components/NetWorthEvolution';

const Portfolio: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-6xl mx-auto py-16 px-4 md:px-0">
            <SEO 
                title={t('portfolio.seo_title', 'Portfolio Transparency')}
                description={t('portfolio.seo_desc', 'A transparent look at my investment strategy, asset allocation, and progress towards financial independence.')}
            />

            <div className="mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
                    <i className="fa-solid fa-eye"></i> {t('portfolio.hero_badge', 'Transparency Report')}
                </div>
                <h1 className="text-4xl md:text-5xl font-lexend font-extrabold text-slate-900 mb-6">{t('portfolio.title', 'FIRE Journey & Transparency')}</h1>
                <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">
                    {t('portfolio.subtitle', 'Following the Mustachian philosophy of transparency, this page shows my real wealth trajectory and investment principles.')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                {/* Info Section */}
                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-bullseye text-emerald-400"></i> {t('portfolio.strategy_title', 'The Strategy')}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                        {t('portfolio.strategy_desc', 'My strategy is built on three pillars:')}
                    </p>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
                            <span>{t('portfolio.pillar1', 'Minimize fees (under 0.22% TER)')}</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
                            <span>{t('portfolio.pillar2', 'Maximize diversification')}</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
                            <span>{t('portfolio.pillar3', 'Automated monthly contributions')}</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem]">
                    <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-shield-halved text-emerald-600"></i> {t('portfolio.rebalancing_title', 'Rebalancing')}
                    </h4>
                    <p className="text-emerald-800/70 text-sm leading-relaxed font-light italic">
                        {t('portfolio.rebalancing_quote', '"I rebalance only when asset classes drift more than 5% from their targets. This keeps trading costs low and emotions out of the equation."')}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center text-center">
                    <div className="text-emerald-600 text-3xl font-lexend font-black mb-2">4%</div>
                    <div className="text-slate-800 font-bold mb-4">Rule of Thumb</div>
                    <p className="text-slate-500 text-xs leading-relaxed font-light italic">
                        "The golden standard for safe withdrawal rates. I aim for an even more conservative 3.5% to ensure multi-generational survival."
                    </p>
                </div>
            </div>

            {/* Net Worth Evolution Section */}
            <div className="mt-24">
                <div className="mb-10">
                    <h2 className="text-3xl font-lexend font-bold text-slate-900 mb-2">{t('portfolio.nw_title')}</h2>
                    <p className="text-slate-500">{t('portfolio.nw_subtitle')}</p>
                </div>
                <NetWorthEvolution />
            </div>

            {/* Monthly Progress Placeholder */}
            <div className="mt-20">
                <h3 className="text-2xl font-lexend font-bold text-slate-800 mb-10">{t('portfolio.progress_title', 'Monthly Progress')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: t('portfolio.stat_savings', 'Savings Rate'), value: '55%', icon: 'fa-piggy-bank', color: 'text-emerald-600' },
                        { label: t('portfolio.stat_fi', 'FI Coverage'), value: '42%', icon: 'fa-umbrella', color: 'text-blue-600' },
                        { label: t('portfolio.stat_div', 'Dividend Yield'), value: '1.8%', icon: 'fa-seedling', color: 'text-amber-600' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-8 rounded-3xl border border-slate-200 flex items-center gap-6 shadow-sm">
                            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-xl ${stat.color}`}>
                                <i className={`fa-solid ${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-2xl font-lexend font-extrabold text-slate-800">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
