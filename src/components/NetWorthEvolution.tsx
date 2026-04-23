import React, { useEffect, useState } from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';

interface MonthlyData {
    month: string;
    netWorth: number;
    contribution: number;
    withdrawal: number;
}

const NetWorthEvolution: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState<MonthlyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://thesimpleportfol.io/api/public_returns/');
                if (!response.ok) throw new Error('Failed to fetch returns data');
                const json = await response.json();
                const returns = json.returns;

                const startDate = new Date('2017-01-01');
                let currentNetWorth = 30000;
                const monthlyContribution = 10000;
                const annualWithdrawalRate = 0.035;
                const result: MonthlyData[] = [];

                // Group returns by month
                const monthlyReturns: Record<string, number[]> = {};
                Object.entries(returns).forEach(([dateStr, value]) => {
                    const date = new Date(dateStr);
                    if (date >= startDate) {
                        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                        if (!monthlyReturns[monthKey]) monthlyReturns[monthKey] = [];
                        monthlyReturns[monthKey].push(value as number);
                    }
                });

                const sortedMonths = Object.keys(monthlyReturns).sort();

                sortedMonths.forEach(monthKey => {
                    const [year] = monthKey.split('-').map(Number);
                    const monthReturns = monthlyReturns[monthKey];
                    let contribution = 0;
                    let withdrawal = 0;

                    if (year < 2024) {
                        // Accumulation phase: Add €10k
                        contribution = monthlyContribution;
                        currentNetWorth += contribution;
                    } else {
                        // Withdrawal phase: Subtract 3.5% / 12
                        withdrawal = (currentNetWorth * annualWithdrawalRate) / 12;
                        currentNetWorth -= withdrawal;
                    }

                    // Apply compounded returns for the month
                    const monthlyMultiplier = monthReturns.reduce((acc, curr) => acc * (1 + curr), 1);
                    currentNetWorth *= monthlyMultiplier;

                    result.push({
                        month: monthKey,
                        netWorth: Math.round(currentNetWorth),
                        contribution,
                        withdrawal
                    });
                });

                setData(result);
                setLoading(false);
            } catch (err) {
                console.error('Error calculating net worth:', err);
                setError(t('portfolio.nw_error', 'Could not load financial data.'));
                setLoading(false);
            }
        };

        fetchData();
    }, [t]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(i18n.language === 'en' ? 'en-EU' : i18n.language, {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const latestNW = data.length > 0 ? data[data.length - 1].netWorth : 0;
    const totalInvested = data.reduce((acc, curr) => acc + curr.contribution, 0) + 30000;
    const totalGain = latestNW - totalInvested + data.reduce((acc, curr) => acc + curr.withdrawal, 0);

    if (loading) return (
        <div className="h-[400px] flex items-center justify-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col items-center gap-4 text-slate-400">
                <i className="fa-solid fa-circle-notch animate-spin text-3xl"></i>
                <p className="font-medium animate-pulse">Calculating growth trajectory...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="h-[400px] flex items-center justify-center bg-rose-50 rounded-[3rem] border border-rose-100">
            <p className="text-rose-600 font-medium">{error}</p>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{t('portfolio.nw_current')}</div>
                    <div className="text-3xl font-lexend font-extrabold text-emerald-600">{formatCurrency(latestNW)}</div>
                    <div className="text-xs text-slate-500 mt-2">{t('portfolio.nw_start_from')}</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{t('portfolio.nw_invested')}</div>
                    <div className="text-3xl font-lexend font-extrabold text-slate-800">{formatCurrency(totalInvested)}</div>
                    <div className="text-xs text-slate-500 mt-2">{t('portfolio.nw_contributions')}</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{t('portfolio.nw_gains')}</div>
                    <div className="text-3xl font-lexend font-extrabold text-blue-600">+{formatCurrency(totalGain)}</div>
                    <div className="text-xs text-slate-500 mt-2">{t('portfolio.nw_compounded')}</div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 relative z-10">
                    <div>
                        <h3 className="text-2xl font-lexend font-bold text-slate-900">{t('portfolio.nw_path_title')}</h3>
                        <p className="text-slate-500 font-light mt-1">{t('portfolio.nw_path_desc')}</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-500">
                        <i className="fa-solid fa-calendar-days text-emerald-500"></i>
                        <span>Jan 2017 — Present</span>
                    </div>
                </div>

                <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorNw" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="month" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                minTickGap={30}
                                tickFormatter={(str) => {
                                    const [year, month] = str.split('-');
                                    return month === '01' ? year : '';
                                }}
                            />
                            <YAxis 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                tickFormatter={(val) => `€${(val/1000000).toFixed(1)}M`}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    borderRadius: '20px', 
                                    border: 'none', 
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                    padding: '16px'
                                }}
                                formatter={(value: number) => [formatCurrency(value), t('portfolio.nw_current')]}
                                labelFormatter={(label) => {
                                    const [year, month] = label.split('-');
                                    const date = new Date(parseInt(year), parseInt(month) - 1);
                                    return date.toLocaleDateString(i18n.language, { month: 'long', year: 'numeric' });
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="netWorth" 
                                stroke="#10b981" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorNw)" 
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>{t('portfolio.nw_compounded')}</span>
                    </div>
                </div>
            </div>

            {/* Advertisement Section */}
            <div className="p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center lg:text-left">
                        <h3 className="text-2xl md:text-3xl font-lexend font-bold mb-4">{t('portfolio.nw_ad_title')}</h3>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                            {t('portfolio.nw_ad_desc')}
                        </p>
                    </div>
                    <a 
                        href="https://thesimpleportfol.io" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-emerald-900/40 active:scale-95 whitespace-nowrap flex items-center gap-3"
                    >
                        {t('portfolio.nw_ad_cta')} <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NetWorthEvolution;
