
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Region = 'US' | 'EU';

const TaxOptimizationCalculator: React.FC = () => {
  const [region, setRegion] = useState<Region>('US');
  const [income, setIncome] = useState(100000);
  const [preTaxPension, setPreTaxPension] = useState(23000);
  const [healthDeduction, setHealthDeduction] = useState(4150);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');

  const [results, setResults] = useState({
    taxableIncome: 0,
    federalTax: 0,
    effectiveRate: 0,
    takeHome: 0,
    savingsTotal: 0
  });

  const currency = region === 'US' ? '$' : '€';
  const pensionLabel = region === 'US' ? '401k/403b Contribution' : 'Pension Contribution';
  const healthLabel = region === 'US' ? 'HSA Contribution' : 'Private Health / Deductions';
  const pensionLimit = region === 'US' ? 23000 : 25000;
  const healthLimit = region === 'US' ? 4150 : 5000;

  // Regional Tax Calculation
  const calculateTax = (taxable: number, status: 'single' | 'married', region: Region) => {
    if (region === 'US') {
      const standardDeduction = status === 'single' ? 14600 : 29200;
      const finalTaxable = Math.max(0, taxable - standardDeduction);
      let tax = 0;
      if (status === 'single') {
        if (finalTaxable <= 11600) tax = finalTaxable * 0.10;
        else if (finalTaxable <= 47150) tax = 1160 + (finalTaxable - 11600) * 0.12;
        else if (finalTaxable <= 100525) tax = 5426 + (finalTaxable - 47150) * 0.22;
        else if (finalTaxable <= 191950) tax = 17168.50 + (finalTaxable - 100525) * 0.24;
        else tax = 39110.50 + (finalTaxable - 191950) * 0.32;
      } else {
        if (finalTaxable <= 23200) tax = finalTaxable * 0.10;
        else if (finalTaxable <= 94300) tax = 2320 + (finalTaxable - 23200) * 0.12;
        else if (finalTaxable <= 201050) tax = 10852 + (finalTaxable - 94300) * 0.22;
        else tax = 34337 + (finalTaxable - 201050) * 0.24;
      }
      return tax;
    } else {
      // Europe (Simplified average progressive model)
      const basicAllowance = status === 'single' ? 11000 : 22000;
      const finalTaxable = Math.max(0, taxable - basicAllowance);
      let tax = 0;
      if (finalTaxable <= 15000) tax = finalTaxable * 0.15;
      else if (finalTaxable <= 45000) tax = 2250 + (finalTaxable - 15000) * 0.30;
      else if (finalTaxable <= 120000) tax = 11250 + (finalTaxable - 45000) * 0.42;
      else tax = 42750 + (finalTaxable - 120000) * 0.45;
      return tax;
    }
  };

  useEffect(() => {
    const taxable = income - preTaxPension - healthDeduction;
    const taxBill = calculateTax(taxable, filingStatus, region);
    const takeHome = taxable - taxBill;
    const effRate = taxBill / income;

    setResults({
      taxableIncome: taxable,
      federalTax: taxBill,
      effectiveRate: effRate * 100,
      takeHome: takeHome,
      savingsTotal: preTaxPension + healthDeduction
    });
  }, [income, preTaxPension, healthDeduction, filingStatus, region]);

  const chartData = [
    { name: 'Estimated Tax', value: results.federalTax, color: '#f43f5e' },
    { name: 'Invested (Tax-Advantaged)', value: results.savingsTotal, color: '#10b981' },
    { name: 'Net Take-Home', value: results.takeHome, color: '#0ea5e9' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h3 className="text-2xl font-lexend font-bold text-slate-800 flex items-center gap-3">
            <i className="fa-solid fa-piggy-bank text-emerald-600"></i>
            Tax Efficiency Optimizer
          </h3>
          <p className="text-slate-500 text-sm mt-1">Visualize how pre-tax contributions lower your total tax bill.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => { setRegion('US'); setPreTaxPension(Math.min(income, 23000)); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${region === 'US' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              US Region
            </button>
            <button 
              onClick={() => { setRegion('EU'); setPreTaxPension(Math.min(income, 20000)); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${region === 'EU' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Europe
            </button>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setFilingStatus('single')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filingStatus === 'single' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Single
            </button>
            <button 
              onClick={() => setFilingStatus('married')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filingStatus === 'married' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Married
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Annual Gross Income ({currency})</label>
              <input 
                type="range" min="20000" max="400000" step="5000"
                value={income}
                onChange={(e) => setIncome(+e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-2"
              />
              <input 
                type="number" 
                value={income}
                onChange={(e) => setIncome(+e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{pensionLabel} ({currency})</label>
              <input 
                type="number" 
                value={preTaxPension}
                max={pensionLimit}
                onChange={(e) => setPreTaxPension(Math.min(pensionLimit, +e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1 italic">Annual limit approx: {currency}{pensionLimit.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{healthLabel} ({currency})</label>
              <input 
                type="number" 
                value={healthDeduction}
                max={healthLimit}
                onChange={(e) => setHealthDeduction(Math.min(healthLimit, +e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1 italic">Standard cap: {currency}{healthLimit.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm">Effective Tax Rate</span>
              <span className="text-2xl font-lexend font-bold text-emerald-400">{results.effectiveRate.toFixed(1)}%</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Tax Bill</span>
                <span className="font-bold text-rose-400">-{currency}{results.federalTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Saved in Contributions</span>
                <span className="font-bold text-emerald-400">+{currency}{results.savingsTotal.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-slate-800 mt-4 flex justify-between items-center">
                <span className="text-slate-200 font-bold">Estimated Take-Home</span>
                <span className="text-xl font-lexend font-bold text-white">{currency}{results.takeHome.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-50 rounded-[2rem] p-6 flex flex-col border border-slate-100">
          <h4 className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Allocation Breakdown</h4>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${currency}${value.toLocaleString()}`, '']}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Taxed</div>
              <div className="text-sm font-bold text-rose-500">{((results.federalTax / income) * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Saved</div>
              <div className="text-sm font-bold text-emerald-500">{((results.savingsTotal / income) * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Spendable</div>
              <div className="text-sm font-bold text-sky-500">{((results.takeHome / income) * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-slate-400 text-center mt-8 italic">Note: These calculations are simplified estimates based on general {region} regional benchmarks. Local variations apply.</p>
    </div>
  );
};

export default TaxOptimizationCalculator;
