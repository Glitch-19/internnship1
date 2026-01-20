import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Share2, Search, Zap, Terminal, Activity, Globe, Info, Cpu, Sparkles, Camera, Upload, Briefcase, Building2, MapPin, DollarSign, Bookmark, Heart, LayoutDashboard, LogIn, Shield, ExternalLink, ChevronRight, Settings, Map } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-[#0a0b14] border border-white/20 p-8 rounded-[2.5rem] max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl neon-border"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
            <Zap className="w-6 h-6 rotate-45" />
          </button>
          
          {type === 'job' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                   <h2 className="text-3xl font-black text-white leading-tight underline decoration-blue-500 decoration-4 underline-offset-8">{item.title}</h2>
                   <p className="text-futuristic-cyan font-bold flex items-center gap-2 mt-4"><Building2 size={18}/> {item.company}</p>
                </div>
                <div className="text-right">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full text-xs font-mono block mb-1">{item.salary_range}</span>
                  <span className="text-[9px] text-gray-600 font-mono uppercase">Node_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Deployment_Site</p>
                  <p className="text-white font-bold">{item.location}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2 justify-end"><User size={12}/> Origin_Entity</p>
                  <p className="text-blue-400 font-bold">{item.posted_by}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Mission_Parameters
                </h4>
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 leading-relaxed text-blue-50/80 italic font-sans text-lg">
                  "{item.description}"
                </div>
              </div>

              <button onClick={() => alert('Neural sync successful. Application deployed.')} className="w-full py-5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-black rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3">
                <Zap size={20} /> INITIATE_NEURAL_UPLOAD
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-8 pb-8 border-b border-white/10">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-futuristic-cyan to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <img src={item.photo_url} className="relative w-32 h-32 rounded-[2.2rem] object-cover border-2 border-white/10 shadow-2xl" />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-4 border-[#0a0b14]">
                    <Activity size={16} className="text-[#0a0b14] animate-pulse" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-white tracking-tighter">{item.name}</h2>
                  <p className="text-futuristic-cyan font-mono text-sm uppercase tracking-[0.3em] mt-2 font-black">{item.headline}</p>
                  <div className="flex gap-4 mt-4">
                    <span className="text-[9px] bg-white/5 px-3 py-1 rounded-full text-gray-400 font-mono uppercase border border-white/5 flex items-center gap-2">
                      <Globe size={10} /> Grid_Alpha
                    </span>
                    <span className="text-[9px] bg-white/5 px-3 py-1 rounded-full text-gray-400 font-mono uppercase border border-white/5 flex items-center gap-2">
                      <Cpu size={10} /> Verified_Core
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] flex items-center gap-2">
                      <Sparkles size={12} className="text-futuristic-cyan" /> Core_Synthesis
                    </h4>
                    <p className="text-blue-50/70 text-sm leading-relaxed font-sans">{item.summary}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] flex items-center gap-2">
                      <Zap size={12} className="text-yellow-500" /> Neural_Connectors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(item.skills || "AI, Neural Networks, Grid Architecture").split(',').map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-futuristic-cyan/10 text-futuristic-cyan text-[10px] font-bold rounded-lg border border-futuristic-cyan/20 uppercase tracking-tight">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 group hover:border-futuristic-cyan/30 transition-all">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Briefcase size={12} /> XP_Registry
                    </h4>
                    <p className="text-xs text-blue-100/60 font-mono whitespace-pre-wrap leading-relaxed">{item.experience}</p>
                  </div>

                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 group hover:border-blue-500/30 transition-all">
                    <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] mb-4 flex items-center gap-2">
                      <Building2 size={12} /> Edu_Sector
                    </h4>
                    <p className="text-xs text-blue-100/60 font-mono whitespace-pre-wrap leading-relaxed">{item.education}</p>
                  </div>
                </div>
              </div>

              {item.markdown && (
                <div className="pt-6 border-t border-white/5">
                   <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.4em] mb-4">Neural_Brief_MD</h4>
                   <div className="prose prose-invert prose-blue max-w-none text-blue-50/80 bg-white/[0.02] p-6 rounded-[2rem]">
                      <ReactMarkdown>{item.markdown}</ReactMarkdown>
                   </div>
                </div>
              )}

              <button onClick={() => alert('Broadcasting neural signal to target entity...')} className="w-full py-5 bg-white text-black font-black rounded-3xl hover:bg-futuristic-cyan transition-all uppercase tracking-tighter shadow-2xl flex items-center justify-center gap-3 active:scale-95">
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
      const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const res = await axios.post(`${API_BASE}/${endpoint}`, data, config);
      setResult(res.data);
      addActivity('ACTION', `Interface command executed: ${endpoint}`);
    } catch (err) {
      console.error(err);
      setResult({ error: 'NEURAL_LINK Connection Failure: Check if backend is active.' });
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

  const confirmProfileUpload = () => {
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('headline', headline);
    formData.append('summary', summary);
    formData.append('experience', experience);
    formData.append('education', education);
    formData.append('skills', skills);
    formData.append('photo', photoFile);
    handleAction('profile', formData, true);
    setShowReview(false);
  };

  const handleJobReview = () => {
    if (!jobTitle || !jobCompany || !jobLocation || !jobDescription || !jobSalary) {
      alert('Please fill in all mission parameters for the job node.');
      return;
    }
    setShowJobReview(true);
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
    setShowJobReview(false);
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
             <h2 className="text-3xl font-black text-white tracking-tighter uppercase">NEURAL_DASHBOARD</h2>
             <span className="text-[10px] font-mono text-futuristic-cyan/50 tracking-[0.2em] border border-futuristic-cyan/20 px-3 py-1 rounded-full">{currentUser?.toUpperCase()} // 0x7F22A</span>
           </div>

           {result.own_profile && (
            <div className="p-8 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Shield className="w-12 h-12 text-blue-400" />
              </div>
              <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-6 tracking-[0.4em] font-bold">Verified_Identity_Matrix</h4>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                  <img src={result.own_profile.photo_url} className="w-32 h-32 rounded-3xl object-cover shadow-[0_0_40px_rgba(0,255,249,0.2)] border-2 border-futuristic-cyan" />
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white tracking-tight">{result.own_profile.name}</h3>
                    <p className="text-futuristic-cyan font-bold uppercase tracking-widest text-sm">{result.own_profile.headline}</p>
                    <div className="prose prose-invert prose-xs opacity-70 leading-relaxed max-w-lg">
                      <ReactMarkdown>{result.own_profile.markdown.substring(0, 200) + '...'}</ReactMarkdown>
                    </div>
                  </div>
              </div>
            </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Briefcase size={14} className="text-blue-400" /> Saved Nodes</h4>
                  <span className="text-[9px] font-mono text-gray-600">COUNT: {result.saved_jobs.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {result.saved_jobs.map((job, i) => (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      key={i} 
                      onClick={() => setSelectedVaultItem({ data: job, type: 'job' })}
                      className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/30 cursor-pointer transition-all flex justify-between items-center group shadow-sm hover:shadow-blue-900/10"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{job.title}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-mono">{job.company}</p>
                      </div>
                      <ExternalLink size={12} className="text-gray-700 group-hover:text-blue-400" />
                    </motion.div>
                  ))}
                  {result.saved_jobs.length === 0 && <div className="py-8 text-center bg-white/[0.02] rounded-2xl border border-dashed border-white/5 text-[10px] text-gray-700 uppercase font-mono">No active job nodes</div>}
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><User size={14} className="text-futuristic-cyan" /> Synced Entities</h4>
                    <span className="text-[9px] font-mono text-gray-600">COUNT: {result.saved_profiles.length}</span>
                 </div>
                 <div className="grid grid-cols-1 gap-3">
                    {result.saved_profiles.map((profile, i) => (
                      <motion.div 
                        whileHover={{ x: 5 }}
                        key={i} 
                        onClick={() => setSelectedVaultItem({ data: profile, type: 'profile' })}
                        className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-4 hover:border-futuristic-cyan/30 cursor-pointer transition-all group shadow-sm hover:shadow-cyan-900/10"
                      >
                        <img src={profile.photo_url} className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white group-hover:text-futuristic-cyan transition-colors uppercase tracking-tight">{profile.name}</p>
                          <p className="text-[9px] text-gray-500 uppercase font-mono truncate max-w-[150px]">{profile.headline || 'Neural Entity'}</p>
                        </div>
                        <ChevronRight size={14} className="text-gray-700 group-hover:text-futuristic-cyan" />
                      </motion.div>
                    ))}
                    {result.saved_profiles.length === 0 && <div className="py-8 text-center bg-white/[0.02] rounded-2xl border border-dashed border-white/5 text-[10px] text-gray-700 uppercase font-mono">No peer nodes synced</div>}
                 </div>
              </div>
           </div>

           {/* Blogs Section */}
           {result.saved_content && result.saved_content.length > 0 && (
             <div className="pt-8 space-y-6">
               <div className="flex items-center justify-between border-b border-white/5 pb-2">
                 <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Zap size={14} className="text-yellow-500" /> Stored_Intelligence (Blogs)</h4>
                 <span className="text-[9px] font-mono text-gray-600">COUNT: {result.saved_content.length}</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {result.saved_content.map((blog, i) => (
                   <motion.div 
                     whileHover={{ scale: 1.01 }}
                     key={i} 
                     onClick={() => setResult({ content: blog.content })}
                     className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-yellow-500/30 cursor-pointer transition-all group"
                   >
                     <div className="flex justify-between items-start mb-2">
                       <h5 className="text-sm font-black text-white group-hover:text-yellow-500 transition-colors uppercase tracking-tight">{blog.name}</h5>
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
             <div className="flex items-center justify-between border-b border-white/5 pb-2">
               <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Activity size={14} className="text-green-500" /> Neural_Log</h4>
             </div>
             <div className="space-y-3">
                {activities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl text-[10px] font-mono group">
                    <div className="flex items-center gap-4">
                      <span className={`w-1.5 h-1.5 rounded-full ${act.type === 'AUTH' ? 'bg-blue-400' : act.type === 'VAULT' ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
                      <span className="text-gray-500 w-16">[{act.type}]</span>
                      <span className="text-blue-100/80 group-hover:text-white transition-colors uppercase tracking-tighter">{act.text}</span>
                    </div>
                    <span className="text-gray-700">{act.time}</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      );
    }

    if (result.type === 'geo') {
      const zoom = 13;
      const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${result.lon-0.01}%2C${result.lat-0.01}%2C${result.lon+0.01}%2C${result.lat+0.01}&layer=mapnik&marker=${result.lat}%2C${result.lon}`;
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
              <Map className="text-futuristic-cyan" /> Geo_Sync_Stream
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Lat: {result.lat.toFixed(4)} // Lon: {result.lon.toFixed(4)}</span>
          </div>
          
          <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight="0" 
               marginWidth="0" 
               src={osmUrl}
               className="grayscale hover:grayscale-0 transition-all duration-1000"
             ></iframe>
             <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-[9px] font-mono text-futuristic-cyan uppercase tracking-widest pointer-events-none">
                Live_Grid_Coord_Verified
             </div>
          </div>

          <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 space-y-4">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-futuristic-cyan/20 rounded-lg">
                 <Info size={16} className="text-futuristic-cyan" />
               </div>
               <h4 className="font-bold text-white uppercase tracking-tight">Intelligence_Report: {result.location}</h4>
             </div>
             <p className="text-sm text-blue-100/70 leading-relaxed italic">
               "{result.description}"
             </p>
          </div>
        </div>
      );
    }

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
    if (typeof result.content === 'string') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
              <Zap className="text-futuristic-cyan" /> Generated_Content
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => saveToVault({ name: contentTopic, content: result.content }, 'content')}
                className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold rounded-xl hover:bg-yellow-500/20 transition-all flex items-center gap-2"
              >
                <Bookmark size={12} /> SAVE_TO_VAULT
              </button>
              <button 
                onClick={() => handleAction('content', { content_type: 'blog', topic: contentTopic, length: contentLength })}
                className="px-4 py-2 bg-white/5 border border-white/10 text-white text-[10px] font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Activity size={12} className={loading ? 'animate-spin' : ''} /> REGENERATE
              </button>
            </div>
          </div>
          <div className="prose prose-invert max-w-none text-blue-100 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
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
                  <div className="flex gap-2">
                    <button 
                      onClick={() => saveToVault(job, 'job')}
                      className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] font-bold rounded-lg hover:bg-yellow-500/20 transition-all uppercase flex items-center gap-1"
                    >
                      <Bookmark size={10} /> SAVE_JOB
                    </button>
                    <button 
                      onClick={() => alert(`Direct neural application sent to ${job.company}!`)}
                      className="px-6 py-2 bg-white text-black text-[10px] font-bold rounded-xl hover:bg-blue-400 hover:text-white transition-all uppercase tracking-tighter"
                    >
                      SYNC_APPLICATION
                    </button>
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono uppercase">Posted_By: {job.posted_by}</span>
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
            <div 
              key={i} 
              onClick={() => setSelectedVaultItem({ data: item, type: 'profile' })}
              className="group p-6 border border-white/10 bg-white/5 rounded-3xl hover:border-futuristic-cyan/50 hover:bg-white/10 transition-all cursor-pointer shadow-xl relative"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={14} className="text-futuristic-cyan" />
              </div>
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
                      saveToVault(item, 'profile');
                    }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono hover:bg-white/10 transition-all text-yellow-500 flex items-center gap-1"
                  >
                    <Bookmark size={10}/> SAVE_NODE
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
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-6 text-[10px] font-mono text-gray-500 tracking-widest">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-green-500" /> SYSTEM_ONLINE</span>
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> GRID_ALPHA_STABLE</span>
          </div>
          {!isLoggedOut && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-[9px] font-mono hover:bg-red-500/20 transition-all uppercase tracking-tighter"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05060f]/95 backdrop-blur-2xl"
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="glass-morphism p-12 rounded-[3rem] border border-white/10 max-w-md w-full text-center space-y-8 shadow-2xl"
            >
               <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                 <Cpu className="text-black w-10 h-10 animate-pulse" />
               </div>
               <div className="space-y-2">
                 <h2 className="text-3xl font-black tracking-tighter text-white">INITIALIZE_LINK</h2>
                 <p className="text-xs text-gray-500 font-mono uppercase tracking-[0.2em]">Enter your neural identity to access the grid.</p>
               </div>
               <form onSubmit={handleLogin} className="space-y-4">
                 <input 
                   autoFocus
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-center text-lg font-bold tracking-widest text-white focus:border-futuristic-cyan outline-none transition-all placeholder:text-gray-700"
                   placeholder="IDENTITY_KEY"
                   value={loginInput}
                   onChange={(e) => setLoginInput(e.target.value)}
                 />
                 <button 
                    type="submit"
                    className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-futuristic-cyan transition-all shadow-xl uppercase tracking-tighter"
                 >
                   SYNC_NEURAL_CORE
                 </button>
               </form>
               <div className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">
                 SECURE_CONNECTION_STABLE // NO_UNAUTHORIZED_ACCESS
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* User Profile Summary Card */}
          <div className="glass-morphism p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-futuristic-cyan/10 rounded-full blur-2xl group-hover:bg-futuristic-cyan/20 transition-all" />
            <div className="flex flex-col items-center text-center space-y-3 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black p-0.5 border border-white/10 group-hover:border-futuristic-cyan/50 transition-all">
                <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center">
                  <User className="text-futuristic-cyan w-8 h-8" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter text-white">
                  {currentUser || "AUTH_PENDING"}
                </h3>
                <p className="text-[9px] font-mono text-futuristic-cyan uppercase tracking-widest flex items-center justify-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-futuristic-cyan animate-pulse" />
                  Neural Rank: Alpha
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full pt-2">
                <div className="bg-white/5 rounded-xl p-2 border border-white/5 text-center">
                  <p className="text-[8px] font-mono text-gray-500 uppercase">Nodes</p>
                  <p className="text-sm font-bold text-white">{vaultData?.saved_profiles?.length || 0}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/5 text-center">
                  <p className="text-[8px] font-mono text-gray-500 uppercase">Jobs</p>
                  <p className="text-sm font-bold text-white">{vaultData?.saved_jobs?.length || 0}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/5 text-center col-span-2">
                  <p className="text-[8px] font-mono text-gray-500 uppercase">Stored_Intel (Blogs)</p>
                  <p className="text-sm font-bold text-white">{vaultData?.saved_content?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-4 rounded-3xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-[9px] font-mono text-gray-400 mb-4 px-2 flex items-center gap-2 tracking-[0.2em] uppercase font-bold"><Terminal className="w-3 h-3 text-futuristic-cyan"/> Terminal_Commands</h3>
            <div className="flex flex-col gap-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                    activeTab === tab.id ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.1)]' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  <div className={`${activeTab === tab.id ? 'text-black' : 'text-futuristic-cyan group-hover:scale-110 transition-transform'}`}>
                    {tab.icon}
                  </div>
                  <span className="font-black tracking-widest text-[10px] uppercase">{tab.label}</span>
                  {activeTab === tab.id && <motion.div layoutId="sidebar-dot" className="ml-auto w-1 h-1 rounded-full bg-black" />}
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
              {/* Identity Module */}
              <div className="p-4 bg-futuristic-cyan/5 border border-futuristic-cyan/20 rounded-2xl mb-2 items-center justify-between flex gap-3">
                <div className="flex-1">
                  <p className="text-[8px] font-mono text-futuristic-cyan uppercase tracking-widest mb-1">Neural_Identity</p>
                  <input 
                    className="bg-transparent border-none text-white font-bold text-sm outline-none placeholder:text-gray-600 w-full"
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
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Sparkles className="w-3 h-3"/> Headline</label>
                    <input 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-futuristic-cyan outline-none transition-all"
                      placeholder="e.g. Neural Architect | AI Lead"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Info className="w-3 h-3"/> Professional Summary</label>
                    <textarea 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-futuristic-cyan outline-none h-20 resize-none transition-all"
                      placeholder="Describe your core mission..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Briefcase className="w-3 h-3"/> Experience</label>
                      <textarea 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-futuristic-cyan outline-none h-32 resize-none transition-all"
                        placeholder="Companies, roles, years..."
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Building2 className="w-3 h-3"/> Education</label>
                      <textarea 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-futuristic-cyan outline-none h-32 resize-none transition-all"
                        placeholder="Degrees, certifications..."
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Zap className="w-3 h-3"/> Skills & Tech Stack</label>
                    <input 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-futuristic-cyan outline-none transition-all"
                      placeholder="e.g. Python, React, Neural Networks"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleProfileSynth}
                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:brightness-125 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all font-mono text-xs uppercase"
                    disabled={loading || !userName || !photoFile}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'review profile'}
                  </button>
                </div>
              )}

              {activeTab === 'profile' && showReview && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center gap-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Zap className="text-yellow-500 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase font-mono">Verification_Protocol_Active</h4>
                      <p className="text-[9px] text-yellow-500/70 uppercase tracking-tighter">Review neural data before committing to the grid.</p>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center gap-4">
                      <img src={photoPreview} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-mono">Entity_Name</p>
                        <p className="text-sm font-bold text-white leading-none mt-1">{userName}</p>
                        <p className="text-[11px] text-futuristic-cyan font-medium mt-1 uppercase tracking-tight">{headline}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl space-y-3">
                       <div>
                          <p className="text-[9px] text-gray-500 uppercase font-mono mb-1">Summary</p>
                          <p className="text-[11px] text-white italic opacity-80 leading-relaxed font-sans">{summary}</p>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[9px] text-gray-500 uppercase font-mono mb-1">Experience</p>
                            <p className="text-[10px] text-blue-100/70 whitespace-pre-wrap">{experience}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-500 uppercase font-mono mb-1">Education</p>
                            <p className="text-[10px] text-blue-100/70 whitespace-pre-wrap">{education}</p>
                          </div>
                       </div>
                       <div>
                          <p className="text-[9px] text-gray-500 uppercase font-mono mb-1">Integrated_Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {skills.split(',').map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-futuristic-cyan/20 text-futuristic-cyan text-[8px] font-bold rounded-md border border-futuristic-cyan/30 uppercase tracking-tighter">{s.trim()}</span>
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
                      className="flex-1 py-4 bg-futuristic-cyan text-black font-bold rounded-2xl hover:brightness-110 shadow-[0_0_20px_rgba(0,255,249,0.3)] transition-all font-mono text-[10px] uppercase"
                    >
                      COMMIT_TO_GRID
                    </button>
                  </div>
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
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><Search className="w-3 h-3"/> GRID_SELECTOR</label>
                    <input 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-futuristic-cyan transition-all"
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
                        className="overflow-hidden bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5"
                      >
                        {suggestions.map((s, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              handleAction('search', { query: s.name, filters: '' });
                              setSuggestions([]);
                              setSearchQuery(s.name);
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-white/10 cursor-pointer transition-colors group"
                          >
                            <img src={s.photo_url} className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:border-futuristic-cyan transition-all" />
                            <div className="flex-1">
                              <p className="text-sm text-white font-bold group-hover:text-futuristic-cyan transition-colors">{s.name}</p>
                              <p className="text-[10px] text-gray-500 uppercase font-mono truncate">{s.headline}</p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight size={14} className="text-futuristic-cyan" />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => handleAction('search', { query: searchQuery, filters: 'Location: Mars' })}
                    className="w-full bg-futuristic-cyan text-black font-black py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all font-mono text-xs uppercase"
                    disabled={loading}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4 mx-auto" /> : 'SCAN_GRID'}
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

              {activeTab === 'vault' && (
                <div className="space-y-4">
                  <div className="p-6 bg-blue-600/10 border border-blue-500/30 rounded-3xl flex flex-col items-center gap-3 text-center">
                    <LayoutDashboard className="text-blue-400 w-10 h-10" />
                    <h4 className="font-bold text-white uppercase tracking-tighter">Neural_Vault_Access</h4>
                    <p className="text-[10px] text-gray-500 leading-tight italic">Inspect your saved assets, synthesized identity, and career nodes across the grid.</p>
                  </div>
                  <button 
                    onClick={() => {
                        setResult(vaultData);
                    }}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-futuristic-cyan transition-all font-mono text-[10px] uppercase"
                  >
                    FETCH_VAULT_STREAM
                  </button>
                </div>
              )}

              {activeTab === 'recruit' && !showJobReview && (
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
                    onClick={handleJobReview}
                    className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-4 rounded-xl hover:brightness-125 transition-all font-mono text-xs uppercase"
                    disabled={loading || !jobTitle || !jobCompany}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4" /> : 'STAGE_JOB_NODE'}
                  </button>
                </div>
              )}

              {activeTab === 'recruit' && showJobReview && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Building2 size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase font-mono">Job_Sync_Protocol</h4>
                      <p className="text-[9px] text-blue-400/70 uppercase tracking-tighter">Review mission parameters before deploying to the grid.</p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase font-mono">Position_Registry</p>
                        <h3 className="text-lg font-bold text-white leading-tight">{jobTitle}</h3>
                        <p className="text-futuristic-cyan text-xs font-bold">{jobCompany}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-500 uppercase font-mono">Compensation_Node</p>
                        <p className="text-blue-400 text-xs font-bold">{jobSalary}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[9px] text-gray-500 uppercase font-mono">Deployment_Site</p>
                          <p className="text-xs text-white/80">{jobLocation}</p>
                       </div>
                    </div>

                    <div>
                      <p className="text-[9px] text-gray-500 uppercase font-mono mb-2">Mission_Brief</p>
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-[11px] text-blue-100/70 italic leading-relaxed">
                        "{jobDescription}"
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowJobReview(false)}
                      className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-mono hover:bg-white/10 transition-all uppercase"
                    >
                      ABORT_EDIT
                    </button>
                    <button 
                      onClick={confirmJobDeployment}
                      className="flex-1 py-4 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold rounded-2xl hover:brightness-110 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all font-mono text-[10px] uppercase"
                    >
                      DEPLOY_TO_GRID
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'geo' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-2"><MapPin size={12}/> Physical Grid Location</label>
                    <input 
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-futuristic-cyan transition-all"
                      placeholder="e.g. Silicon Valley, Paris, Hive Hub 7"
                      value={geoLoc}
                      onChange={(e) => setGeoLoc(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleAction('geo/sync', { location: geoLoc })}
                    className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-futuristic-cyan transition-all font-mono text-[10px] uppercase tracking-tighter"
                    disabled={loading || !geoLoc}
                  >
                    {loading ? <Activity className="animate-spin w-4 h-4 mx-auto" /> : 'INITIALIZE_GEOSYNC'}
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

      <AnimatePresence>
        {selectedVaultItem && (
          <Modal 
            type={selectedVaultItem.type} 
            item={selectedVaultItem.data} 
            onClose={() => setSelectedVaultItem(null)} 
          />
        )}
      </AnimatePresence>

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
