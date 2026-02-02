
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="py-12 px-4 md:px-0 max-w-5xl mx-auto space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative px-4 md:px-0">
                    <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl rotate-3 bg-emerald-600 border-[8px] border-white">
                        <img src="/about_me.png" alt="Fabio" className="w-full h-full object-cover -rotate-3 hover:rotate-0 transition-transform duration-500" />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                        <div className="text-4xl font-lexend font-bold text-emerald-600 leading-none">Retired at 38</div>
                        <div className="text-slate-400 text-sm font-medium mt-2">Founder of labfab.io</div>
                    </div>
                </div>
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-lexend font-bold text-slate-900 leading-tight">
                        I'm Fabio, and I <span className="relative inline-block text-emerald-600">quit<span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-200 -z-10 rounded-full opacity-60"></span></span> the grind.
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                        Ten years ago, I realized that financial freedom isn't about luck—it's about a clear, mathematical plan. I used these principles to buy back my <span className="font-bold text-slate-800 underline decoration-emerald-400 decoration-2 underline-offset-4">time</span> and now I help others do the same.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-sm shadow-sm">
                            <i className="fa-solid fa-chart-simple"></i> Math Focused
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-700 rounded-2xl font-bold text-sm shadow-sm">
                            <i className="fa-solid fa-check"></i> Proven Results
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 md:p-16 rounded-[3.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-3xl md:text-4xl font-lexend font-bold text-center mb-20">My Journey</h2>
                <div className="space-y-12 relative">
                    <div className="absolute left-[23px] top-0 bottom-0 w-px bg-slate-100 hidden md:block"></div>
                    {[
                        { year: '2014', title: 'The Start', desc: 'Discovered the FIRE movement and began tracking every dollar.', icon: 'fa-lightbulb', color: 'bg-emerald-100 text-emerald-600' },
                        { year: '2017', title: 'Optimization', desc: 'Maximized savings and investment returns through simple, effective strategies.', icon: 'fa-gears', color: 'bg-blue-100 text-blue-600' },
                        { year: '2020', title: 'Financial Freedom', desc: 'Reached my FIRE number and officially transitioned to early retirement.', icon: 'fa-square-check', color: 'bg-indigo-100 text-indigo-600' },
                        { year: '2024', title: 'labfab.io Launch', desc: 'Sharing the exact blueprints and systems with a global community.', icon: 'fa-share-nodes', color: 'bg-orange-100 text-orange-600' }
                    ].map((step, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                            <div className="flex items-center md:flex-col md:items-center">
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${step.color} flex items-center justify-center text-xl md:text-2xl shadow-sm z-10 transition-all group-hover:rotate-6 group-hover:scale-110`}>
                                    <i className={`fa-solid ${step.icon}`}></i>
                                </div>
                            </div>
                            <div className="pb-12 border-l-2 border-slate-50 md:border-none pl-8 md:pl-0">
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{step.year}</span>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
                                <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
