
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Region = 'US' | 'EU';

const BuyVsRentCalculator: React.FC = () => {
  const [region, setRegion] = useState<Region>('US');
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [years, setYears] = useState(30);
  
  // Advanced Assumptions
  const [appreciation, setAppreciation] = useState(3);
  const [investReturn, setInvestReturn] = useState(7);
  const [propertyTax, setPropertyTax] = useState(region === 'US' ? 1.2 : 0.5);
  const [maintenance, setMaintenance] = useState(1);
  const [rentIncrease, setRentIncrease] = useState(3);

  const [projection, setProjection] = useState<any[]>([]);
  const [summary, setSummary] = useState({ buyWealth: 0, rentWealth: 0, winner: '' });

  const currency = region === 'US' ? '$' : '€';

  useEffect(() => {
    const data = [];
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = 360; // Standard 30yr mortgage
    
    const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    let currentRent = monthlyRent;
    let rentInvestedWealth = downPayment; // Initial investment for renter is the down payment they didn't spend
    let currentHomeValue = homePrice;
    let remainingLoan = loanAmount;

    for (let year = 0; year <= years; year++) {
      // Home Equity Calculation
      const sellingCosts = currentHomeValue * 0.06;
      const buyWealth = Math.max(0, currentHomeValue - remainingLoan - sellingCosts);

      // Renting/Investing Calculation
      const rentWealth = rentInvestedWealth;

      data.push({
        year,
        buying: Math.round(buyWealth),
        renting: Math.round(rentWealth),
      });

      // Update for next year
      currentHomeValue *= (1 + appreciation / 100);
      
      // Mortgage Paydown (Approximate monthly loop)
      for (let m = 0; m < 12; m++) {
        const interestPaid = remainingLoan * monthlyRate;
        const principalPaid = monthlyMortgage - interestPaid;
        remainingLoan = Math.max(0, remainingLoan - principalPaid);
        
        // Monthly cost difference logic:
        // Buying costs: Mortgage + Tax + Maintenance
        const monthlyTax = (currentHomeValue * (propertyTax / 100)) / 12;
        const monthlyMaint = (currentHomeValue * (maintenance / 100)) / 12;
        const totalBuyingCost = monthlyMortgage + monthlyTax + monthlyMaint;
        
        // Renter saves the difference if Rent < Buying Cost
        const savings = totalBuyingCost - currentRent;
        rentInvestedWealth = (rentInvestedWealth + (savings > 0 ? savings : 0)) * (1 + (investReturn / 100 / 12));
        
        // Rent increases annually
        if (m === 11) currentRent *= (1 + rentIncrease / 100);
      }
    }

    setProjection(data);
    const final = data[data.length - 1];
    setSummary({
      buyWealth: final.buying,
      rentWealth: final.renting,
      winner: final.buying > final.renting ? 'Home Ownership' : 'Renting & Investing'
    });
  }, [homePrice, downPaymentPct, interestRate, monthlyRent, years, appreciation, investReturn, propertyTax, maintenance, rentIncrease, region]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div>
          <h3 className="text-3xl font-lexend font-bold text-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-house-circle-check"></i>
            </div>
            Buy vs. Rent Wealth Simulator
          </h3>
          <p className="text-slate-500 mt-2">Compare total net worth impact over a long-term horizon.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button 
            onClick={() => setRegion('US')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${region === 'US' ? 'bg-white shadow-md text-slate-900' : 'text-slate-500'}`}
          >
            USA ($)
          </button>
          <button 
            onClick={() => setRegion('EU')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${region === 'EU' ? 'bg-white shadow-md text-slate-900' : 'text-slate-500'}`}
          >
            Europe (€)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Purchase Details</h4>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Home Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currency}</span>
                <input 
                  type="number" 
                  value={homePrice}
                  onChange={(e) => setHomePrice(+e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Down Payment (%)</label>
                <input 
                  type="number" 
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(+e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Mortgage Rate (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(+e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Rental Alternative</h4>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Rent</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currency}</span>
                <input 
                  type="number" 
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(+e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Investment Return (%)</label>
              <input 
                type="number" 
                value={investReturn}
                onChange={(e) => setInvestReturn(+e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl space-y-4">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">30-Year Outcome</div>
            <div className="text-3xl font-lexend font-bold leading-tight">
              {summary.winner} Wins
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Owner Net Worth</span>
                <span className="font-bold">{currency}{summary.buyWealth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Renter Net Worth</span>
                <span className="font-bold">{currency}{summary.rentWealth.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex-1 min-h-[450px]">
            <h4 className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Net Worth Trajectory Comparison</h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projection}>
                <defs>
                  <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} label={{ value: 'Years', position: 'bottom', offset: 0 }} />
                <YAxis 
                  fontSize={12} 
                  stroke="#94a3b8" 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `${currency}${(val/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${currency}${value.toLocaleString()}`, '']}
                />
                <Legend verticalAlign="top" height={36}/>
                <Area 
                  name="Owner Net Worth" 
                  type="monotone" 
                  dataKey="buying" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorBuy)" 
                />
                <Area 
                  name="Renter Net Worth" 
                  type="monotone" 
                  dataKey="renting" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRent)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl border border-slate-100 bg-white">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Home Appreciation (%)</label>
              <input 
                type="number" step="0.5" value={appreciation} 
                onChange={(e) => setAppreciation(+e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 outline-none"
              />
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-white">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Property Tax Rate (%)</label>
              <input 
                type="number" step="0.1" value={propertyTax} 
                onChange={(e) => setPropertyTax(+e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 outline-none"
              />
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-white">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Rent Appreciation (%)</label>
              <input 
                type="number" step="0.5" value={rentIncrease} 
                onChange={(e) => setRentIncrease(+e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;
