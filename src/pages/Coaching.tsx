
import React from 'react';

const Coaching: React.FC = () => {
    return (
        <div className="py-12 px-4 md:px-0 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-lexend font-extrabold text-slate-900 mb-6">Strategy Sessions</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Work with me directly to build a personalized plan. Skip the guesswork and reach your goals faster.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {/* Audit */}
                <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col">
                    <div className="mb-8">
                        <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Review</div>
                        <div className="text-5xl font-lexend font-bold text-slate-900">$199</div>
                        <div className="text-slate-400 text-xs mt-1">Financial Health Audit</div>
                    </div>

                    <ul className="text-slate-600 text-sm space-y-5 text-left mb-12 flex-1 font-medium">
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> 45-min Deep Dive Session</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Retirement Date Calculation</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Immediate Action Plan</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Session Notes & Summary</li>
                    </ul>

                    <button onClick={() => window.open('https://calendly.com/capela625/review', '_blank')} className="w-full py-5 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">Book Audit</button>
                </div>

                {/* Strategy */}
                <div className="p-10 bg-white rounded-[2.5rem] border-2 border-emerald-600 shadow-2xl relative transform lg:scale-105 z-10 group flex flex-col">
                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                    <div className="mb-8">
                        <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Roadmap</div>
                        <div className="text-5xl font-lexend font-bold text-slate-900">$499</div>
                        <div className="text-slate-400 text-xs mt-1">Strategic Planning</div>
                    </div>

                    <ul className="text-slate-600 text-sm space-y-5 text-left mb-12 flex-1 font-medium">
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Complete Financial Roadmap</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> 3 Monthly Check-in Sessions</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Portfolio Strategy & Analysis</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Direct Email Support</li>
                    </ul>

                    <button onClick={() => window.open('https://calendly.com/capela625/start-roadmap', '_blank')} className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-600/20">Start Roadmap</button>
                </div>

                {/* Consulting */}
                <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col">
                    <div className="mb-8">
                        <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Consulting</div>
                        <div className="text-5xl font-lexend font-bold text-slate-900">$999</div>
                        <div className="text-slate-400 text-xs mt-1">Private Consulting</div>
                    </div>

                    <ul className="text-slate-600 text-sm space-y-5 text-left mb-12 flex-1 font-medium">
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Ongoing Private Advisory</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Global Living & Tax Strategy</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Unlimited Private Messaging</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Advanced Investment Analysis</li>
                    </ul>

                    <button onClick={() => window.open('https://calendly.com/capela625/private-consulting', '_blank')} className="w-full py-5 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default Coaching;
