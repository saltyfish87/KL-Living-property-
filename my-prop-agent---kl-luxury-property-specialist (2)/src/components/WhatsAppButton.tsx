import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '60195598932'; // Updated number
  const message = encodeURIComponent(`Hi 👋 Thanks for your interest in KL property.\nAre you looking for:\n1️⃣ Own stay\n2️⃣ Investment\n3️⃣ Airbnb\n\nAnd which area are you interested in?`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageSquare size={32} />
      <span className="absolute -top-12 right-0 bg-stone-900 text-gold-rich text-[10px] font-black px-4 py-2 rounded-full shadow-2xl whitespace-nowrap border border-stone-800 uppercase tracking-widest">
        Private Channel
      </span>
    </motion.a>
  );
};
