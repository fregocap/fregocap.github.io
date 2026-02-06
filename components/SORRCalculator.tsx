
import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const SORRCalculator: React.FC = () => {
    const [initialPortfolio, setInitialPortfolio] = useState(1000000);
    const [annualWithdrawal, setAnnualWithdrawal] = useState(40000);
    const [duration, setDuration] = useState(30);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        calculateData();
    }, [initialPortfolio, annualWithdrawal, duration]);

    const calculateData = () => {
        // 1. Define the "Bag of Returns" based on duration
        const bearYearCount = Math.max(2, Math.floor(duration * 0.15)); // ~15% crash years
        const bullYearCount = Math.max(2, Math.floor(duration * 0.15)); // ~15% boom years
        const normalCount = duration - bearYearCount - bullYearCount;

        const bearRate = -0.15;
        const bullRate = 0.25;
        const normalRate = 0.07;

        // Calculate the mathematical average of this specific bag
        const totalReturnSum = (bearYearCount * bearRate) + (bullYearCount * bullRate) + (normalCount * normalRate);
        const avgReturn = totalReturnSum / duration;

        // 2. Create distributions (Deterministic "Shuffle" to avoid jitter)
        // We intertwine the remaining years so they don't clump at the end

        // Helper to mix arrays evenly (distribute the sparse items into the dense items)
        const mix = (dense: number[], sparse: number[]) => {
            const result = [...dense];
            // Distribute sparse items evenly
            if (sparse.length === 0) return result;

            const step = Math.floor(result.length / (sparse.length + 1));

            sparse.forEach((item, index) => {
                // Insert at calculated positions (avoiding endclumping)
                const insertIndex = (index + 1) * step + index;
                if (insertIndex < result.length) {
                    result.splice(insertIndex, 0, item);
                } else {
                    result.push(item);
                }
            });

            return result;
        };

        // Unlucky: Front-load ALL bear years, then mix the rest
        const unluckyRestBull = Array(bullYearCount).fill(bullRate);
        const unluckyRestNormal = Array(normalCount).fill(normalRate);
        // Unlucky gets the Normal years as the "base" for the recovery, sprinkled with Bull years
        const unluckyReturns = [
            ...Array(bearYearCount).fill(bearRate),
            ...mix(unluckyRestNormal, unluckyRestBull)
        ];

        // Lucky: Front-load ALL bull years, then mix the rest
        const luckyRestBear = Array(bearYearCount).fill(bearRate);
        const luckyRestNormal = Array(normalCount).fill(normalRate);
        // Lucky gets the Normal years as the "base", sprinkled with Bear years
        const luckyReturns = [
            ...Array(bullYearCount).fill(bullRate),
            ...mix(luckyRestNormal, luckyRestBear)
        ];
        // 3. Simulate
        const newData = [];
        let steadyBal = initialPortfolio;
        let unluckyBal = initialPortfolio;
        let luckyBal = initialPortfolio;

        // Year 0
        newData.push({
            year: 0,
            Steady: Math.round(steadyBal),
            Unlucky: Math.round(unluckyBal),
            Lucky: Math.round(luckyBal)
        });

        for (let year = 1; year <= duration; year++) {
            // Steady Line (Control)
            steadyBal = Math.max(0, steadyBal - annualWithdrawal) * (1 + avgReturn);

            // Unlucky Line
            const unluckyRate = unluckyReturns[year - 1] || avgReturn;
            unluckyBal = Math.max(0, unluckyBal - annualWithdrawal) * (1 + unluckyRate);

            // Lucky Line
            const luckyRate = luckyReturns[year - 1] || avgReturn;
            luckyBal = Math.max(0, luckyBal - annualWithdrawal) * (1 + luckyRate);

            newData.push({
                year,
                Steady: Math.round(steadyBal),
                Unlucky: Math.round(unluckyBal),
                Lucky: Math.round(luckyBal)
            });
        }

        setData(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-lexend font-bold text-slate-800 flex items-center gap-2">
                        <i className="fa-solid fa-chart-line text-emerald-600"></i> Sequence Risk Simulator
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        See how a "bad start" kills a portfolio, even if average returns are the same.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Starting Portfolio</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                            <input
                                type="number"
                                value={initialPortfolio}
                                onChange={(e) => setInitialPortfolio(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-bold text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Annual Withdrawal</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                            <input
                                type="number"
                                value={annualWithdrawal}
                                onChange={(e) => setAnnualWithdrawal(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-bold text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Simulation Years</label>
                        <input
                            type="range"
                            min="10"
                            max="50"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-2"
                        />
                        <div className="text-right font-bold text-emerald-700">{duration} Years</div>
                    </div>
                </div>

                <div className="md:col-span-2 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <YAxis
                                stroke="#94a3b8"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Line
                                type="monotone"
                                dataKey="Steady"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={false}
                                name="Steady (7% avg)"
                            />
                            <Line
                                type="monotone"
                                dataKey="Unlucky"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={false}
                                name="Unlucky (Crash First)"
                            />
                            <Line
                                type="monotone"
                                dataKey="Lucky"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={false}
                                name="Lucky (Boom First)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600 mt-1">
                    <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div>
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Why does this happen?</h4>
                        <p className="text-sm text-amber-800 leading-relaxed mb-2">
                            All 3 lines use the <strong>EXACT SAME</strong> average returns (the same "bag" of years). The only difference is the <strong>order</strong> in which they happen.
                        </p>
                        <p className="text-sm text-amber-800 leading-relaxed">
                            When you withdraw money during a crash (the Red line), you are selling more shares to get the same cash.
                            Those shares are gone forever, so they can't participate in the recovery.
                            This is why the "Unlucky" portfolio often drains to zero while the "Steady" one grows.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SORRCalculator;
