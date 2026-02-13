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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState(() => {
    const saved = localStorage.getItem('lastAWSSectionId');
    return saved ? allSections.find(s => s.id === saved) : null;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredSections = allSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (section) => {
    setSelectedSection(section);
    setIsSidebarOpen(false);
    if (section) {
      localStorage.setItem('lastAWSSectionId', section.id);
    } else {
      localStorage.removeItem('lastAWSSectionId');
    }
  };

  const handleNextPage = () => {
    const currentIndex = allSections.findIndex(s => s.id === selectedSection.id);
    if (currentIndex < allSections.length - 1) {
      handlePageChange(allSections[currentIndex + 1]);
    }
  };

  const handlePrevPage = () => {
    const currentIndex = allSections.findIndex(s => s.id === selectedSection.id);
    if (currentIndex > 0) {
      handlePageChange(allSections[currentIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-[#0f172a] text-white font-sans">
      <header className="lg:hidden bg-[#1e293b] border-b border-slate-700 px-4 py-3 flex justify-between items-center flex-shrink-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handlePageChange(null)}>
          <img src="/aws-logo.png" alt="AWS" className="w-8 h-8" />
          <span className="font-black text-white text-xs tracking-tighter uppercase">AWS CLOUD</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#FF9900] text-xs font-black uppercase border border-[#FF9900]/30 px-3 py-1 rounded">
          {isSidebarOpen ? 'KAPAT' : 'MENÜ'}
        </button>
      </header>

      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-14 lg:top-0 left-0 w-80 h-[calc(100vh-56px)] lg:h-screen bg-[#1e293b] border-r border-slate-700 transition-transform duration-300 z-40 flex flex-col flex-shrink-0 overflow-hidden`}>
        <div className="p-6 flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="hidden lg:flex flex-col items-center justify-center mb-8 cursor-pointer" onClick={() => handlePageChange(null)}>
            <img src="/aws-logo.png" alt="AWS" className="w-16 h-16 mb-4" />
            <div className="text-center">
              <h1 className="text-2xl font-black text-white tracking-[0.2em] mb-1 uppercase">AWS CLOUD</h1>
              <span className="text-[10px] text-[#FF9900] font-bold tracking-[0.3em] uppercase block">TÜRKÇE REHBER</span>
              <span className="text-[11px] text-slate-300 font-semibold mt-3 block border-t border-slate-700 pt-3">Yavuz Barış Özgün</span>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" name="search" placeholder="Ara..." className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FF9900] text-white" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {filteredSections.map((section) => (
              <button key={section.id} onClick={() => handlePageChange(section)} className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between gap-2 transition-all text-sm ${selectedSection?.id === section.id ? 'bg-[#FF9900] text-[#1e293b] font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <span className="font-bold uppercase">{String(section.sortOrder).padStart(2, '0')} - {section.title}</span>
                <ChevronRight size={16} className="flex-shrink-0" />
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-700 text-center">
            <p className="text-[9px] text-slate-500 font-bold">
              © 2026 <a href="https://github.com/BozgunBer-2506" target="_blank" rel="noopener noreferrer" className="text-[#FF9900] hover:underline">The_Bozgun</a>
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0f172a] relative">
        {selectedSection ? (
          <article className="w-full max-w-4xl mx-auto px-4 lg:px-8 py-8 pb-32">
            <div className="prose prose-invert prose-slate max-w-none">
              <div className="mb-6 text-[#FF9900] font-bold tracking-widest text-xs uppercase border-l-4 border-[#FF9900] pl-3">
                BÖLÜM {String(selectedSection.sortOrder).padStart(2, '0')}
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-8 uppercase tracking-tight">{selectedSection.title}</h1>

              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="w-full overflow-hidden rounded-lg my-4 border border-slate-800">
                      <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: '16px', background: '#0d1117', fontSize: '13px' }} {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-slate-800 text-[#FF9900] px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700/50" {...props}>{children}</code>
                  );
                },
                h2: ({ children }) => <h2 className="text-2xl lg:text-3xl font-black text-white mt-10 mb-4 border-b border-slate-800 pb-2 uppercase">{children}</h2>,
                p: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4 text-base lg:text-lg">{children}</p>,
                li: ({ children }) => <li className="text-slate-300 mb-2 text-base lg:text-lg list-disc ml-6">{children}</li>,
                details: ({ children }) => <details className="group bg-[#1e293b]/50 border border-slate-700 rounded-lg mb-6 overflow-hidden">{children}</details>,
                summary: ({ children }) => <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-bold text-[#FF9900] list-none"><div className="flex items-center gap-2 text-xs font-black uppercase"><GraduationCap size={16} /><span>CEVABI GÖR</span></div><ChevronRight size={16} className="group-open:rotate-90 transition-transform" /></summary>,
                img: ({ ...props }) => <img className="max-w-full h-auto rounded-lg my-4" {...props} />,
                div: ({ children, ...props }) => {
                  if (props.className === "answer-content") return <div className="px-4 py-3 bg-[#0f172a] text-[#FF9900] font-bold border-t border-slate-700/50 italic text-base lg:text-lg">{children}</div>;
                  return <div {...props}>{children}</div>;
                }
              }}>{selectedSection.content}</ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
              <button onClick={handlePrevPage} disabled={allSections.findIndex(s => s.id === selectedSection.id) === 0} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 disabled:opacity-0 hover:text-[#FF9900] transition">
                <ChevronLeft size={16} /> ÖNCEKİ
              </button>
              <button onClick={handleNextPage} disabled={allSections.findIndex(s => s.id === selectedSection.id) === allSections.length - 1} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF9900] hover:text-orange-400 transition disabled:opacity-0">
                SONRAKİ <ChevronRight size={16} />
              </button>
            </div>
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
            <div className="relative mb-8 w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9900] to-[#FF7700] rounded-3xl rotate-45 opacity-20 blur-2xl"></div>
              <img src="/aws-logo.png" alt="AWS" className="w-48 h-48 relative" />
            </div>
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-2 uppercase tracking-tight">Amazon Web Services</h2>
            <h2 className="text-3xl lg:text-4xl font-black text-[#FF9900] mb-12 uppercase tracking-tight">Türkçe Rehberi</h2>
            <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-2 border-[#FF9900]/30 px-12 py-10 lg:px-16 lg:py-12 rounded-2xl shadow-2xl max-w-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF9900] to-transparent"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent to-[#FF9900]"></div>
              <p className="text-slate-300 text-lg lg:text-2xl font-bold mb-6 leading-relaxed">
                AWS bulut hizmetlerini Türkçe olarak detaylı ve anlaşılır bir şekilde öğrenin.
              </p>
              <p className="text-slate-400 text-sm lg:text-lg">
                <span className="text-[#FF9900] font-bold">Menüden</span> bir bölüm seçerek başlayın veya <span className="text-[#FF9900] font-bold">yukarıda ara</span> yapın.
              </p>
            </div>
          </div>
        )}

        {selectedSection && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 bg-[#FF9900] text-[#1e293b] p-3 rounded-lg z-50 hover:bg-orange-400 transition font-bold">
            <ChevronUp size={20} />
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
