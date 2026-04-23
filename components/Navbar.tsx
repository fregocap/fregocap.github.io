import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: t('common.home'), icon: 'fa-house' },
    { path: '/start', label: t('common.startHere'), icon: 'fa-compass' },
    { path: '/coaching', label: t('common.coaching'), icon: 'fa-user-tie' },
    { path: '/tools', label: t('common.tools'), icon: 'fa-calculator' },
    { path: '/resources', label: t('common.resources'), icon: 'fa-toolbox' },
    { path: '/portfolio', label: t('common.portfolio', 'Portfolio'), icon: 'fa-chart-pie' },
    { path: '/blog', label: t('common.blog'), icon: 'fa-newspaper' },
    { path: '/about', label: t('common.about'), icon: 'fa-user' },
    { path: 'https://labfab.discourse.group/', label: t('common.forum'), icon: 'fa-comments', isExternal: true },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Close language menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <i className="fa-solid fa-flask-vial text-xl"></i>
            </div>
            <span className="font-lexend font-bold text-xl text-slate-800 tracking-tight lowercase">labfab.io •</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  <i className={`fa-solid ${item.icon} text-xs`}></i>
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <i className={`fa-solid ${item.icon} text-xs`}></i>
                  <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
              )
            ))}

            {/* Language Switcher Desktop */}
            <div className="relative ml-2" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <span>{currentLang.flag}</span>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isLangOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 hover:bg-slate-50 transition-colors ${i18n.language === lang.code ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'
                        }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
             {/* Language Switcher Mobile Quick Toggle */}
             <button
              onClick={() => {
                const nextLang = i18n.language === 'en' ? 'pt' : i18n.language === 'pt' ? 'fr' : 'en';
                i18n.changeLanguage(nextLang);
              }}
              className="p-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-bold"
            >
              {currentLang.flag}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3 text-slate-600 hover:bg-slate-50"
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.label}</span>
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3 ${isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.label}</span>
                </NavLink>
              )
            ))}
            
            <div className="pt-4 pb-2 px-3 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('common.language')}</div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                      i18n.language === lang.code 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' 
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-xs font-bold">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
