import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Tools from './src/pages/Tools';
import Coaching from './src/pages/Coaching';
import BlogList from './src/pages/BlogList';
import BlogPostDetail from './src/pages/BlogPostDetail';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
          <Navbar />

          <main className="flex-grow max-w-7xl mx-auto px-0 md:px-8 w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
            </Routes>
          </main>

          <footer className="bg-slate-950 text-slate-500 py-24 mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-2 space-y-8">
                  <div className="flex items-center space-x-3 text-white">
                    <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-900/40">
                      <i className="fa-solid fa-flask-vial text-2xl"></i>
                    </div>
                    <span className="font-lexend font-extrabold text-3xl tracking-tight lowercase">labfab.io</span>
                  </div>
                  <p className="text-slate-400 max-w-md text-lg leading-relaxed font-light">
                    Empowering the next generation to reclaim their time through analytical wealth strategies.
                  </p>
                  <div className="flex space-x-6">
                    <a href="https://bsky.app/profile/labfabio.bsky.social" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-xl"><i className="fa-brands fa-bluesky text-xl"></i></a>
                    <a href="https://www.youtube.com/@labfabio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-xl"><i className="fa-brands fa-youtube text-xl"></i></a>
                    <a href="https://www.linkedin.com/in/fabio-capela-phd-3a19925b/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-xl"><i className="fa-brands fa-linkedin text-xl"></i></a>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Navigation</h4>
                  <ul className="space-y-5 text-sm font-medium">
                    <li><a href="#/blog" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                    <li><a href="#/tools" className="hover:text-emerald-400 transition-colors">Tools</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">About</h4>
                  <ul className="space-y-5 text-sm font-medium">
                    <li><a href="#/about" className="hover:text-emerald-400 transition-colors">My Story</a></li>
                    <li><a href="#/coaching" className="hover:text-emerald-400 transition-colors">Coaching</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-900 pt-10 text-[11px] font-medium text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="max-w-sm lowercase">&copy; {new Date().getFullYear()} labfab.io. built for freedom.</p>
                <p className="text-slate-600 italic px-6 py-2 bg-slate-900/50 rounded-lg">Notice: labfab.io provides educational resources and analysis tools. Not intended as individual investment advice.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
