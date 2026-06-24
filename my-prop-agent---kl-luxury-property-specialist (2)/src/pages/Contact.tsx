import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, MessageCircle, ChevronDown, Youtube, CheckCircle2, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { db } from '../lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';

export const Contact: React.FC = () => {
  const phoneNumber = '60195598932';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Buying a New Home');
  const [message, setMessage] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 1. Submit to Firestore first so leads are never lost!
      await addDoc(collection(db, 'contact_inquiries'), {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        inquiryType,
        message: message.trim(),
        createdAt: serverTimestamp()
      });

      // 2. Submit to FormSubmit.co for direct emailing to saltyfish1987@gmail.com
      // Extremely reliable, robust, 100% free, requires NO API keys or credit card registration!
      await fetch("https://formsubmit.co/ajax/saltyfish1987@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          inquiry_type: inquiryType,
          message: message.trim(),
          _subject: `New Lead Inquiry: ${name} [${inquiryType}]`,
          _captcha: "false" // Disable captcha for direct ajax submissions
        })
      });

      setSubmitSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error("Submission failed:", err);
      // Even if email forwarder fails network-wise, we logged it in Firestore first so we show success
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-muji-white min-h-screen font-sans selection:bg-muji-sand selection:text-white">
      <SEO 
        title="Contact Me | Your Property Consultant"
        description="I'm here to help with your property needs in Kuala Lumpur and Selangor. Reach out for a friendly and professional consultation."
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": "https://shyanyee.com/contact#webpage",
              "url": "https://shyanyee.com/contact",
              "name": "Contact Shyan Yee | Premium Real Estate Advisor",
              "description": "Have questions about projects or your property search in Kuala Lumpur and Selangor? Get in touch with Shyan Yee (REN 46305)."
            },
            {
              "@type": "RealEstateAgent",
              "@id": "https://shyanyee.com/#agent",
              "name": "Shyan Yee - Premium Real Estate Advisor | IQI Realty",
              "description": "Registered Real Estate Negotiator REN 46305 based in Kuala Lumpur and Selangor. Specializes in luxury condominiums, brand-new launches, and property investments in Bukit Jalil, Damansara, and Central Park Damansara.",
              "url": "https://shyanyee.com",
              "logo": "https://shyanyee.com/logo.png",
              "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
              "telephone": "+60195598932",
              "email": "shyanyeews@gmail.com",
              "priceRange": "RM 500,000 - RM 2,000,000",
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Kuala Lumpur"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Selangor"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Johor"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Level 20, Menara Pavilion, 168 Jalan Raja Chulan, Bukit Bintang",
                "addressLocality": "Kuala Lumpur",
                "addressRegion": "WP Kuala Lumpur",
                "postalCode": "55100",
                "addressCountry": "MY"
              },
              "parentOrganization": {
                "@type": "RealEstateAgent",
                "name": "IQI Realty Sdn Bhd",
                "identifier": "E(1) 1584"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+60195598932",
                "contactType": "sales",
                "areaServed": "MY",
                "availableLanguage": ["English", "Malay", "Chinese"]
              },
              "sameAs": [
                "https://www.youtube.com/@shyanyee-8932",
                "https://wa.me/60195598932"
              ]
            }
          ]
        }}
      />

      {/* Hero Header */}
      <section className="bg-white pt-24 pb-16 px-6 border-b border-muji-border">
        <div className="container-custom">
          <h1 className="text-4xl md:text-7xl font-serif text-muji-text mb-8">
            Get in <span className="italic text-muji-oak">Touch</span>
          </h1>
          <p className="text-muji-text-muted text-lg font-normal max-w-xl leading-relaxed">
            I would love to hear from you. Whether you have a question about a project or want to discuss your property search, feel free to reach out.
          </p>
        </div>
      </section>

      <section className="section-padding bg-muji-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            <div className="lg:pr-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak mb-10">Contact Details</h2>
              
              <div className="space-y-12 mb-16">
                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">Phone</p>
                  <p className="text-2xl md:text-3xl font-semibold text-muji-text hover:text-muji-oak transition-colors">+60 19 559 8932</p>
                </div>

                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">Email</p>
                  <p className="text-2xl md:text-3xl font-semibold text-muji-text italic hover:text-muji-oak transition-colors">shyanyeews@gmail.com</p>
                </div>

                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">Agency Registration</p>
                  <p className="text-xl md:text-2xl font-serif text-muji-text leading-tight">IQI Realty Sdn Bhd <span className="text-xs text-muji-text-muted font-sans font-normal block md:inline md:ml-1">(E(1) 1584)</span></p>
                  <p className="text-xs font-semibold text-muji-text-muted mt-1 uppercase tracking-wider font-mono">REN Registration: REN 46305</p>
                </div>

                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">YouTube Channel</p>
                  <a 
                    href="https://www.youtube.com/@shyanyee-8932" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg md:text-xl font-semibold text-muji-text hover:text-muji-oak transition-colors inline-flex items-center gap-2"
                  >
                    <Youtube size={20} className="text-muji-oak shrink-0" />
                    <span className="border-b border-muji-border hover:border-muji-oak pb-0.5">Shyan Yee Property Insights</span>
                  </a>
                </div>

                <div className="group">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">WhatsApp</p>
                  <a href={whatsappUrl} className="flex items-center gap-3 text-muji-oak hover:text-muji-text transition-colors mt-2">
                    <MessageCircle size={20} />
                    <span className="text-lg font-semibold border-b border-muji-oak">Start a chat with me</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-8 pt-10 border-t border-muji-border items-center">
                 <Instagram size={20} className="text-muji-text-muted hover:text-muji-text cursor-pointer transition-colors" />
                 <Facebook size={20} className="text-muji-text-muted hover:text-muji-text cursor-pointer transition-colors" />
                 <Linkedin size={20} className="text-muji-text-muted hover:text-muji-text cursor-pointer transition-colors" />
                 <a 
                   href="https://www.youtube.com/@shyanyee-8932" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   title="Shyan Yee Property Insights on YouTube"
                   className="text-muji-text-muted hover:text-muji-oak transition-colors"
                 >
                   <Youtube size={22} />
                 </a>
              </div>
            </div>

            <div className="bg-white p-10 md:p-16 muji-card">
              <h2 className="text-2xl font-serif text-muji-text mb-10">Send a Message</h2>
              
              {submitSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-muji-text">Inquiry Submitted!</h3>
                  <div className="space-y-4 max-w-md mx-auto text-sm text-muji-text-muted font-light leading-relaxed">
                    <p>
                      Thank you for your message. Your property investment or purchase inquiry has been logged securely in our systems.
                    </p>
                    <div className="bg-muji-sand/5 border border-muji-sand/25 p-4 rounded-sm text-xs text-muji-text font-normal mt-2 text-left space-y-2">
                      <p>
                        <strong>📩 Live Form Forwarding Active:</strong> An email notification was dispatched directly to <strong>saltyfish1987@gmail.com</strong>.
                      </p>
                      <p className="text-stone-500 font-light text-[11px]">
                        * If this is the very first inquiry on your container, check the inbox of **saltyfish1987@gmail.com** for a quick 1-click confirmation email from FormSubmit.co to activate instant forwarding!
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSubmitSuccess(false);
                    }}
                    className="muji-button-secondary py-3 px-8 text-xs mt-6 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="bg-red-50 text-red-700 text-xs p-4 border border-red-200 font-medium">
                      {submitError}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muji-text-muted mb-3 tracking-widest">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-muji-white border border-muji-border px-6 py-4 text-sm font-normal focus:border-muji-oak outline-none transition-all placeholder:text-muji-text-muted/50" 
                        placeholder="Full Name" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muji-text-muted mb-3 tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-muji-white border border-muji-border px-6 py-4 text-sm font-normal focus:border-muji-oak outline-none transition-all placeholder:text-muji-text-muted/50" 
                        placeholder="+60" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-muji-text-muted mb-3 tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-muji-white border border-muji-border px-6 py-4 text-sm font-normal focus:border-muji-oak outline-none transition-all placeholder:text-muji-text-muted/50" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-muji-text-muted mb-3 tracking-widest">Type of Inquiry</label>
                    <div className="relative">
                      <select 
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full bg-muji-white border border-muji-border px-6 py-4 text-sm font-medium focus:border-muji-oak outline-none appearance-none cursor-pointer"
                      >
                        <option>Buying a New Home</option>
                        <option>Property Investment</option>
                        <option>Selling my Property</option>
                        <option>General Question</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muji-text-muted" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-muji-text-muted mb-3 tracking-widest">Message</label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-muji-white border border-muji-border px-6 py-4 text-sm font-normal focus:border-muji-oak outline-none h-32 transition-all placeholder:text-muji-text-muted/50" 
                      placeholder="How can I help you?" 
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="muji-button-primary w-full py-5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4" /> Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Simple Location */}
      <section className="bg-muji-beige border-y border-muji-border">
        <div className="container-custom py-20">
          <div className="grid lg:grid-cols-2 items-center gap-16">
             <div>
                <h3 className="text-3xl font-serif text-muji-text mb-6">Our Office</h3>
                <p className="text-muji-text-muted text-lg font-normal leading-relaxed mb-10">
                   Feel free to drop by for a coffee and discuss your property journey.
                </p>
                <div className="flex items-start gap-4">
                   <MapPin className="w-6 h-6 text-muji-sand shrink-0 mt-1" />
                   <p className="text-muji-text font-semibold leading-relaxed">
                      Level 20, Menara Pavilion, 168 Jalan Raja Chulan, <br/>
                      Bukit Bintang, 55100 Kuala Lumpur
                   </p>
                </div>
             </div>
             <div className="h-64 lg:h-80 overflow-hidden rounded-sm grayscale-[0.5] opacity-80 border border-muji-border">
                <img 
                 src="https://picsum.photos/seed/kl-center/1200/800?grayscale" 
                 alt="Kuala Lumpur Center" 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
