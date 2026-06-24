import React from 'react';
import { BLOG_POSTS } from '../data';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

export const Blog: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-20 bg-white min-h-screen">
      <SEO 
        title="KL Property Insights & Investment Blog"
        description="Expert analysis on Kuala Lumpur property market, investment guides, and latest project news."
      />

      <section className="bg-muji-beige py-32 px-4 overflow-hidden relative border-b border-muji-border/30">
         <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="grid grid-cols-12 h-full">
               {[...Array(12)].map((_, i) => <div key={i} className="border-r border-stone-200" />)}
            </div>
         </div>
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="text-muji-oak uppercase tracking-[0.4em] text-[10px] font-bold block mb-8">{t('blog.badge')}</span>
            <h1 className="text-5xl md:text-8xl font-sans font-extrabold text-muji-text mb-8 leading-tight">{t('blog.title')}<br /><span className="text-muji-sand">{t('blog.subtitle')}</span></h1>
            <p className="text-muji-text-muted max-w-xl mx-auto text-lg font-normal">{t('blog.desc')}</p>
         </div>
      </section>

      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {BLOG_POSTS.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group"
            >
              <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="aspect-[16/10] bg-stone-50 rounded-[2.5rem] overflow-hidden mb-10 relative shadow-xl">
                   <img 
                    src={`https://picsum.photos/seed/${post.slug}/800/500`} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute top-6 left-6 bg-stone-900/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full">
                     {post.category}
                   </div>
                </div>
                <div className="flex-1 flex flex-col px-2">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muji-text-muted mb-6 font-mono">
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
                  </div>
                  <h2 className="text-3xl font-sans font-extrabold text-muji-text mb-6 group-hover:text-muji-oak transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-muji-text-muted text-base leading-relaxed mb-10 flex-1 font-normal">
                    {post.excerpt}
                  </p>
                  <div className="pt-8 border-t border-stone-100 flex items-center text-stone-900 font-bold uppercase tracking-widest text-[10px] group-hover:text-muji-sand transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-3 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Hook */}
        <div className="max-w-7xl mx-auto mt-40">
          <div className="bg-stone-900 rounded-[4rem] p-16 md:p-32 flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-rich/5 rounded-full -mr-32 -mt-32" />
            <div className="flex-1 lg:text-left text-center relative">
              <h2 className="text-5xl md:text-6xl font-sans font-extrabold text-white uppercase mb-6 leading-tight">Stay Ahead of the <br/><span className="text-muji-sand">Kuala Lumpur</span> Curve</h2>
              <p className="text-muji-white/80 text-lg font-normal">Exclusive briefing on strategic updates, price reloads, and institutional opportunities.</p>
            </div>
            <div className="w-full lg:w-auto relative">
              <form className="flex flex-col sm:flex-row gap-6" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Professional Email" 
                  className="px-10 py-6 rounded-2xl bg-white/5 border border-white/10 text-white outline-none w-full sm:w-96 font-bold text-sm focus:border-muji-sand transition-all placeholder:text-white/40"
                />
                <button className="px-12 py-6 bg-muji-sand text-white hover:text-muji-sand font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all whitespace-nowrap shadow-xl cursor-pointer">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
