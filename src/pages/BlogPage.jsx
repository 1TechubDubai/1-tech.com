import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

// --- SUBTLE BACKGROUND ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#f8fafc] pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}
    ></div>
    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[120px] animate-pulse mix-blend-multiply"></div>
  </div>
);

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.state?.fromHome) {
      navigate("/", { state: { scrollTo: 'transmissions-teaser' } }) 
    } else {
      navigate(-1);
    }
  };
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blog_posts", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          let dateStr = "PENDING";
          if (data.createdAt) {
            const d = data.createdAt.toDate();
            dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
          }

          const wordCount = data.content ? data.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
          const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));

          setPost({ 
            id: docSnap.id, 
            ...data, 
            dateStr,
            readTime: `${readTimeMins} min read`
          });
        } else {
          console.log("No such document!");
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <div 
      className="min-h-screen flex flex-col relative bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >

      <AmbientBackground />
      <Navbar />

      <main className="flex-grow relative z-10 pt-24 sm:pt-32 pb-20 px-6 max-w-[900px] mx-auto w-full min-h-[80vh]">
        
        {/* ── TOP NAV / BREADCRUMBS ── */}
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
          <button 
            onClick={handleBackClick} 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Transmissions
          </button>
          
          <div className="relative flex items-center gap-4">
            <button 
              onClick={handleCopyUrl}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all"
              title="Share Transmission"
            >
              <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Popup */}
            <div className={`absolute top-12 right-0 bg-slate-900 text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap pointer-events-none transition-all duration-300 ${showCopied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              Link Copied
            </div>
          </div>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 text-blue-600 gap-4">
            <Loader2 size={48} className="animate-spin" />
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">Accessing Data...</p>
          </div>
        )}

        {/* ── NOT FOUND STATE ── */}
        {!loading && !post && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500 gap-4">
            <AlertCircle size={48} className="text-red-500 mb-2" />
            <h2 className="text-2xl font-extrabold text-slate-900">Transmission Not Found</h2>
            <p className="text-sm font-medium">The requested data fragment has been moved or deleted.</p>
          </div>
        )}

        {/* ── LOADED ARTICLE STATE ── */}
        {!loading && post && (
          <>
            <header className="mb-12 text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-blue-700 font-mono border border-blue-200 px-3 py-1 rounded bg-blue-50 uppercase">
                  {post.category || "Article"}
                </span>
                <span className="text-slate-500 font-medium text-xs flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                  <Clock size={12} className="text-blue-500" /> {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 pt-2 tracking-tight leading-[1.1]">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  {post.authorAvatar ? (
                    <img src={post.authorAvatar} alt='System Admin' className="w-12 h-12 rounded-full border border-slate-200 bg-white object-cover shadow-sm" />
                  ) : (
                    <div className="w-12 h-12 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center text-lg font-extrabold text-blue-600 shadow-sm">
                      {"1T"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-900">1TecHub Editorial</p>
                    <p className="text-xs text-slate-500 font-medium">Technology Advisory</p>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">{post.dateStr}</span>
                </div>
              </div>
            </header>

            {/* ── HERO IMAGE ── */}
            {post.featuredImage && (
              <div className="w-full aspect-video md:aspect-[21/9] bg-slate-100 rounded-[2rem] border border-slate-200 overflow-hidden mb-16 relative shadow-sm">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* ── ARTICLE BODY (TIPTAP HTML RENDER) ── */}
            <article 
              className="article-content text-left font-sans leading-relaxed text-slate-700 text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── FOOTER / NEXT ACTIONS ── */}
            <div className="mt-24 pt-10 border-t border-slate-200 flex justify-between items-center">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">End of Article</p>
              <button 
                onClick={() => navigate('/blogs')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-sm font-bold text-blue-600 hover:text-white hover:bg-blue-600 rounded-full shadow-sm hover:shadow-md transition-all uppercase tracking-wider group"
              >
                All Articles <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </>
        )}
      </main>

      <Footer className="relative z-10" />

      {/* ── SCOPED EDITORIAL STYLING (Light Theme) ── */}
      <style>{`
        .article-content {
          text-align: left !important;
        }

        /* Typography Scale & Spacing */
        .article-content p { 
          margin-bottom: 1.75rem; 
          color: #334155; /* slate-700 */
          line-height: 1.8;
          font-weight: 500;
        }

        .article-content li p {
          display: inline;
          margin-bottom: 0;
        }
        
        .article-content h1, 
        .article-content h2, 
        .article-content h3 { 
          color: #0f172a; /* slate-900 */
          font-weight: 800; 
          font-family: 'Syne', sans-serif;
          margin-top: 3.5rem; 
          margin-bottom: 1.25rem; 
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-align: left;
        }
        
        .article-content h2 { font-size: 2.25rem; }
        .article-content h3 { font-size: 1.5rem; }
        
        /* Interactive Elements */
        .article-content a { 
          color: #2563eb; /* blue-600 */
          text-decoration: none; 
          border-bottom: 2px solid transparent;
          font-weight: 700;
          transition: all 0.2s;
        }
        .article-content a:hover {
          border-bottom-color: #2563eb;
        }

        /* Bold & Italics */
        .article-content strong { color: #0f172a; font-weight: 800; }
        .article-content em { color: #475569; font-style: italic; }

        /* Blockquotes - Corporate Styled */
        .article-content blockquote {
          margin: 3rem 0;
          padding: 2rem 2rem 2rem 2.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #2563eb;
          border-radius: 0 1rem 1rem 0;
          font-size: 1.25rem;
          font-style: italic;
          color: #1e293b;
          font-weight: 600;
          line-height: 1.6;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          position: relative;
        }
        
        /* Quotes Icon inside blockquote */
        .article-content blockquote::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 10px;
          font-size: 4rem;
          color: rgba(37, 99, 235, 0.15); /* blue-600 with low opacity */
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }

        /* Lists */
        .article-content ul, 
        .article-content ol { 
          margin-top: 1rem;
          margin-bottom: 2.5rem; 
          padding-left: 0; 
          color: #334155;
        }
        
        .article-content ul li, 
        .article-content ol li { 
          margin-bottom: 1rem; 
          padding-left: 2rem;
          position: relative;
          line-height: 1.7;
          font-weight: 500;
        }
        
        .article-content ul { list-style-type: none; }
        
        /* Custom Bullet point */
        .article-content ul li::before {
          content: '';
          position: absolute;
          left: 0.5rem;
          top: 0.6rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.2);
        }
        
        /* Image formatting inside article */
        .article-content img {
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          margin: 3rem 0;
          width: 100%;
          height: auto;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default BlogPage;