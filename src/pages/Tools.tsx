
import React, { useState } from 'react';
import FireCalculator from '../../components/FireCalculator';
import TaxOptimizationCalculator from '../../components/TaxOptimizationCalculator';
import BuyVsRentCalculator from '../../components/BuyVsRentCalculator';

const Tools: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<'fire' | 'tax' | 'rent'>('fire');

    return (
        <div className="py-12 px-4 md:px-0 space-y-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-lexend font-bold text-slate-900 mb-6 lowercase">labfab.io/tools</h1>
                <p className="text-lg text-slate-600 font-light">Simple, accurate calculators to help you simulate your path to retirement.</p>
            </div>

            <div className="max-w-5xl mx-auto">
                {selectedTool === 'fire' && <FireCalculator />}
                {selectedTool === 'tax' && <TaxOptimizationCalculator />}
                {selectedTool === 'rent' && <BuyVsRentCalculator />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    onClick={() => setSelectedTool('fire')}
                    className={`cursor-pointer p-8 rounded-3xl border transition-all group ${selectedTool === 'fire' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-emerald-200 shadow-sm'}`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${selectedTool === 'fire' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                        <i className="fa-solid fa-calculator"></i>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${selectedTool === 'fire' ? 'text-white' : 'text-slate-800'}`}>FIRE Projector</h3>
                    <p className={`text-sm leading-relaxed ${selectedTool === 'fire' ? 'text-emerald-50' : 'text-slate-500'}`}>Project your timeline to financial independence based on current savings.</p>
                </div>

                <div
                    onClick={() => setSelectedTool('tax')}
                    className={`cursor-pointer p-8 rounded-3xl border transition-all group ${selectedTool === 'tax' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-amber-200 shadow-sm'}`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${selectedTool === 'tax' ? 'bg-white/20' : 'bg-amber-50 text-amber-600'}`}>
                        <i className="fa-solid fa-piggy-bank"></i>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${selectedTool === 'tax' ? 'text-white' : 'text-slate-800'}`}>Tax Efficiency</h3>
                    <p className={`text-sm leading-relaxed ${selectedTool === 'tax' ? 'text-emerald-50' : 'text-slate-500'}`}>See how pre-tax contributions impact your taxable income and effective rate.</p>
                </div>

                <div
                    onClick={() => setSelectedTool('rent')}
                    className={`cursor-pointer p-8 rounded-3xl border transition-all group ${selectedTool === 'rent' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-indigo-200 shadow-sm'}`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${selectedTool === 'rent' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${selectedTool === 'rent' ? 'text-white' : 'text-slate-800'}`}>Buy vs. Rent</h3>
                    <p className={`text-sm leading-relaxed ${selectedTool === 'rent' ? 'text-emerald-50' : 'text-slate-500'}`}>Compare the long-term wealth impact of owning vs. renting your primary residence.</p>
                </div>
            </div>
        </div>
    );
};

export default Tools;
