import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import SEO from '../components/SEO';
import NetWorthEvolution from '../components/NetWorthEvolution';

const Portfolio: React.FC = () => {
    const { t } = useTranslation();

    const data = [
        { name: 'World Index (VWCE)', value: 80, color: '#10b981' },
        { name: 'Emerging Markets', value: 10, color: '#3b82f6' },
        { name: 'Bitcoin / Crypto', value: 5, color: '#f59e0b' },
        { name: 'Cash / Savings', value: 5, color: '#64748b' },
    ];

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
                <h1 className="text-4xl md:text-5xl font-lexend font-extrabold text-slate-900 mb-6">{t('portfolio.title', 'Portfolio & Allocation')}</h1>
                <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">
                    {t('portfolio.subtitle', 'Following the Mustachian philosophy of transparency, this page shows my current investment strategy. I believe in simple, low-cost, global diversification.')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                        <i className="fa-solid fa-chart-pie text-emerald-500"></i> {t('portfolio.chart_title', 'Current Asset Allocation')}
                    </h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Info Section */}
                <div className="space-y-8">
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
                </div>
            </div>

            {/* Net Worth Evolution Section */}
            <div className="mt-24">
                <div className="mb-10">
                    <h2 className="text-3xl font-lexend font-bold text-slate-900 mb-2">Net Worth Growth</h2>
                    <p className="text-slate-500">The power of consistent €10k monthly contributions combined with market returns.</p>
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
