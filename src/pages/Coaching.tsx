import React from 'react';
import SEO from '../components/SEO';

const Coaching: React.FC = () => {
    return (
        <div className="py-12 px-4 md:px-0 max-w-6xl mx-auto space-y-24">
            <SEO 
                title="Strategic 1-on-1 FIRE Consulting"
                description="Work directly with Fabio to build a personalized, mathematically sound 5-year exit plan for your financial independence."
            />

            {/* Hero Section */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                    <i className="fa-solid fa-user-tie"></i> Private Advisory
                </div>
                <h1 className="text-4xl md:text-6xl font-lexend font-extrabold text-slate-900 mb-6 leading-tight">
                    Stop guessing. Let's build your <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">5-Year Exit Plan.</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                    I help high-earning professionals and analytical minds cut through the noise and design a mathematically sound roadmap to financial independence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => window.open('https://calendly.com/capela625/30min', '_blank')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3">
                        <i className="fa-regular fa-calendar-check"></i> Book a Free Discovery Call
                    </button>
                </div>
            </div>

            {/* Social Proof / Outcomes */}
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                    <div className="pt-8 md:pt-0">
                        <div className="text-4xl font-lexend font-bold text-emerald-400 mb-2">100%</div>
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-widest">Data-Driven Plans</div>
                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">No generic advice. Every strategy is built on your exact numbers and local tax laws.</p>
                    </div>
                    <div className="pt-8 md:pt-0 md:pl-8">
                        <div className="text-4xl font-lexend font-bold text-emerald-400 mb-2">3-5 Yrs</div>
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-widest">Average Acceleration</div>
                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">Clients typically identify optimizations that pull their retirement date forward significantly.</p>
                    </div>
                    <div className="pt-8 md:pt-0 md:pl-8">
                        <div className="text-4xl font-lexend font-bold text-emerald-400 mb-2">EU Focus</div>
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-widest">Regional Expertise</div>
                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">Specialized in navigating European tax systems, cross-border investing, and local brokers.</p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-lexend font-bold text-slate-900 mb-4">How We Can Work Together</h2>
                    <p className="text-slate-500">Choose the level of support that fits your current stage.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Audit */}
                    <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col">
                        <div className="mb-8">
                            <div className="text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Phase 1</div>
                            <div className="text-3xl font-lexend font-bold text-slate-900 mb-2">Portfolio Audit</div>
                            <div className="text-4xl font-lexend font-light text-slate-900">$199</div>
                        </div>

                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            A focused session to review your current asset allocation, identify fee drags, and optimize your broker setup.
                        </p>

                        <ul className="text-slate-700 text-sm space-y-4 text-left mb-12 flex-1 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> 60-min Deep Dive Session</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Fee & Drag Analysis</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Tax-Efficiency Review</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Written Action Plan</li>
                        </ul>

                        <button onClick={() => window.open('https://calendly.com/capela625/review', '_blank')} className="w-full py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-emerald-600 hover:text-emerald-600 transition-all active:scale-95">Book Audit</button>
                    </div>

                    {/* Strategy */}
                    <div className="p-10 bg-white rounded-[2.5rem] border-2 border-emerald-600 shadow-2xl relative transform lg:scale-105 z-10 group flex flex-col">
                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                        <div className="mb-8">
                            <div className="text-emerald-600 font-bold mb-2 uppercase text-[10px] tracking-widest">Phase 2</div>
                            <div className="text-3xl font-lexend font-bold text-slate-900 mb-2">The Exit Plan</div>
                            <div className="text-4xl font-lexend font-bold text-slate-900">$499</div>
                        </div>

                        <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
                            A comprehensive, mathematically verified roadmap to take you from your current net worth to complete financial independence.
                        </p>

                        <ul className="text-slate-700 text-sm space-y-4 text-left mb-12 flex-1 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Complete Financial Roadmap</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> 3x Monthly Check-in Sessions</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Custom Drawdown Strategy</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Direct Email Support</li>
                        </ul>

                        <button onClick={() => window.open('https://calendly.com/capela625/start-roadmap', '_blank')} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-emerald-600/20">Start Your Plan</button>
                    </div>

                    {/* Consulting */}
                    <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col">
                        <div className="mb-8">
                            <div className="text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Phase 3</div>
                            <div className="text-3xl font-lexend font-bold text-slate-900 mb-2">Retainer</div>
                            <div className="text-4xl font-lexend font-light text-slate-900">$999<span className="text-lg text-slate-400">/yr</span></div>
                        </div>

                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Ongoing private advisory for high-net-worth individuals managing complex transitions, global living, and large portfolios.
                        </p>

                        <ul className="text-slate-700 text-sm space-y-4 text-left mb-12 flex-1 font-medium">
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Quarterly Strategy Reviews</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Global Tax Relocation Strategy</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Unlimited Private Messaging</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Priority Access</li>
                        </ul>

                        <button onClick={() => window.open('https://calendly.com/capela625/private-consulting', '_blank')} className="w-full py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">Apply Now</button>
                    </div>
                </div>
            </div>
            
            {/* FAQ / Trust Section */}
            <div className="max-w-3xl mx-auto text-center pb-12">
                <i className="fa-solid fa-quote-left text-4xl text-emerald-200 mb-6"></i>
                <p className="text-2xl font-lexend text-slate-800 leading-relaxed italic mb-8">
                    "Fabio didn't just look at my portfolio; he rebuilt my entire approach to risk and taxation. We pulled my retirement date forward by 4 years."
                </p>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">— Private Client, 2025</div>
            </div>
        </div>
    );
};

export default Coaching;