import React from 'react';
import SEO from '../components/SEO';

const Resources: React.FC = () => {
    const categories = [
        {
            title: 'Investing & Brokers',
            description: 'The foundation of your wealth building. These are the platforms I use and trust for long-term indexing.',
            items: [
                {
                    name: 'Interactive Brokers',
                    tag: 'Best for EU Residents',
                    description: 'The most professional and low-cost broker available in Europe. Access to all global markets and the lowest currency conversion fees.',
                    link: 'https://www.interactivebrokers.ie/',
                    icon: 'fa-chart-pie',
                    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Interactive_Brokers_Logo.svg'
                },
                {
                    name: 'Trade Republic',
                    tag: 'Best for Beginners',
                    description: 'Extremely simple interface, automated savings plans for free, and currently offers 4% interest on uninvested cash.',
                    link: 'https://traderepublic.com/',
                    icon: 'fa-mobile-screen-button',
                    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Trade_Republic_Logo.svg'
                }
            ]
        },
        {
            title: 'Banking & Savings',
            description: 'Where to keep your emergency fund and manage daily expenses while maximizing interest.',
            items: [
                {
                    name: 'Revolut',
                    tag: 'Daily Management',
                    description: 'Excellent for currency exchange and daily spending. Their "Flexible Accounts" offer competitive money market fund yields.',
                    link: 'https://www.revolut.com/',
                    icon: 'fa-credit-card',
                    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Revolut.png'
                },
                {
                    name: 'N26',
                    tag: 'Pure Digital Banking',
                    description: 'A solid German bank account with a great app. Perfect for those who want a clean, no-nonsense banking experience.',
                    link: 'https://n26.com/',
                    icon: 'fa-building-columns',
                    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/N26_Logo.svg'
                }
            ]
        },
        {
            title: 'Recommended Books',
            description: 'The most impactful reads that changed my perspective on money, time, and life.',
            items: [
                {
                    name: 'The Psychology of Money',
                    tag: 'Morgan Housel',
                    description: 'Essential reading to understand that doing well with money has little to do with how smart you are and a lot to do with how you behave.',
                    link: 'https://amzn.to/3XlGZ1H',
                    icon: 'fa-book-open',
                    logoUrl: 'https://m.media-amazon.com/images/I/71TR6n7Y9LL._SL1500_.jpg'
                },
                {
                    name: 'The Simple Path to Wealth',
                    tag: 'JL Collins',
                    description: 'The "Bible" of the FIRE movement. Although US-centric, the principles of low-cost indexing are universal.',
                    link: 'https://amzn.to/3XlGZ1H',
                    icon: 'fa-book',
                    logoUrl: 'https://m.media-amazon.com/images/I/71S6-v-v-vL._SL1500_.jpg'
                }
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-16 px-4 md:px-0">
            <SEO 
                title="Resources & Tools I Use"
                description="The exact brokers, banks, and books I use to manage my wealth and journey towards financial independence."
            />

            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-lexend font-extrabold text-slate-900 mb-6">My Setup & Resources</h1>
                <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">
                    Transparency is key. Here are the tools I personally use to manage my finances. I only recommend services I actually use and find valuable.
                </p>
                <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4 text-amber-800 text-sm italic">
                    <i className="fa-solid fa-circle-info mt-1 text-amber-500"></i>
                    <p>
                        Some of the links below are affiliate links. If you sign up using them, I may receive a small commission at no extra cost to you. This helps support labfab.io.
                    </p>
                </div>
            </div>

            <div className="space-y-20">
                {categories.map((category) => (
                    <section key={category.title}>
                        <div className="mb-10">
                            <h2 className="text-2xl font-lexend font-bold text-slate-800 mb-2">{category.title}</h2>
                            <p className="text-slate-400 font-medium">{category.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {category.items.map((item) => (
                                <div 
                                    key={item.name} 
                                    className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden transition-colors border border-slate-100 group-hover:border-emerald-100 shadow-sm">
                                            {item.logoUrl ? (
                                                <img 
                                                    src={item.logoUrl} 
                                                    alt={`${item.name} logo`} 
                                                    className="w-full h-full object-contain p-2 transition-transform group-hover:scale-110" 
                                                    onError={(e) => {
                                                        // Fallback to icon if image fails to load
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.parentElement?.classList.add('bg-slate-50');
                                                        const icon = document.createElement('i');
                                                        icon.className = `fa-solid ${item.icon} text-2xl text-slate-400 group-hover:text-emerald-600`;
                                                        e.currentTarget.parentElement?.appendChild(icon);
                                                    }}
                                                />
                                            ) : (
                                                <i className={`fa-solid ${item.icon} text-2xl text-slate-400 group-hover:text-emerald-600`}></i>
                                            )}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-500 rounded-full">{item.tag}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.name}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light italic">
                                        "{item.description}"
                                    </p>
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                                    >
                                        Visit {item.name} <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                <i className="fa-solid fa-toolbox text-slate-300 text-4xl mb-6 block"></i>
                <h3 className="text-2xl font-lexend font-bold text-slate-800 mb-2">Missing something?</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    If you're looking for a specific tool or comparison that isn't listed here, let me know in the community forum.
                </p>
                <a 
                    href="https://labfab.discourse.group/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all inline-block shadow-lg"
                >
                    Go to Forum
                </a>
            </div>
        </div>
    );
};

export default Resources;
