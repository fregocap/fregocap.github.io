
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FireCalculator: React.FC = () => {
  const [stats, setStats] = useState({
    currentAge: 25,
    retirementAge: 45,
    monthlySavings: 2000,
    currentNetWorth: 50000,
    expectedReturn: 7,
    annualSpending: 40000,
    withdrawalRate: 4
  });

  const [projection, setProjection] = useState<any[]>([]);
  const [fireNumber, setFireNumber] = useState(1000000);

  useEffect(() => {
    const target = (stats.annualSpending * 100) / stats.withdrawalRate;
    setFireNumber(target);

    const data = [];
    let currentBalance = stats.currentNetWorth;
    const monthlyRate = stats.expectedReturn / 100 / 12;
    
    for (let year = 0; year <= 40; year++) {
      const age = stats.currentAge + year;
      data.push({
        year: age,
        balance: Math.round(currentBalance),
        isFire: currentBalance >= target
      });

      for (let m = 0; m < 12; m++) {
        currentBalance = (currentBalance + stats.monthlySavings) * (1 + monthlyRate);
      }
    }
    setProjection(data);
  }, [stats]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h3 className="text-2xl font-lexend font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-calculator text-emerald-600"></i>
        Retirement Timeline Projector
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Age</label>
              <input 
                type="number" 
                value={stats.currentAge}
                onChange={(e) => setStats({...stats, currentAge: +e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Savings ($)</label>
              <input 
                type="number" 
                value={stats.currentNetWorth}
                onChange={(e) => setStats({...stats, currentNetWorth: +e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Savings ($)</label>
              <input 
                type="number" 
                value={stats.monthlySavings}
                onChange={(e) => setStats({...stats, monthlySavings: +e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Expected Expenses ($/yr)</label>
              <input 
                type="number" 
                value={stats.annualSpending}
                onChange={(e) => setStats({...stats, annualSpending: +e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Investment Return (%)</label>
              <input 
                type="number" 
                value={stats.expectedReturn}
                onChange={(e) => setStats({...stats, expectedReturn: +e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Withdrawal Rate (%)</label>
              <input 
                type="number" 
                value={stats.withdrawalRate}
                onChange={(e) => setStats({...stats, withdrawalRate: +e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="text-emerald-800 text-sm font-semibold uppercase tracking-wider mb-1">Target Savings Number</div>
            <div className="text-3xl font-lexend font-bold text-emerald-700">${fireNumber.toLocaleString()}</div>
            <p className="text-emerald-600 text-xs mt-2 italic">Based on your annual spending of ${stats.annualSpending.toLocaleString()} and a {stats.withdrawalRate}% withdrawal rate.</p>
          </div>
        </div>

        <div className="h-[400px] bg-slate-50 rounded-xl p-4 border border-slate-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" fontSize={12} stroke="#64748b" />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} 
                fontSize={12}
                stroke="#64748b"
              />
              <Tooltip 
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="balance" radius={[4, 4, 0, 0]}>
                {projection.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isFire ? '#059669' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-400 rounded-sm"></div>
              <span>Accumulation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
              <span>Target Reached</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireCalculator;
