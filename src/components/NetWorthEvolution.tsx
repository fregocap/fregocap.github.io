import React, { useEffect, useState, useMemo } from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { useTranslation } from 'react-i18next';

interface MonthlyData {
    month: string;
    netWorth: number;
    contribution: number;
    returns: number;
}

const NetWorthEvolution: React.FC = () => {
    const { t } = useTranslation();
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
                const today = new Date();
                
                let currentNetWorth = 30000;
                const monthlyContribution = 10000;
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

                // Sort month keys
                const sortedMonths = Object.keys(monthlyReturns).sort();

                sortedMonths.forEach(monthKey => {
                    const monthReturns = monthlyReturns[monthKey];
                    
                    // Add monthly contribution at start of month
                    currentNetWorth += monthlyContribution;

                    // Calculate compounded return for the month
                    const monthlyMultiplier = monthReturns.reduce((acc, curr) => acc * (1 + curr), 1);
                    currentNetWorth *= monthlyMultiplier;

                    result.push({
                        month: monthKey,
                        netWorth: Math.round(currentNetWorth),
                        contribution: monthlyContribution,
                        returns: Math.round(currentNetWorth * (monthlyMultiplier - 1))
                    });
                });

                setData(result);
                setLoading(false);
            } catch (err) {
                console.error('Error calculating net worth:', err);
                setError('Could not load financial data. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const latestNW = data.length > 0 ? data[data.length - 1].netWorth : 0;
    const totalInvested = data.length * 10000 + 30000;
    const totalGain = latestNW - totalInvested;

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
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Current Estimated Net Worth</div>
                    <div className="text-3xl font-lexend font-extrabold text-emerald-600">{formatCurrency(latestNW)}</div>
                    <div className="text-xs text-slate-500 mt-2">Starting from €30k in 2017</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Capital Invested</div>
                    <div className="text-3xl font-lexend font-extrabold text-slate-800">{formatCurrency(totalInvested)}</div>
                    <div className="text-xs text-slate-500 mt-2">€10k monthly contributions</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Market Gains (Alpha)</div>
                    <div className="text-3xl font-lexend font-extrabold text-blue-600">+{formatCurrency(totalGain)}</div>
                    <div className="text-xs text-slate-500 mt-2">Compounded portfolio returns</div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 relative z-10">
                    <div>
                        <h3 className="text-2xl font-lexend font-bold text-slate-900">Wealth Accumulation Path</h3>
                        <p className="text-slate-500 font-light mt-1">Real historical returns applied to a €10k/month strategy.</p>
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
                                tickFormatter={(val) => `€${val/1000000}M`}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    borderRadius: '20px', 
                                    border: 'none', 
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                    padding: '16px'
                                }}
                                formatter={(value: number) => [formatCurrency(value), 'Net Worth']}
                                labelFormatter={(label) => {
                                    const [year, month] = label.split('-');
                                    const date = new Date(parseInt(year), parseInt(month) - 1);
                                    return date.toLocaleDateString('en-EU', { month: 'long', year: 'numeric' });
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
                        <span>Compounded Net Worth</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-arrow-trend-up text-emerald-500"></i>
                        <span>Includes €10k Monthly Savings</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetWorthEvolution;
