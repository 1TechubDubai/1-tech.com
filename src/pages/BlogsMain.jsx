import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ArrowRight, Settings, SlidersHorizontal, Clock, Loader2 } from 'lucide-react';

// --- SUBTLE BACKGROUND (Matching New Design Language) ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#f8fafc] pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}
    ></div>
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[120px] animate-pulse mix-blend-multiply"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
  </div>
);

// Adjusted categories to match your Admin Panel dropdown options
const CATEGORIES = [
  "ALL", 
  "GENERAL", 
  "ARTIFICIAL INTELLIGENCE", 
  "GENERATIVE AI", 
  "SOFTWARE ARCHITECTURE", 
  "AUTONOMOUS SYSTEMS",
  "DATA & ANALYTICS"
];

const BlogsMain = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' | 'oldest'

  // Fetch data from Firebase
  useEffect(() => {
    // Only fetch active (published) posts
    const q = query(collection(db, "blog_posts"), where("status", "==", "active"));
    
    const unsub = onSnapshot(q, (snap) => {
      const fetchedPosts = snap.docs.map(doc => {
        const data = doc.data();
        
        // Format the Firebase Timestamp into a structured date (YYYY.MM.DD)
        let dateStr = "PENDING";
        if (data.createdAt) {
          const d = data.createdAt.toDate();
          dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
        }

        return {
          id: doc.id,
          ...data,
          dateStr,
          // Fallback image if none was uploaded
          featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
        };
      });

      setPosts(fetchedPosts);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Filter and Sort Logic
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by Category (Case insensitive matching)
    if (activeCategory !== "ALL") {
      result = result.filter(post => post.category?.toUpperCase() === activeCategory);
    }

    // Filter by Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        post => 
          post.title?.toLowerCase().includes(lowerSearch) || 
          post.excerpt?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort by Date using Firebase Timestamps
    result.sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [posts, searchTerm, activeCategory, sortOrder]);

  // The first post becomes featured, the rest go to the grid
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.slice(1);

  return (
    <div 
      className="min-h-screen flex flex-col relative bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      
      <AmbientBackground />
      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-20 px-6 max-w-[1400px] mx-auto w-full">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
                Latest Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
              1TecHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Transmissions</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-lg font-medium leading-relaxed text-left">
              Explore our collection of articles and expert blogs covering Artificial Intelligence, autonomous workflows, and the future of enterprise.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative w-full sm:w-72 shadow-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>
            
            {/* Sort Toggle */}
            <button 
              onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
              className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-bold tracking-wide text-slate-600 shadow-sm"
            >
              <Clock size={16} />
              {sortOrder.toUpperCase()}
            </button>
          </div>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="w-full h-64 border border-slate-200 rounded-3xl bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center text-blue-600 gap-4 shadow-sm">
            <Loader2 size={40} className="animate-spin text-blue-600" />
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">Accessing Data...</p>
          </div>
        )}

        {/* ── FEATURED ARTICLE (First Post) ── */}
        {!loading && featuredPost && (
          <div 
            onClick={() => navigate(`/blogs/${featuredPost.id}`)}
            className="mb-20 group cursor-pointer border border-white rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-lg hover:border-blue-200 transition-all duration-500 flex flex-col lg:flex-row shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Image Half */}
            <div className="lg:w-1/2 h-64 lg:h-[450px] relative overflow-hidden bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-100">
              <img 
                src={featuredPost.featuredImage} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-700 uppercase font-mono bg-white/90 px-4 py-2 rounded-lg backdrop-blur-md border border-slate-200 shadow-lg">
                <Clock size={12} className="text-blue-600" />
                {featuredPost.dateStr}
              </div>
            </div>

            {/* Content Half */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative bg-white/50">
              <div className="inline-block px-3 py-1 border border-blue-200 bg-blue-50 rounded-md text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-6 w-max font-mono shadow-sm">
                Featured Intel
              </div>
              <h2 className="text-left text-3xl lg:text-4xl font-extrabold leading-[1.2] tracking-tight mb-6 group-hover:text-blue-600 transition-colors line-clamp-3 text-slate-900">
                {featuredPost.title}
              </h2>
              <p className="text-slate-600 text-base lg:text-lg mb-10 leading-relaxed font-medium line-clamp-3">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-blue-600 font-bold text-sm tracking-widest uppercase w-max group-hover:text-blue-800 transition-colors mt-auto">
                Read Transmission <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORY FILTER NAV ── */}
        {!loading && (
          <div className="border-b border-slate-200 mb-10 overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 min-w-max pb-px">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`pb-4 text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase transition-all relative ${
                    activeCategory === category 
                      ? "text-blue-600" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {category}
                  {/* Active Indicator Line */}
                  {activeCategory === category && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── ARTICLES GRID (Remaining Posts) ── */}
        {!loading && gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map(post => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/blogs/${post.id}`)}
                className="group cursor-pointer border border-white rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-md hover:border-blue-200 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1.5"
              >
                
                {/* Card Image */}
                <div className="h-48 sm:h-60 w-full relative overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 font-mono text-[10px] font-bold text-slate-700 tracking-widest shadow-sm">
                    {post.dateStr}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-grow bg-white/40">
                  <div className="flex justify-between items-center mb-5">
                    <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded text-[9px] font-bold tracking-[0.15em] text-blue-700 font-mono uppercase">
                      {post.category || "Article"}
                    </span>
                    <Settings size={14} className="text-slate-400 group-hover:text-blue-500 group-hover:rotate-90 transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-xl font-extrabold mb-4 leading-[1.3] text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium mb-8 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs tracking-[0.15em] uppercase w-max group-hover:text-blue-800 transition-colors mt-auto">
                    Read Transmission <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && filteredPosts.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center border border-dashed border-slate-300 rounded-[2rem] bg-white/50 backdrop-blur-sm shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <SlidersHorizontal size={28} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">No transmissions found.</h3>
            <p className="text-slate-500 font-medium max-w-md">Adjust your category filters or search parameters to locate specific intelligence data.</p>
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory("ALL");}}
              className="mt-8 px-6 py-3 bg-white border border-slate-200 text-blue-600 text-xs font-bold tracking-widest uppercase hover:border-blue-300 hover:bg-blue-50 rounded-xl transition-all shadow-sm"
            >
              Reset Protocol
            </button>
          </div>
        )}

      </main>

      <Footer className="relative z-10" />

      {/* Helper CSS to hide scrollbar for the category nav */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BlogsMain;