import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { SEO } from '../components/SEO';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, loading } = useData();
  const post = getPostBySlug(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muji-white">
        <div className="w-8 h-8 border-2 border-muji-oak border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return <Navigate to="/blog" />;

  return (
    <div className="pt-20 bg-white min-h-screen font-sans">
      <SEO 
        title={post.title}
        description={post.excerpt}
        ogType="article"
      />

      <article className="max-w-5xl mx-auto px-4 py-24">
        <Link to="/blog" className="inline-flex items-center gap-3 text-muji-text-muted font-bold uppercase tracking-[0.2em] text-[10px] mb-16 hover:text-muji-oak transition-all font-mono">
          <ArrowLeft className="w-4 h-4" /> Return to Articles
        </Link>
        
        <header className="mb-20">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muji-oak mb-8 font-mono">
            <span>{post.category}</span>
            <span className="w-1.5 h-1.5 bg-muji-border rounded-full" />
            <span className="text-muji-text-muted flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 8 min reading time</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-muji-text leading-tight mb-12">
            {post.title}
          </h1>
          <div className="flex items-center justify-between py-10 border-y border-muji-border">
             <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em]">
               <div className="w-12 h-12 rounded-full bg-muji-white border border-muji-border overflow-hidden">
                  <img src={`https://picsum.photos/seed/${post.author}/100/100`} alt={post.author} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
               </div>
               <div className="font-mono">
                  <p className="text-muji-text">{post.author}</p>
                  <p className="text-muji-text-muted">IQI Realty REN 46305</p>
               </div>
             </div>
             <div className="flex gap-6">
                <Share2 className="w-5 h-5 text-muji-text-muted cursor-pointer hover:text-muji-oak transition-colors" />
                <Facebook className="w-5 h-5 text-muji-text-muted cursor-pointer hover:text-muji-oak transition-colors" />
                <Linkedin className="w-5 h-5 text-muji-text-muted cursor-pointer hover:text-muji-oak transition-colors" />
             </div>
          </div>
        </header>

        <div className="prose prose-stone lg:prose-xl max-w-none mb-32 prose-p:font-normal prose-p:leading-[1.8] prose-p:text-muji-text prose-headings:font-sans">
          <div className="text-muji-text text-base leading-[2] space-y-12 whitespace-pre-wrap">
             {post.content}
          </div>
        </div>

        <div className="bg-muji-text p-20 md:p-32 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-muji-oak/5 rounded-full -ml-32 -mt-32" />
           <h3 className="text-4xl md:text-5xl font-sans mb-8 text-white font-extrabold leading-none">Strategic Guide</h3>
           <p className="text-muji-white/70 mb-16 max-w-lg mx-auto text-lg font-normal leading-relaxed">Let me assist you to find your next home or start a smart investment search with ease.</p>
           <Link to="/contact" className="inline-block bg-muji-sand text-white hover:text-muji-sand px-16 py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-xl">
              Arrange Personal Consultation
           </Link>
        </div>
      </article>
    </div>
  );
};
