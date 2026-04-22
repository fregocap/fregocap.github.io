
import React, { useState } from 'react';
import FireCalculator from '../../components/FireCalculator';
import TaxOptimizationCalculator from '../../components/TaxOptimizationCalculator';
import BuyVsRentCalculator from '../../components/BuyVsRentCalculator';
import SORRCalculator from '../../components/SORRCalculator';

const Tools: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<'fire' | 'tax' | 'rent' | 'sorr'>('fire');

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
                {selectedTool === 'sorr' && <SORRCalculator />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* ... existing tool buttons ... */}
                <div
                    onClick={() => setSelectedTool('fire')}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all group ${selectedTool === 'fire' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-emerald-200 shadow-sm'}`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 transition-transform group-hover:scale-110 ${selectedTool === 'fire' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                        <i className="fa-solid fa-calculator"></i>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${selectedTool === 'fire' ? 'text-white' : 'text-slate-800'}`}>FIRE Projector</h3>
                    <p className={`text-xs leading-relaxed ${selectedTool === 'fire' ? 'text-emerald-50' : 'text-slate-500'}`}>Project your timeline to financial independence.</p>
                </div>

                <div
                    onClick={() => setSelectedTool('tax')}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all group ${selectedTool === 'tax' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-amber-200 shadow-sm'}`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 transition-transform group-hover:scale-110 ${selectedTool === 'tax' ? 'bg-white/20' : 'bg-amber-50 text-amber-600'}`}>
                        <i className="fa-solid fa-piggy-bank"></i>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${selectedTool === 'tax' ? 'text-white' : 'text-slate-800'}`}>Tax Efficiency</h3>
                    <p className={`text-xs leading-relaxed ${selectedTool === 'tax' ? 'text-emerald-50' : 'text-slate-500'}`}>Pre-tax contributions impact on taxable income.</p>
                </div>

                <div
                    onClick={() => setSelectedTool('rent')}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all group ${selectedTool === 'rent' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-indigo-200 shadow-sm'}`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 transition-transform group-hover:scale-110 ${selectedTool === 'rent' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${selectedTool === 'rent' ? 'text-white' : 'text-slate-800'}`}>Buy vs. Rent</h3>
                    <p className={`text-xs leading-relaxed ${selectedTool === 'rent' ? 'text-emerald-50' : 'text-slate-500'}`}>Compare wealth impact of owning vs renting.</p>
                </div>

                <div
                    onClick={() => setSelectedTool('sorr')}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all group ${selectedTool === 'sorr' ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white border-slate-200 hover:border-rose-200 shadow-sm'}`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 transition-transform group-hover:scale-110 ${selectedTool === 'sorr' ? 'bg-white/20' : 'bg-rose-50 text-rose-600'}`}>
                        <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${selectedTool === 'sorr' ? 'text-white' : 'text-slate-800'}`}>Sequence Risk</h3>
                    <p className={`text-xs leading-relaxed ${selectedTool === 'sorr' ? 'text-emerald-50' : 'text-slate-500'}`}>Visualize how a market crash impacts survival.</p>
                </div>
            </div>

            <div className="mt-20 p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-2xl md:text-4xl font-lexend font-bold mb-4">Want to reach your number <span className="text-emerald-400">3 years faster?</span></h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                            Simulations are a great start, but execution is what matters. Get a custom audit of your taxes and allocation to optimize your path.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button onClick={() => window.open('https://calendly.com/capela625/review', '_blank')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-900/40 active:scale-95 whitespace-nowrap">
                            Book Strategy Session
                        </button>
                        <button onClick={() => window.open('https://labfab.discourse.group/', '_blank')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 whitespace-nowrap">
                            Join the Community
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tools;
