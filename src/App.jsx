import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ChevronUp, Search, GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { allSections } from './data';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState(() => {
    const saved = localStorage.getItem('lastAWSSectionId');
    return saved ? allSections.find(s => s.id === saved) : null;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredSections = allSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (section) => {
    setSelectedSection(section);
    setIsSidebarOpen(false);
    setIsMobileSearchOpen(false);
    if (section) localStorage.setItem('lastAWSSectionId', section.id);
    else localStorage.removeItem('lastAWSSectionId');
  };

  const handleNextPage = () => {
    const idx = allSections.findIndex(s => s.id === selectedSection.id);
    if (idx < allSections.length - 1) handlePageChange(allSections[idx + 1]);
  };

  const handlePrevPage = () => {
    const idx = allSections.findIndex(s => s.id === selectedSection.id);
    if (idx > 0) handlePageChange(allSections[idx - 1]);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-[#0f172a] text-white font-sans">

      {/* MOBILE HEADER */}
      <header className="lg:hidden bg-[#1e293b] border-b border-slate-700 z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handlePageChange(null)}>
            <img src="/aws-logo.png" alt="AWS" className="w-8 h-8" />
            <span className="text-sm font-bold uppercase tracking-wide">AWS CLOUD</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsSidebarOpen(false); }} className="text-[#FF9900] p-2">
              <Search size={18} />
            </button>
            <button onClick={() => { setIsSidebarOpen(!isSidebarOpen); setIsMobileSearchOpen(false); }} className="text-[#FF9900] text-xs font-bold uppercase border border-[#FF9900]/30 px-3 py-1 rounded">
              {isSidebarOpen ? 'Kapat' : 'Menü'}
            </button>
          </div>
        </div>

        <div className={`${isMobileSearchOpen ? 'block' : 'hidden'} px-4 pb-3`}>
          <input type="text" placeholder="Ara..." className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#FF9900]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {searchTerm && filteredSections.length === 0 && <p className="text-sm text-slate-400 mt-2">Sonuç bulunamadı.</p>}
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-14 lg:top-0 left-0 w-80 h-[calc(100vh-56px)] lg:h-screen bg-[#1e293b] border-r border-slate-700 transition-transform duration-300 z-40 flex flex-col`}>
        <div className="p-6 flex-1 flex flex-col overflow-hidden">
          <div className="hidden lg:flex flex-col items-center mb-8 cursor-pointer" onClick={() => handlePageChange(null)}>
            <img src="/aws-logo.png" alt="AWS" className="w-16 h-16 mb-4" />
            <h1 className="text-2xl font-extrabold uppercase tracking-wide">AWS CLOUD</h1>
            <span className="text-xs text-[#FF9900] font-semibold mt-2 uppercase tracking-widest">TÜRKÇE REHBER</span>
            <span className="text-xs text-slate-400 mt-4 border-t border-slate-700 pt-3">Yavuz Barış Özgün</span>
          </div>

          <div className="relative mb-6 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Ara..." className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FF9900]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
            {filteredSections.map(section => (
              <button key={section.id} onClick={() => handlePageChange(section)} className={`w-full text-left px-4 py-3 rounded-lg flex justify-between text-sm transition ${selectedSection?.id === section.id ? 'bg-[#FF9900] text-[#1e293b] font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <span>{String(section.sortOrder).padStart(2, '0')} - {section.title}</span>
                <ChevronRight size={16} />
              </button>
            ))}
            {searchTerm && filteredSections.length === 0 && <p className="text-sm text-slate-400 mt-2">Sonuç bulunamadı.</p>}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-700 text-center text-[10px] text-slate-500">
            © 2026 <a href="https://github.com/BozgunBer-2506" target="_blank" rel="noopener noreferrer" className="text-[#FF9900] hover:underline">The_Bozgun</a>
            <div className="lg:hidden text-slate-400 mt-2">Yavuz Barış Özgün</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto px-6 py-10">
        {selectedSection ? (
          <article className="max-w-4xl mx-auto space-y-6">
            <div className="text-xs font-semibold text-[#FF9900] uppercase tracking-widest">
              Bölüm {String(selectedSection.sortOrder).padStart(2, '0')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">{selectedSection.title}</h1>

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{
              h1: ({ children }) => <h1 className="text-3xl lg:text-4xl font-extrabold mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl lg:text-3xl font-semibold mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl lg:text-2xl font-semibold mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="text-base lg:text-lg text-slate-300 leading-relaxed mb-3">{children}</p>,
              li: ({ children }) => <li className="text-base lg:text-lg text-slate-300 ml-6 list-disc mb-2">{children}</li>,
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="rounded-lg overflow-hidden border border-slate-800 my-4">
                    <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: '16px', background: '#0d1117', fontSize: '13px' }} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-slate-800 text-[#FF9900] px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                );
              },
              details: ({ children }) => <details className="bg-[#1e293b]/50 border border-slate-700 rounded-lg mb-6 overflow-hidden">{children}</details>,
              summary: ({ children }) => <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-bold text-[#FF9900] list-none"><div className="flex items-center gap-2 text-xs font-black uppercase"><GraduationCap size={16} /><span>CEVABI GÖR</span></div><ChevronRight size={16} className="group-open:rotate-90 transition-transform" /></summary>,
              img: ({ ...props }) => <img className="max-w-full h-auto rounded-lg my-4" {...props} />,
            }}>
              {selectedSection.content}
            </ReactMarkdown>

            <div className="flex justify-between pt-10 border-t border-slate-800">
              <button onClick={handlePrevPage} disabled={allSections.findIndex(s => s.id === selectedSection.id) === 0} className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#FF9900] disabled:opacity-0"><ChevronLeft size={16} /> Önceki</button>
              <button onClick={handleNextPage} disabled={allSections.findIndex(s => s.id === selectedSection.id) === allSections.length - 1} className="flex items-center gap-2 text-sm text-[#FF9900] hover:text-orange-400 disabled:opacity-0">Sonraki <ChevronRight size={16} /></button>
            </div>
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <img src="/aws-logo.png" alt="AWS" className="w-40 h-40 mb-8" />
            <h2 className="text-5xl font-extrabold mb-4">Amazon Web Services</h2>
            <h3 className="text-2xl text-[#FF9900] font-bold mb-8">Türkçe Rehberi</h3>
            <p className="text-lg text-slate-300 max-w-xl">Menüden bir bölüm seçerek AWS dünyasına giriş yapın.</p>
          </div>
        )}

        {selectedSection && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 bg-[#FF9900] text-[#1e293b] p-3 rounded-lg"><ChevronUp size={20} /></button>
        )}
      </main>
    </div>
  );
}

export default App;
