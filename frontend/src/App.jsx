import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, Share2, Search, Zap, Terminal, Activity, Globe, Info, Cpu, Sparkles, Camera, Upload, Briefcase, Building2, MapPin, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const API_BASE = 'http://localhost:8000/api';

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Profile Form States
  const [userName, setUserName] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [userInput, setUserInput] = useState('');
  const fileInputRef = useRef(null);
  
  // Other Form States
  const [searchQuery, setSearchQuery] = useState('');
  const [jobQuery, setJobQuery] = useState('');
  const [contentTopic, setContentTopic] = useState('');
  const [inmailContext, setInmailContext] = useState('');

  // Job Post States
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSalary, setJobSalary] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = async (endpoint, data, isMultipart = false) => {
    setLoading(true);
    setResult(null);
    try {
      const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const res = await axios.post(`${API_BASE}/${endpoint}`, data, config);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'NEURAL_LINK Connection Failure: Check if backend is active.' });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSynth = () => {
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('user_input', userInput);
    formData.append('photo', photoFile);
    handleAction('profile', formData, true);
  };

  const tabs = [
    { id: 'profile', icon: <User />, label: 'Profile Synth', hint: 'Convert experience into a formatted professional profile.' },
    { id: 'networking', icon: <Globe />, label: 'Hive Connect', hint: 'Draft context-driven networking messages.' },
    { id: 'search', icon: <Search />, label: 'Quantum Scan', hint: 'Locate professionals across neural sectors.' },
    { id: 'jobs', icon: <Briefcase />, label: 'Career Grid', hint: 'Search and apply for high-level neural positions.' },
    { id: 'recruit', icon: <Building2 />, label: 'Deploy Node', hint: 'Corporate access to post new career opportunities.' },
    { id: 'content', icon: <Zap />, label: 'Pulse Creator', hint: 'Generate viral posts and engagement loops.' },
  ];

  const renderResult = () => {
    if (!result) return null;
    if (result.error) return <div className="text-red-400 p-4 border border-red-900 bg-red-950/20 rounded-lg">{result.error}</div>;

    if (result.markdown && result.photo_url) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-6 border-b border-white/10 pb-6">
            <div className="relative">
              <img 
                src={result.photo_url} 
                alt={result.name} 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-futuristic-cyan neon-border"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">{result.name}</h3>
              <p className="text-futuristic-cyan font-mono text-sm uppercase tracking-widest">Linked_Neural_Profile</p>
            </div>
          </div>
          <div className="prose prose-invert max-w-none text-blue-50/90 leading-relaxed font-sans mt-4">
            <ReactMarkdown>{result.markdown}</ReactMarkdown>
          </div>
        </div>
      );
    }

    if (typeof result.message === 'string') return <div className="prose prose-invert max-w-none text-blue-100"><ReactMarkdown>{result.message}</ReactMarkdown></div>;
    if (typeof result.content === 'string') return <div className="prose prose-invert max-w-none text-blue-100"><ReactMarkdown>{result.content}</ReactMarkdown></div>;

    if (result.items && Array.isArray(result.items)) {
      // Check if it's a job result by checking fields of the first item
      const isJobResult = result.items.length > 0 && 'salary_range' in result.items[0];

      if (isJobResult) {
        return (
          <div className="flex flex-col gap-6">
            <p className="text-xs text-futuristic-cyan mb-2 font-mono uppercase tracking-[0.3em]">Neural_Careers: {result.items.length} positions located</p>
            {result.items.map((job, i) => (
              <div key={i} className="group p-6 border border-white/10 bg-white/5 rounded-3xl hover:border-blue-500/50 hover:bg-white/10 transition-all shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">{job.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-futuristic-cyan/80">
                      <span className="flex items-center gap-1"><Building2 size={14} /> {job.company}</span>
                      <span className="flex items-center gap-1 text-gray-500"><MapPin size={14} /> {job.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-lg flex items-center gap-1">
                      <DollarSign size={10} /> {job.salary_range}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{job.description}"</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[9px] text-gray-600 font-mono uppercase">Posted_By: {job.posted_by}</span>
                  <button 
                    onClick={() => alert(`Direct neural application sent to ${job.company}!`)}
                    className="px-6 py-2 bg-white text-black text-[10px] font-bold rounded-xl hover:bg-blue-400 hover:text-white transition-all uppercase tracking-tighter"
                  >
                    SYNC_APPLICATION
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-6">
          <p className="text-xs text-futuristic-cyan mb-2 font-mono uppercase tracking-[0.3em]">Scan_Results: {result.items.length} nodes detected</p>
          {result.items.map((item, i) => (
            <div key={i} className="group p-6 border border-white/10 bg-white/5 rounded-3xl hover:border-futuristic-cyan/50 hover:bg-white/10 transition-all cursor-pointer shadow-xl">
              <div className="flex items-start gap-4">
                {item.photo_url && (
                  <img 
                    src={item.photo_url} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border-2 border-futuristic-cyan/30"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xl text-white group-hover:text-futuristic-cyan transition-colors">{item.name}</h4>
                    {item.source === 'local' && (
                      <span className="text-[8px] bg-futuristic-cyan/20 text-futuristic-cyan px-2 py-0.5 rounded-full font-mono uppercase tracking-widest border border-futuristic-cyan/30">Verified_Profile</span>
                    )}
                  </div>
                  <p className="text-futuristic-cyan text-sm font-medium">{item.headline}</p>
                  <p className="text-gray-500 text-xs mt-1 italic flex items-center gap-1 opacity-70"><Globe className="w-3 h-3"/> {item.location}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction('connect', { sender: userName || 'Alice', recipient: item.name });
                    }}
                    className="px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-xl text-[10px] font-mono hover:bg-blue-600/40 transition-all text-blue-300"
                  >
                    CONNECT_LINK
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('networking');
                      setInmailContext(`Professional outreach to ${item.name}`);
                    }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono hover:bg-white/10 transition-all"
                  >
                    SEND_MESSAGE
                  </button>
                </div>
              </div>
              
              {item.markdown && (
                <div className="mt-6 pt-6 border-t border-white/5 prose prose-invert prose-sm max-w-none text-blue-50/70">
                  <ReactMarkdown>{item.markdown}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-black/50 p-4 rounded-lg border border-white/5 overflow-x-auto text-xs font-mono">
        <pre className="text-blue-200">{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#05060f] text-white p-4 font-sans selection:bg-futuristic-cyan/30">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-cyan-400 rounded-lg flex items-center justify-center neon-border">
            <Cpu className="text-black w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
            NEURAL_LINK <span className="text-[10px] text-futuristic-cyan border border-futuristic-cyan/50 px-1 rounded ml-2">CORE_OS</span>
          </h1>
        </div>
        <div className="hidden sm:flex gap-6 text-[10px] font-mono text-gray-500 tracking-widest">
          <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-green-500" /> SYSTEM_ONLINE</span>
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> GRID_ALPHA_STABLE</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="glass-morphism p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-[9px] font-mono text-gray-500 mb-4 flex items-center gap-2 tracking-[0.2em] uppercase"><Info className="w-3 h-3"/> Functions</h3>
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group w-full flex flex-col items-start gap-1 p-4 rounded-xl transition-all ${
                    activeTab === tab.id ? 'bg-blue-600/20 neon-border text-futuristic-cyan border-white/20' : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span className="font-bold tracking-wide text-sm">{tab.label}</span>
                  </div>
                  <p className="text-[9px] mt-1 text-left opacity-60 leading-tight">{tab.hint}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass-morphism p-6 rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl sticky top-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black flex items-center gap-3 tracking-tight">
                <Terminal className="text-futuristic-cyan w-5 h-5" /> INPUT_DEFS
              </h2>
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-futuristic-cyan/30 animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
                    <input 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-futuristic-cyan outline-none transition-all"
                      placeholder="e.g. John Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Camera className="w-3 h-3"/> Profile Photo</label>
                    <div 
                      onClick={() => fileInputRef.current.click()}
                      className="w-full aspect-video bg-black/40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-futuristic-cyan transition-all overflow-hidden"
                    >
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Upload className="text-gray-500 w-8 h-8" />
                          <span className="text-xs text-gray-500 uppercase font-mono">Select_Static_Memory_Asset</span>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      hidden 
                      ref={fileInputRef} 
                      onChange={handlePhotoChange}
                      accept="image/*"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2 tracking-tighter"><Cpu className="w-3 h-3"/> Raw Experience Data</label>
                    <textarea 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:border-futuristic-cyan outline-none h-40 transition-all resize-none shadow-inner"
                      placeholder="Feed the AI your career history..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleProfileSynth}
                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:brightness-125 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all font-mono text-xs uppercase"
                    disabled={loading || !userName || !photoFile}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'S_Y_N_T_H_E_S_I_Z_E'}
                  </button>
                </div>
              )}

              {activeTab === 'networking' && (
                <div className="space-y-4">
                  <textarea 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-400 outline-none h-32 resize-none"
                    placeholder="Connection Context..."
                    value={inmailContext}
                    onChange={(e) => setInmailContext(e.target.value)}
                  />
                  <button 
                    onClick={() => handleAction('inmail', { sender: userName || 'Alice', recipient: 'Target', context: inmailContext })}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all font-mono text-xs"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'TRANSMIT_SIGNAL'}
                  </button>
                </div>
              )}

              {activeTab === 'search' && (
                <div className="space-y-4">
                  <input 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-futuristic-cyan"
                    placeholder="Target Role (e.g. Lead Dev)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    onClick={() => handleAction('search', { query: searchQuery, filters: 'Location: Mars' })}
                    className="w-full bg-futuristic-cyan text-black font-bold py-4 rounded-xl hover:brightness-110 transition-all font-mono text-xs"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'SCAN_GRID'}
                  </button>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Briefcase className="w-3 h-3"/> Job Search</label>
                    <input 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-futuristic-cyan"
                      placeholder="Title, Company, or Keywords..."
                      value={jobQuery}
                      onChange={(e) => setJobQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('jobs/search', { query: jobQuery })}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all font-mono text-xs shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'LOCATE_OPPORTUNITIES'}
                  </button>
                </div>
              )}

              {activeTab === 'recruit' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-1">Title</label>
                      <input 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-400 outline-none"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Lead Dev"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-1">Company</label>
                      <input 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-400 outline-none"
                        value={jobCompany}
                        onChange={(e) => setJobCompany(e.target.value)}
                        placeholder="e.g. Wipro"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-1">Location</label>
                      <input 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-400 outline-none"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        placeholder="Remote / Bangalore"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-1">Salary</label>
                      <input 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-400 outline-none"
                        value={jobSalary}
                        onChange={(e) => setJobSalary(e.target.value)}
                        placeholder="e.g. $100k - $150k"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500 ml-1">Role Description</label>
                    <textarea 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-400 outline-none h-24 resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Briefly describe the responsibilities..."
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('jobs/post', { 
                      title: jobTitle, 
                      company: jobCompany, 
                      location: jobLocation, 
                      description: jobDescription, 
                      posted_by: userName || 'Admin', 
                      salary_range: jobSalary 
                    })}
                    className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-4 rounded-xl hover:brightness-125 transition-all font-mono text-xs uppercase"
                    disabled={loading || !jobTitle || !jobCompany}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'DEPLOY_JOB_NODE'}
                  </button>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-4">
                  <input 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none" 
                    placeholder="Pulse Topic..."
                    value={contentTopic}
                    onChange={(e) => setContentTopic(e.target.value)}
                  />
                  <button 
                    onClick={() => handleAction('content', { content_type: 'post', topic: contentTopic })}
                    className="w-full bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-bold py-4 rounded-xl transition-all font-mono text-xs"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'BROADCAST_LOOP'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/10 min-h-[600px] flex flex-col bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8 text-[9px] font-mono text-gray-500 tracking-[0.4em] uppercase">
              <h2 className="flex items-center gap-2"><Share2 className="text-blue-400 w-3 h-3" /> Output_Stream</h2>
              <span>Buffer: 100%</span>
            </div>
            
            <div className="flex-grow">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-6">
                  <Sparkles size={80} className="animate-spin-slow text-futuristic-cyan" />
                  <p className="font-mono text-xs tracking-widest uppercase">System_Idling_Wait_For_Input</p>
                </div>
              )}

              {loading && (
                <div className="space-y-8 animate-pulse">
                  <div className="h-10 bg-white/5 rounded-2xl w-1/2"></div>
                  <div className="space-y-4">
                    <div className="h-40 bg-white/5 rounded-[2rem]"></div>
                    <div className="h-4 bg-white/5 rounded-full w-full"></div>
                    <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {result && (
                  <motion.div 
                    key={loading ? 'loading' : 'done'}
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="animate-in fade-in zoom-in duration-500"
                  >
                    {renderResult()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#05060f]/80 backdrop-blur-xl border-t border-white/5 p-3 flex justify-center gap-8 text-[8px] font-mono text-gray-600 tracking-widest uppercase items-center">
        <span>© 2026 Neural_Link_Systems</span>
        <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
        <span>Secure_Encryption_AES_256</span>
        <span className="w-1 h-1 bg-green-500 rounded-full animate-ping"></span>
        <span>Realtime_Feed</span>
      </div>
    </div>
  );
}

export default App;
