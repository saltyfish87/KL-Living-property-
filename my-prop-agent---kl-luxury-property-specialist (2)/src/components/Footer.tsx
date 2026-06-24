import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const Footer: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'shyanyeews@gmail.com';

  return (
    <footer className="bg-muji-beige text-muji-text py-24 md:py-32 px-6">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-8">
              <span className="text-muji-text font-serif text-2xl tracking-tight font-medium">
                KL <span className="italic text-muji-oak">LIVING</span>
              </span>
            </Link>
            <p className="text-muji-text-muted text-sm leading-relaxed max-w-[240px] font-normal italic">
              Your personal property consultant for Kuala Lumpur and Selangor. Helping you find a home that feels like you.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muji-text mb-8">Pages</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Home</Link></li>
              <li><Link to="/projects" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Projects</Link></li>
              <li><Link to="/blog" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Blog</Link></li>
              <li><Link to="/contact" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Contact Me</Link></li>
            </ul>
          </div>

          {isAdmin ? (
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-muji-text mb-8">Management</h4>
               <ul className="space-y-4">
                 <li><Link to="/admin" className="text-muji-oak hover:text-muji-text transition-colors text-xs font-bold flex items-center gap-2">Admin Dashboard</Link></li>
               </ul>
            </div>
          ) : (
            <div className="hidden lg:block"></div> /* Empty grid cell placeholder for visual balance on large screens */
          )}

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muji-text mb-8">Area Guides</h4>
            <ul className="space-y-4">
              <li><Link to="/areas/bukit-jalil-property-investment" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Bukit Jalil</Link></li>
              <li><Link to="/areas/central-park-damansara-property" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Central Park Damansara</Link></li>
              <li><Link to="/areas/bangsar-property-investment" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Bangsar</Link></li>
              <li><Link to="/areas/kl-city-property" className="text-muji-text-muted hover:text-muji-oak transition-colors text-xs font-semibold">Kuala Lumpur</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muji-text mb-8">Stay Connected</h4>
            <div className="flex gap-6 mb-8 items-center">
              <Instagram size={18} className="text-muji-text-muted hover:text-muji-text cursor-pointer transition-colors" />
              <Facebook size={18} className="text-muji-text-muted hover:text-muji-text cursor-pointer transition-colors" />
              <Linkedin size={18} className="text-muji-text-muted hover:text-muji-text cursor-pointer transition-colors" />
              <a 
                href="https://www.youtube.com/@shyanyee-8932" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Shyan Yee Property Insights on YouTube"
                className="text-muji-text-muted hover:text-muji-oak transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
            <p className="text-muji-text-muted text-[10px] space-y-1 font-medium">
               REN: 46305 <br />
               Agency: IQI Realty Sdn Bhd <br />
               Registration: E(1) 1584
            </p>
          </div>

        </div>

        <div className="pt-12 border-t border-muji-border flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muji-text-muted text-[10px] font-medium uppercase tracking-widest">
            © 2026 KL Living. Your home, our priority.
          </p>
          <div className="flex gap-8 text-muji-text-muted text-[10px] font-medium uppercase tracking-widest">
            <span className="hover:text-muji-text cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-muji-text cursor-pointer transition-colors">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
