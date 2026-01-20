import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Share2, Search, Zap, Terminal, Activity, Globe, Info, Cpu, Sparkles, Camera, Upload, Briefcase, Building2, MapPin, DollarSign, Bookmark, Heart, LayoutDashboard, LogIn, Shield, ExternalLink, ChevronRight, Settings, Map, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const API_BASE = 'http://localhost:8000/api';

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const Modal = ({ item, onClose, type }) => {
    if (!item) return null;
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white border border-slate-200 p-8 rounded-[2.5rem] max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl neon-border"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-slate-900 transition-colors">
            <Zap className="w-6 h-6 rotate-45" />
          </button>
          
          {type === 'job' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 leading-tight underline decoration-blue-500 decoration-4 underline-offset-8">{item.title}</h2>
                   <p className="text-blue-600 font-bold flex items-center gap-2 mt-4"><Building2 size={18}/> {item.company}</p>
                </div>
                <div className="text-right">
                  <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-4 py-2 rounded-full text-xs font-mono block mb-1">{item.salary_range}</span>
                  <span className="text-[9px] text-gray-400 font-mono uppercase">Node_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Deployment_Site</p>
                  <p className="text-slate-900 font-bold">{item.location}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest flex items-center gap-2 justify-end"><User size={12}/> Origin_Entity</p>
                  <p className="text-blue-600 font-bold">{item.posted_by}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-mono uppercase text-gray-400 tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Mission_Parameters
                </h4>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 leading-relaxed text-slate-700 italic font-sans text-lg">
                  "{item.description}"
                </div>
              </div>

              <button onClick={() => alert('Neural sync successful. Application deployed.')} className="w-full py-5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-black rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3">
                <Zap size={20} /> INITIATE_NEURAL_UPLOAD
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-8 pb-8 border-b border-slate-100">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <img src={item.photo_url} className="relative w-32 h-32 rounded-[2.2rem] object-cover border-2 border-slate-100 shadow-2xl" />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-4 border-white">
                    <Activity size={16} className="text-white animate-pulse" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{item.name}</h2>
                  <p className="text-blue-600 font-mono text-sm uppercase tracking-[0.3em] mt-2 font-black">{item.headline}</p>
                  <div className="flex gap-4 mt-4">
                    <span className="text-[9px] bg-slate-50 px-3 py-1 rounded-full text-gray-500 font-mono uppercase border border-slate-100 flex items-center gap-2">
                      <Globe size={10} /> Grid_Alpha
                    </span>
                    <span className="text-[9px] bg-slate-50 px-3 py-1 rounded-full text-gray-500 font-mono uppercase border border-slate-100 flex items-center gap-2">
                      <Cpu size={10} /> Verified_Core
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.4em] flex items-center gap-2">
                      <Sparkles size={12} className="text-blue-600" /> Core_Synthesis
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed font-sans">{item.summary}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] flex items-center gap-2">
                      <Zap size={12} className="text-yellow-500" /> Neural_Connectors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(item.skills || "AI, Neural Networks, Grid Architecture").split(',').map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg border border-blue-100 uppercase tracking-tight">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 group hover:border-blue-500/30 transition-all">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Briefcase size={12} /> XP_Registry
                    </h4>
                    <p className="text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">{item.experience}</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 group hover:border-blue-500/30 transition-all">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Building2 size={12} /> Edu_Sector
                    </h4>
                    <p className="text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">{item.education}</p>
                  </div>
                </div>
              </div>

              {item.markdown && (
                <div className="pt-6 border-t border-slate-100">
                   <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] mb-4">Neural_Brief_MD</h4>
                   <div className="prose prose-sm max-w-none text-slate-700 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <ReactMarkdown>{item.markdown}</ReactMarkdown>
                   </div>
                </div>
              )}

              <button onClick={() => alert('Broadcasting neural signal to target entity...')} className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all uppercase tracking-tighter shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                <Globe size={20} /> ESTABLISH_DIRECT_NEURAL_LINK
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };
  
  // Identity and Auth State
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('neural_user') || '');
  const [vaultData, setVaultData] = useState(null);
  const [selectedVaultItem, setSelectedVaultItem] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(!localStorage.getItem('neural_user'));
  const [loginInput, setLoginInput] = useState('');
  const [activities, setActivities] = useState([
    { id: 1, type: 'AUTH', text: 'Neural identity synced to grid.', time: 'Just now' },
    { id: 2, type: 'SYSTEM', text: 'Secure encryption layers active.', time: '2m ago' }
  ]);

  const addActivity = (type, text) => {
    setActivities(prev => [{
      id: Date.now(),
      type: type,
      text: text,
      time: 'Just now'
    }, ...prev].slice(0, 10));
  };

  // Profile Form States
  const [userName, setUserName] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [showReview, setShowReview] = useState(false);
  const fileInputRef = useRef(null);
  
  // Other Form States
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [jobQuery, setJobQuery] = useState('');
  const [contentTopic, setContentTopic] = useState('');
  const [contentLength, setContentLength] = useState('medium');
  const [geoLoc, setGeoLoc] = useState('');
  const [inmailContext, setInmailContext] = useState('');

  // Job Post States
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [showJobReview, setShowJobReview] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('neural_user', currentUser);
      fetchVault();
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeTab === 'vault' && vaultData) {
      setResult(vaultData);
    }
  }, [activeTab, vaultData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginInput.trim()) {
      setCurrentUser(loginInput.trim());
      setIsLoggedOut(false);
      setUserName(loginInput.trim());
      addActivity('AUTH', `Identity ${loginInput.trim()} initialized.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('neural_user');
    setCurrentUser('');
    setIsLoggedOut(true);
    setVaultData(null);
    setResult(null);
  };

  const fetchVault = async () => {
    if (!currentUser) return;
    try {
      const userId = currentUser.toLowerCase().replace(/ /g, '_');
      const res = await axios.get(`${API_BASE}/vault/${userId}`);
      setVaultData(res.data);
    } catch (err) {
      console.error('Vault Access Error', err);
    }
  };

  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get(`${API_BASE}/health`);
        setBackendStatus('ACTIVE');
      } catch (err) {
        setBackendStatus('OFFLINE');
      }
    };
    checkBackend();
  }, []);

  const handleSearchChange = async (val) => {
    setSearchQuery(val);
    if (val.length > 0) {
      try {
        const res = await axios.get(`${API_BASE}/search/suggestions?q=${val}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const saveToVault = async (item, type) => {
    if (!currentUser) {
      alert('Please initialize your Neural Identity first.');
      return;
    }
    try {
      const userId = currentUser.toLowerCase().replace(/ /g, '_');
      await axios.post(`${API_BASE}/vault/save`, {
        user_id: userId,
        item_id: item.id || item.name || Math.random().toString(),
        item_type: type,
        item_data: item
      });
      fetchVault();
      addActivity('VAULT', `Saved ${type}: ${item.name || item.title}`);
      alert('Asset Synchronized to Vault.');
    } catch (err) {
      console.error(err);
    }
  };

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
      const res = await axios.post(`${API_BASE}/${endpoint}`, data);
      setResult(res.data);
      addActivity('ACTION', `Interface command executed: ${endpoint}`);
    } catch (err) {
      console.error(err);
      setResult({ error: `NEURAL_LINK Connection Failure: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSyntheticJob = async () => {
    if (!jobTitle) {
      alert('Please enter a Title Hint first.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/jobs/generate`, { title_hint: jobTitle });
      const data = res.data;
      setJobTitle(data.title);
      setJobCompany(data.company);
      setJobLocation(data.location);
      setJobSalary(data.salary_range);
      setJobDescription(data.description);
      
      // Show synthetic data on right side
      setResult({ 
        type: 'synthetic_job', 
        data: data 
      });

      addActivity('AI', `Synthetic job generated for: ${data.title}`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate synthetic data.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSynth = () => {
    if (!userName || !photoFile || !headline || !summary || !experience || !education || !skills) {
      alert('Please fill in all neural data nodes before synthesis.');
      return;
    }
    setShowReview(true);
  };

  const confirmProfileUpload = async () => {
    const formData = new FormData();
    const userId = currentUser.toLowerCase().replace(/ /g, '_');
    formData.append('user_id', userId);
    formData.append('name', userName);
    formData.append('headline', headline);
    formData.append('summary', summary);
    formData.append('experience', experience);
    formData.append('education', education);
    formData.append('skills', skills);
    formData.append('photo', photoFile);
    await handleAction('profile', formData, true);
    setShowReview(false);
    fetchVault();
  };

  const handleJobReview = () => {
    if (!jobTitle || !jobCompany || !jobLocation || !jobDescription || !jobSalary) {
      alert('Please fill in all mission parameters for the job node.');
      return;
    }
    // Show confirmation on right side instead of left
    setResult({
      type: 'job_review',
      data: {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        description: jobDescription,
        salary: jobSalary
      }
    });
  };

  const confirmJobDeployment = () => {
    handleAction('jobs/post', { 
      title: jobTitle, 
      company: jobCompany, 
      location: jobLocation, 
      description: jobDescription, 
      posted_by: userName || 'Admin', 
      salary_range: jobSalary 
    });
  };

  const tabs = [
    { id: 'profile', icon: <User />, label: 'Add profile', hint: 'Convert experience into a formatted professional profile.' },
    { id: 'networking', icon: <Globe />, label: 'Hive Connect', hint: 'Draft context-driven networking messages.' },
    { id: 'search', icon: <Search />, label: 'Search profile', hint: 'Locate professionals across neural sectors.' },
    { id: 'jobs', icon: <Briefcase />, label: 'Search jobs', hint: 'Search and apply for high-level neural positions.' },
    { id: 'vault', icon: <LayoutDashboard />, label: 'My profile', hint: 'Your identity, saved assets, and neural activities.' },
    { id: 'recruit', icon: <Building2 />, label: 'Deploy job', hint: 'Corporate access to post new career opportunities.' },
    { id: 'content', icon: <Zap />, label: 'Blog generator', hint: 'Generate professional long-form neural blogs.' },
    { id: 'geo', icon: <Map />, label: 'Geo-Sync', hint: 'Map neural sectors and physical grid locations.' },
  ];

  const renderResult = () => {
    if (!result) return null;
    if (result.error) return <div className="text-red-400 p-4 border border-red-900 bg-red-950/20 rounded-lg">{result.error}</div>;

    // Handle Vault Rendering
    if (result.saved_jobs || result.saved_profiles || result.own_profile) {
      return (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-12">
           <div className="flex items-center justify-between">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">NEURAL_DASHBOARD</h2>
             <span className="text-[10px] font-mono text-blue-600 tracking-[0.2em] border border-blue-200 px-3 py-1 rounded-full">{currentUser?.toUpperCase()} // 0x7F22A</span>
           </div>

           {result.own_profile ? (
            <div 
              onClick={() => setSelectedVaultItem({ data: result.own_profile, type: 'profile' })}
              className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-[2.5rem] relative overflow-hidden group shadow-md cursor-pointer hover:border-blue-500/30 transition-all"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
              
              <h4 className="text-[10px] font-mono text-blue-600/60 uppercase mb-6 tracking-[0.4em] font-bold flex items-center gap-2">
                <Shield size={12}/> Verified_Identity_Matrix
              </h4>
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
                  <div className="relative group/photo">
                    <img src={result.own_profile.photo_url} className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-2 border-white ring-4 ring-blue-500/10" />
                    <div className="absolute inset-0 rounded-3xl bg-blue-600/10 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                      <Search className="text-white" />
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{result.own_profile.name}</h3>
                      <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mt-2">{result.own_profile.headline}</p>
                    </div>
                    <div className="prose prose-sm prose-slate opacity-80 leading-relaxed max-w-2xl text-slate-600 line-clamp-3 italic">
                      <ReactMarkdown>{result.own_profile.markdown.substring(0, 300) + '...'}</ReactMarkdown>
                    </div>
                    <div className="flex gap-3">
                       <span className="px-3 py-1 bg-white border border-blue-100 rounded-full text-[8px] font-mono text-blue-600 font-bold uppercase tracking-tighter shadow-sm">Identity_Stable</span>
                       <span className="px-3 py-1 bg-white border border-blue-100 rounded-full text-[8px] font-mono text-blue-600 font-bold uppercase tracking-tighter shadow-sm">Core_Verified</span>
                    </div>
                  </div>
              </div>
            </div>
           ) : (
             <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center text-center space-y-4 group hover:border-blue-500/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                  <UserPlus size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">No_Neural_Identity_Detected</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">Initialize your professional dossier in the 'Add Profile' tab to synchronize with the neural grid.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="px-6 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 transition-all uppercase tracking-tighter"
                >
                  START_SYNTHESIS
                </button>
             </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Briefcase size={14} className="text-blue-600" /> Saved Nodes</h4>
                  <span className="text-[9px] font-mono text-gray-400">COUNT: {result.saved_jobs.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {result.saved_jobs.map((job, i) => (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      key={i} 
                      onClick={() => setSelectedVaultItem({ data: job, type: 'job' })}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-500/30 cursor-pointer transition-all flex justify-between items-center group shadow-sm hover:shadow-blue-500/10"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{job.title}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-mono">{job.company}</p>
                      </div>
                      <ExternalLink size={12} className="text-gray-400 group-hover:text-blue-600" />
                    </motion.div>
                  ))}
                  {result.saved_jobs.length === 0 && <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-[10px] text-gray-400 uppercase font-mono">No active job nodes</div>}
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><User size={14} className="text-blue-600" /> Synced Entities</h4>
                    <span className="text-[9px] font-mono text-gray-400">COUNT: {result.saved_profiles.length}</span>
                 </div>
                 <div className="grid grid-cols-1 gap-3">
                    {result.saved_profiles.map((profile, i) => (
                      <motion.div 
                        whileHover={{ x: 5 }}
                        key={i} 
                        onClick={() => setSelectedVaultItem({ data: profile, type: 'profile' })}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4 hover:border-blue-600/30 cursor-pointer transition-all group shadow-sm hover:shadow-blue-500/10"
                      >
                        <img src={profile.photo_url} className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all border border-slate-200" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{profile.name}</p>
                          <p className="text-[9px] text-gray-400 uppercase font-mono truncate max-w-[150px]">{profile.headline || 'Neural Entity'}</p>
                        </div>
                        <ChevronRight size={14} className="text-gray-400 group-hover:text-blue-600" />
                      </motion.div>
                    ))}
                    {result.saved_profiles.length === 0 && <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-[10px] text-gray-400 uppercase font-mono">No peer nodes synced</div>}
                 </div>
              </div>
           </div>

           {/* Blogs Section */}
           {result.saved_content && result.saved_content.length > 0 && (
             <div className="pt-8 space-y-6">
               <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                 <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Zap size={14} className="text-yellow-500" /> Stored_Intelligence (Blogs)</h4>
                 <span className="text-[9px] font-mono text-gray-400">COUNT: {result.saved_content.length}</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {result.saved_content.map((blog, i) => (
                   <motion.div 
                     whileHover={{ scale: 1.01 }}
                     key={i} 
                     onClick={() => setResult({ content: blog.content })}
                     className="p-6 bg-slate-50 border border-slate-200 rounded-3xl hover:border-yellow-500/30 cursor-pointer transition-all group"
                   >
                     <div className="flex justify-between items-start mb-2">
                       <h5 className="text-sm font-black text-slate-900 group-hover:text-yellow-500 transition-colors uppercase tracking-tight">{blog.name}</h5>
                       <Zap size={12} className="text-yellow-500 opacity-50" />
                     </div>
                     <p className="text-[10px] text-gray-500 font-mono line-clamp-2 italic">
                       {blog.content.substring(0, 100)}...
                     </p>
                   </motion.div>
                 ))}
               </div>
             </div>
           )}

           {/* Activities Section in Dashboard */}
           <div className="pt-8 space-y-6">
             <div className="flex items-center justify-between border-b border-slate-200 pb-2">
               <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Activity size={14} className="text-green-600" /> Neural_Log</h4>
             </div>
             <div className="space-y-3">
                {activities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-mono group shadow-sm hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                      <span className={`w-1.5 h-1.5 rounded-full ${act.type === 'AUTH' ? 'bg-blue-600' : act.type === 'VAULT' ? 'bg-yellow-500' : 'bg-green-600'} animate-pulse`} />
                      <span className="text-gray-400 w-16">[{act.type}]</span>
                      <span className="text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-tighter font-medium">{act.text}</span>
                    </div>
                    <span className="text-gray-400">{act.time}</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      );
    }

    if (result.type === 'geo') {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
                <MapPin className="text-blue-600 w-8 h-8" /> {result.location}
              </h3>
              <p className="text-[10px] font-mono text-blue-600/60 uppercase tracking-[0.3em]">Neural_Geospatial_Intelligence_Report</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Grid_Coords:</span>
              <span className="text-xs font-mono text-blue-600 font-bold">{result.lat.toFixed(4)}N / {result.lon.toFixed(4)}E</span>
            </div>
          </div>
          
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Activity className="w-24 h-24 text-blue-600" />
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-2xl shrink-0">
                <Shield size={20} className="text-blue-600" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Encapsulated_Summary</h4>
                <p className="text-sm text-slate-800 font-medium italic leading-relaxed">
                  "{result.summary}"
                </p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none pt-4">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg relative">
              <div className="absolute -top-3 left-8 px-4 py-1 bg-white border border-slate-200 rounded-full text-[8px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                Detailed_Analysis_v1.0.4
              </div>
              <div className="prose-h1:text-xl prose-h1:font-black prose-h1:tracking-tighter prose-h1:uppercase prose-h1:text-slate-900
                            prose-h2:text-lg prose-h2:font-black prose-h2:tracking-tight prose-h2:uppercase prose-h2:text-blue-600
                            prose-p:text-sm prose-p:text-slate-700 prose-p:leading-relaxed
                            prose-li:text-sm prose-li:text-slate-600">
                <ReactMarkdown>{result.report}</ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group cursor-help">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Network_Density</span>
                <span className="text-xs font-black text-green-600 uppercase tracking-tighter">OPTIMAL</span>
             </div>
             <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group cursor-help">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Economic_Status</span>
                <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">HIGH_VALUE</span>
             </div>
          </div>
        </div>
      );
    }

    if (result.markdown && result.photo_url) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-6 border-b border-slate-200 pb-6">
            <div className="relative">
              <img 
                src={result.photo_url} 
                alt={result.name} 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-600 shadow-lg"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{result.name}</h3>
              <p className="text-blue-600 font-mono text-sm uppercase tracking-widest">Linked_Neural_Profile</p>
            </div>
          </div>
          <div className="prose max-w-none text-slate-700 leading-relaxed font-sans mt-4
                      prose-h1:text-xl prose-h1:font-black prose-h1:text-slate-900
                      prose-h2:text-lg prose-h2:font-black prose-h2:text-blue-600
                      prose-p:text-sm prose-p:text-slate-700
                      prose-li:text-sm prose-li:text-slate-600">
            <ReactMarkdown>{result.markdown}</ReactMarkdown>
          </div>
        </div>
      );
    }

    if (typeof result.message === 'string') return <div className="prose max-w-none text-slate-900 bg-white p-6 rounded-2xl border border-slate-200"><ReactMarkdown>{result.message}</ReactMarkdown></div>;

    if (result.type === 'synthetic_job') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Sparkles size={24} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase font-mono tracking-widest">Synthetic_Job_Analysis</h4>
              <p className="text-[10px] text-blue-600/70 uppercase tracking-tighter italic">AI-Engineered Corporate Identity & Mission Brief.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Position_Registry</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{result.data.title}</h3>
                <p className="text-blue-600 font-bold text-lg uppercase tracking-tight">{result.data.company}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Compensation_Node</p>
                <p className="text-blue-600 font-black text-xl">{result.data.salary_range}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Strategic_Location</p>
                <div className="flex items-center gap-2 text-slate-800">
                  <MapPin size={14} className="text-blue-600" />
                  <span className="font-bold">{result.data.location}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Sync_Status</p>
                <div className="flex items-center gap-2 text-green-500">
                  <Activity size={14} className="animate-pulse" />
                  <span className="font-bold uppercase text-[10px]">VERIFIED_SYNTHETIC</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Neural_Mission_Brief</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed font-medium italic text-sm">
                "{result.data.description}"
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex items-center gap-3">
             <Info size={14} className="text-yellow-600" />
             <p className="text-[10px] text-yellow-600/80 uppercase font-mono tracking-tighter">Fields have been synchronized to the left deployment console for final validation.</p>
          </div>
        </div>
      );
    }

    if (result.type === 'job_review') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield size={24} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase font-mono tracking-widest">Job_Sync_Protocol</h4>
              <p className="text-[10px] text-blue-400/70 uppercase tracking-tighter">Review mission parameters before deploying to the grid.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Position_Registry</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{result.data.title}</h3>
                <p className="text-blue-600 font-bold text-lg uppercase tracking-tight">{result.data.company}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Compensation</p>
                <p className="text-blue-600 font-black text-xl">{result.data.salary}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest mb-3">Deployment_Site</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs">
                <MapPin size={14} className="text-blue-600" />
                {result.data.location}
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest mb-3">Mission_Brief</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-800 italic leading-relaxed shadow-inner">
                "{result.data.description}"
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={confirmJobDeployment}
                className="w-full py-5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-black rounded-3xl hover:brightness-110 shadow-lg transition-all font-mono text-xs uppercase tracking-[0.2em]"
              >
                DEPLOY_TO_GRID_v4.0
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (typeof result.content === 'string') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-2">
              <Zap className="text-blue-600" /> Generated_Content
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => saveToVault({ name: contentTopic, content: result.content }, 'content')}
                className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-[10px] font-bold rounded-xl hover:bg-yellow-500/20 transition-all flex items-center gap-2"
              >
                <Bookmark size={12} /> SAVE_TO_VAULT
              </button>
              <button 
                onClick={() => handleAction('content', { content_type: 'blog', topic: contentTopic, length: contentLength })}
                className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 text-[10px] font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                <Activity size={12} className={loading ? 'animate-spin' : ''} /> REGENERATE
              </button>
            </div>
          </div>
          <div className="prose max-w-none text-slate-800 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
            <ReactMarkdown>{result.content}</ReactMarkdown>
          </div>
        </div>
      );
    }

    if (result.items && Array.isArray(result.items)) {
      // Check if it's a job result by checking fields of the first item
      const isJobResult = result.items.length > 0 && 'salary_range' in result.items[0];

      if (isJobResult) {
        return (
          <div className="flex flex-col gap-6">
            <p className="text-xs text-blue-600 mb-2 font-mono uppercase tracking-[0.3em]">Neural_Careers: {result.items.length} positions located</p>
            {result.items.map((job, i) => (
              <div key={i} className="group p-6 border border-slate-200 bg-white rounded-3xl hover:border-blue-500/50 hover:bg-slate-50 transition-all shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-blue-600/80">
                      <span className="flex items-center gap-1"><Building2 size={14} /> {job.company}</span>
                      <span className="flex items-center gap-1 text-gray-400"><MapPin size={14} /> {job.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2 py-1 rounded-lg flex items-center gap-1">
                      <DollarSign size={10} /> {job.salary_range}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">"{job.description}"</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => saveToVault(job, 'job')}
                      className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-[9px] font-bold rounded-lg hover:bg-yellow-500/20 transition-all uppercase flex items-center gap-1"
                    >
                      <Bookmark size={10} /> SAVE_JOB
                    </button>
                    <button 
                      onClick={() => alert(`Direct neural application sent to ${job.company}!`)}
                      className="px-6 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 transition-all uppercase tracking-tighter shadow-md"
                    >
                      SYNC_APPLICATION
                    </button>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono uppercase">Posted_By: {job.posted_by}</span>
                </div>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-6">
          <p className="text-xs text-blue-600 mb-2 font-mono uppercase tracking-[0.3em]">Scan_Results: {result.items.length} nodes detected</p>
          {result.items.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedVaultItem({ data: item, type: 'profile' })}
              className="group p-6 border border-slate-200 bg-white rounded-3xl hover:border-blue-500/50 hover:bg-slate-50 transition-all cursor-pointer shadow-xl relative"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={14} className="text-blue-600" />
              </div>
              <div className="flex items-start gap-4">
                {item.photo_url && (
                  <img 
                    src={item.photo_url} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border-2 border-blue-100"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                    <div className="flex gap-2">
                       {item.source === 'local' && (
                         <span className="text-[8px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest border border-blue-200">Verified_Profile</span>
                       )}
                       {item.source === 'neural_search' && (
                         <span className="text-[8px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest border border-purple-200 flex items-center gap-1"><Zap size={8}/> Neural_Intelligence</span>
                       )}
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm font-medium">{item.headline}</p>
                  <p className="text-gray-400 text-xs mt-1 italic flex items-center gap-1 opacity-70"><Globe className="w-3 h-3"/> {item.location}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction('connect', { sender: userName || 'Alice', recipient: item.name });
                    }}
                    className="px-4 py-2 bg-blue-100 border border-blue-200 rounded-xl text-[10px] font-mono hover:bg-blue-200 transition-all text-blue-700"
                  >
                    CONNECT_LINK
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      saveToVault(item, 'profile');
                    }}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-mono hover:bg-slate-100 transition-all text-yellow-600 flex items-center gap-1"
                  >
                    <Bookmark size={10}/> SAVE_NODE
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('networking');
                      setInmailContext(`Professional outreach to ${item.name}`);
                    }}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-mono hover:bg-slate-100 transition-all text-slate-700 font-bold"
                  >
                    SEND_MESSAGE
                  </button>
                </div>
              </div>
              
              {item.markdown && (
                <div className="mt-6 pt-6 border-t border-slate-100 prose prose-sm max-w-none text-slate-700">
                  <ReactMarkdown>{item.markdown}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-x-auto text-xs font-mono">
        <pre className="text-blue-700">{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 p-4 font-sans selection:bg-blue-500/20">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
            <Cpu className="text-white w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-blue-600">
            NEURAL_LINK <span className="text-[10px] text-blue-600 border border-blue-500/50 px-1 rounded ml-2 font-mono">CORE_OS</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-6 text-[10px] font-mono text-gray-400 tracking-widest">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-green-500" /> SYSTEM_ONLINE</span>
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> GRID_ALPHA_STABLE</span>
          </div>
          {!isLoggedOut && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-50 to-red-100 border border-red-200 rounded-lg text-red-600 text-[9px] font-mono hover:bg-red-200 transition-all uppercase tracking-tighter"
            >
              <LogIn size={12} className="rotate-180" /> TERMINATE_SESSION
            </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {isLoggedOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50/95 backdrop-blur-2xl"
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="glass-morphism p-12 rounded-[3rem] border border-slate-200 max-w-md w-full text-center space-y-8 shadow-2xl"
            >
               <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                 <Cpu className="text-white w-10 h-10 animate-pulse" />
               </div>
               <div className="space-y-2">
                 <h2 className="text-3xl font-black tracking-tighter text-slate-900">INITIALIZE_LINK</h2>
                 <p className="text-xs text-gray-400 font-mono uppercase tracking-[0.2em]">Enter your neural identity to access the grid.</p>
               </div>
               <form onSubmit={handleLogin} className="space-y-4">
                 <input 
                   autoFocus
                   className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-5 px-6 text-center text-lg font-bold tracking-widest text-slate-900 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                   placeholder="IDENTITY_KEY"
                   value={loginInput}
                   onChange={(e) => setLoginInput(e.target.value)}
                 />
                 <button 
                    type="submit"
                    className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl uppercase tracking-tighter"
                 >
                   SYNC_NEURAL_CORE
                 </button>
               </form>
               <div className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                 SECURE_CONNECTION_STABLE // NO_UNAUTHORIZED_ACCESS
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* User Profile Summary Card */}
          <div className="glass-morphism p-6 rounded-3xl border border-slate-200 bg-white relative overflow-hidden group shadow-sm">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            <div className="flex flex-col items-center text-center space-y-3 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-slate-200 p-0.5 border border-slate-200 group-hover:border-blue-500/50 transition-all">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                  {vaultData?.own_profile?.photo_url ? (
                    <img src={vaultData.own_profile.photo_url} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-blue-600 w-8 h-8" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900">
                  {vaultData?.own_profile?.name || currentUser || "AUTH_PENDING"}
                </h3>
                <p className="text-[9px] font-mono text-blue-600 uppercase tracking-widest flex items-center justify-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-600 animate-pulse" />
                  {vaultData?.own_profile?.headline ? "Grid_Identity_Verified" : "Neural Rank: Alpha"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full pt-2">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 text-center">
                  <p className="text-[8px] font-mono text-gray-400 uppercase">Nodes</p>
                  <p className="text-sm font-bold text-slate-900">{vaultData?.saved_profiles?.length || 0}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 text-center">
                  <p className="text-[8px] font-mono text-gray-400 uppercase">Jobs</p>
                  <p className="text-sm font-bold text-slate-900">{vaultData?.saved_jobs?.length || 0}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 text-center col-span-2">
                  <p className="text-[8px] font-mono text-gray-400 uppercase">Stored_Intel (Blogs)</p>
                  <p className="text-sm font-bold text-slate-900">{vaultData?.saved_content?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-4 rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between px-2 mb-4">
               <h3 className="text-[9px] font-mono text-gray-400 flex items-center gap-2 tracking-[0.2em] uppercase font-bold"><Terminal className="w-3 h-3 text-blue-600"/> Terminal_Commands</h3>
               <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[7px] font-bold border ${backendStatus === 'ACTIVE' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                 <div className={`w-1 h-1 rounded-full ${backendStatus === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                 {backendStatus}
               </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                    activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-50 hover:bg-slate-100 text-gray-500'
                  }`}
                >
                  <div className={`${activeTab === tab.id ? 'text-white' : 'text-blue-600 group-hover:scale-110 transition-transform'}`}>
                    {tab.icon}
                  </div>
                  <span className="font-black tracking-widest text-[10px] uppercase">{tab.label}</span>
                  {activeTab === tab.id && <motion.div layoutId="sidebar-dot" className="ml-auto w-1 h-1 rounded-full bg-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass-morphism p-6 rounded-3xl border border-slate-200 bg-white shadow-sm sticky top-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black flex items-center gap-3 tracking-tight text-slate-900">
                <Terminal className="text-blue-600 w-5 h-5" /> INPUT_DEFS
              </h2>
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-600/30 animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Identity Module */}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-2 items-center justify-between flex gap-3">
                <div className="flex-1">
                  <p className="text-[8px] font-mono text-blue-600 uppercase tracking-widest mb-1">Neural_Identity</p>
                  <input 
                    className="bg-transparent border-none text-slate-900 font-bold text-sm outline-none placeholder:text-gray-400 w-full"
                    placeholder="ENTER_ID (e.g. Alice)"
                    value={currentUser}
                    onChange={(e) => setCurrentUser(e.target.value)}
                  />
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentUser ? 'bg-green-500/20 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-red-500/10 text-red-500'}`}>
                  {currentUser ? <LogIn size={14} /> : <Zap size={14} />}
                </div>
              </div>

              {activeTab === 'profile' && !showReview && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-all text-slate-900"
                      placeholder="e.g. John Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Camera className="w-3 h-3"/> Profile Photo</label>
                    <div 
                      onClick={() => fileInputRef.current.click()}
                      className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition-all overflow-hidden"
                    >
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Upload className="text-gray-400 w-8 h-8" />
                          <span className="text-xs text-gray-400 uppercase font-mono">Select_Static_Memory_Asset</span>
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
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Sparkles className="w-3 h-3"/> Headline</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-all text-slate-900"
                      placeholder="e.g. Neural Architect | AI Lead"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Info className="w-3 h-3"/> Professional Summary</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-20 resize-none transition-all text-slate-900"
                      placeholder="Describe your core mission..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Briefcase className="w-3 h-3"/> Experience</label>
                      <textarea 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-32 resize-none transition-all text-slate-900"
                        placeholder="Companies, roles, years..."
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Building2 className="w-3 h-3"/> Education</label>
                      <textarea 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-32 resize-none transition-all text-slate-900"
                        placeholder="Degrees, certifications..."
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Zap className="w-3 h-3"/> Skills & Tech Stack</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-all text-slate-900"
                      placeholder="e.g. Python, React, Neural Networks"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleProfileSynth}
                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:brightness-110 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-lg transition-all font-mono text-xs uppercase"
                    disabled={loading || !userName || !photoFile}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'review profile'}
                  </button>
                </div>
              )}

              {activeTab === 'profile' && showReview && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Zap className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">Verification_Protocol_Active</h4>
                      <p className="text-[9px] text-blue-600/70 uppercase tracking-tighter">Review neural data before committing to the grid.</p>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center gap-4">
                      <img src={photoPreview} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm" />
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-mono">Entity_Name</p>
                        <p className="text-sm font-bold text-slate-900 leading-none mt-1">{userName}</p>
                        <p className="text-[11px] text-blue-600 font-medium mt-1 uppercase tracking-tight">{headline}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100">
                       <div>
                          <p className="text-[9px] text-gray-400 uppercase font-mono mb-1">Summary</p>
                          <p className="text-[11px] text-slate-700 italic leading-relaxed font-sans">{summary}</p>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[9px] text-gray-400 uppercase font-mono mb-1">Experience</p>
                            <p className="text-[10px] text-slate-600 whitespace-pre-wrap">{experience}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 uppercase font-mono mb-1">Education</p>
                            <p className="text-[10px] text-slate-600 whitespace-pre-wrap">{education}</p>
                          </div>
                       </div>
                       <div>
                          <p className="text-[9px] text-gray-400 uppercase font-mono mb-1">Integrated_Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {skills.split(',').map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-bold rounded-md border border-blue-100 uppercase tracking-tighter">{s.trim()}</span>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowReview(false)}
                      className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-mono hover:bg-white/10 transition-all uppercase"
                    >
                      ABORT_EDIT
                    </button>
                    <button 
                      onClick={confirmProfileUpload}
                      className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:brightness-110 shadow-lg transition-all font-mono text-[10px] uppercase"
                    >
                      COMMIT_TO_GRID
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'networking' && (
                <div className="space-y-4">
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:border-blue-400 outline-none h-32 resize-none text-slate-900"
                    placeholder="Connection Context..."
                    value={inmailContext}
                    onChange={(e) => setInmailContext(e.target.value)}
                  />
                  <button 
                    onClick={() => handleAction('inmail', { sender: userName || 'Alice', recipient: 'Target', context: inmailContext })}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all font-mono text-xs"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'TRANSMIT_SIGNAL'}
                  </button>
                </div>
              )}

              {activeTab === 'search' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Search className="w-3 h-3"/> GRID_SELECTOR</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all text-slate-900"
                      placeholder="Target Name or Role..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                  
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-sm"
                      >
                        {suggestions.map((s, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              handleAction('search', { query: s.name, filters: '' });
                              setSuggestions([]);
                              setSearchQuery(s.name);
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                          >
                            <img src={s.photo_url} className="w-10 h-10 rounded-xl object-cover border border-slate-200 group-hover:border-blue-500 transition-all" />
                            <div className="flex-1">
                              <p className="text-sm text-slate-900 font-bold group-hover:text-blue-600 transition-colors">{s.name}</p>
                              <p className="text-[10px] text-gray-500 uppercase font-mono truncate">{s.headline}</p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight size={14} className="text-blue-600" />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => handleAction('search', { query: searchQuery, filters: 'Location: Mars' })}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all font-mono text-xs uppercase"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4 mx-auto" /> : 'SCAN_GRID'}
                  </button>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Briefcase className="w-3 h-3"/> Job Search</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-slate-900"
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

              {activeTab === 'vault' && (
                <div className="space-y-4">
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-3xl flex flex-col items-center gap-3 text-center">
                    <LayoutDashboard className="text-blue-600 w-10 h-10" />
                    <h4 className="font-bold text-slate-900 uppercase tracking-tighter">Neural_Vault_Access</h4>
                    <p className="text-[10px] text-gray-400 leading-tight italic">Inspect your saved assets, synthesized identity, and career nodes across the grid.</p>
                  </div>
                  <button 
                    onClick={() => {
                        setResult(vaultData);
                    }}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all font-mono text-[10px] uppercase shadow-lg shadow-blue-500/20"
                  >
                    FETCH_VAULT_STREAM
                  </button>
                </div>
              )}

              {activeTab === 'recruit' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 ml-1">Title</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none text-slate-900"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Lead Dev"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 ml-1">Company</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none text-slate-900"
                        value={jobCompany}
                        onChange={(e) => setJobCompany(e.target.value)}
                        placeholder="e.g. Wipro"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 ml-1">Location</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none text-slate-900"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        placeholder="Remote / Bangalore"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 ml-1">Salary</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none text-slate-900"
                        value={jobSalary}
                        onChange={(e) => setJobSalary(e.target.value)}
                        placeholder="e.g. $100k - $150k"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-400 ml-1">Role Description</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-24 resize-none text-slate-900"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Briefly describe the responsibilities..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handleGenerateSyntheticJob}
                      className="py-4 bg-slate-50 border border-slate-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all font-mono text-[10px] uppercase flex items-center justify-center gap-2"
                      disabled={loading || !jobTitle}
                    >
                      <Sparkles size={14} /> AI_SYNTHESIZE
                    </button>
                    <button 
                      onClick={handleJobReview}
                      className="py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all font-mono text-[10px] uppercase shadow-lg shadow-blue-500/20"
                      disabled={loading || !jobTitle || !jobCompany}
                    >
                      {loading ? <Activity className="animate-spin w-4 h-4 mx-auto" /> : 'STAGE_JOB_NODE'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'geo' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><MapPin size={12}/> Physical Grid Location</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all text-slate-900"
                      placeholder="e.g. Silicon Valley, Paris, Hive Hub 7"
                      value={geoLoc}
                      onChange={(e) => setGeoLoc(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('geo/sync', { location: geoLoc })}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all font-mono text-[10px] uppercase tracking-tighter"
                    disabled={loading || !geoLoc}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4 mx-auto" /> : 'INITIALIZE_GEOSYNC'}
                  </button>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Zap className="text-yellow-600 w-3 h-3"/> Blog Intelligence Topic</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-yellow-600 outline-none text-slate-900"
                      placeholder="e.g. The Future of Neural Ethics"
                      value={contentTopic}
                      onChange={(e) => setContentTopic(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Memory Depth</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['short', 'medium', 'long'].map((l) => (
                        <button
                          key={l}
                          onClick={() => setContentLength(l)}
                          className={`py-2 rounded-lg text-[9px] font-mono border transition-all uppercase ${contentLength === l ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700' : 'bg-slate-50 border-slate-200 text-gray-500 hover:border-blue-300'}`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleAction('content', { content_type: 'blog', topic: contentTopic, length: contentLength })}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-black py-4 rounded-xl hover:brightness-110 transition-all font-mono text-[10px] uppercase tracking-widest shadow-lg shadow-yellow-500/20"
                    disabled={loading || !contentTopic}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4 mx-auto" /> : 'SYNTHESIZE_LONG_FORM_INTEL'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-200 min-h-[600px] flex flex-col bg-white shadow-sm">
            <div className="flex items-center justify-between mb-8 text-[9px] font-mono text-gray-400 tracking-[0.4em] uppercase">
              <h2 className="flex items-center gap-2"><Share2 className="text-blue-500 w-3 h-3" /> Output_Stream</h2>
              <span>Buffer: 100%</span>
            </div>
            
            <div className="flex-grow">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center opacity-40 space-y-6">
                  <Sparkles size={80} className="animate-spin-slow text-blue-600" />
                  <p className="font-mono text-xs tracking-widest uppercase text-slate-700">System_Idling_Wait_For_Input</p>
                </div>
              )}

              {loading && (
                <div className="space-y-8 animate-pulse">
                  <div className="h-10 bg-slate-100 rounded-2xl w-1/2"></div>
                  <div className="space-y-4">
                    <div className="h-40 bg-slate-100 rounded-[2rem]"></div>
                    <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                    <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {result && (
                  <motion.div 
                    key={loading ? 'loading' : 'done'}
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="animate-in fade-in zoom-in duration-500 text-slate-900"
                  >
                    {renderResult()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedVaultItem && (
          <Modal 
            type={selectedVaultItem.type} 
            item={selectedVaultItem.data} 
            onClose={() => setSelectedVaultItem(null)} 
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 p-3 flex justify-center gap-8 text-[8px] font-mono text-gray-500 tracking-widest uppercase items-center shadow-lg">
        <span>© 2026 Neural_Link_Systems</span>
        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
        <span>Secure_Encryption_AES_256</span>
        <span className="w-1 h-1 bg-green-500 rounded-full animate-ping"></span>
        <span>Realtime_Feed</span>
      </div>
    </div>
  );
}

export default App;
