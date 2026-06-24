import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, BookOpen, Clock, FileText, Landmark, Key, Percent } from 'lucide-react';
import { cn } from '../lib/utils';

export interface FAQItem {
  id: string;
  category: 'investment' | 'financing' | 'legal';
  icon: React.ReactNode;
  question: string;
  answer: string;
}

export const PropertyFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const faqData: FAQItem[] = [
    {
      id: 'faq-ren-license',
      category: 'legal',
      icon: <Key size={16} className="text-muji-oak" />,
      question: "How can buyers verify the license of a Real Estate Negotiator (REN) to avoid property scams in Malaysia?",
      answer: "In Malaysia, all legitimate property advisors must be registered with the Board of Valuers, Appraisers, Estate Agents and Property Managers (LPPEH). You can verify an advisor's license by checking their registered Real Estate Negotiator (REN) ID. For example, Shyan Yee is a fully certified advisor registered under REN 46305 with IQI Realty Sdn Bhd. Sticking to certified negotiators guarantees maximum transparency, ethical conduct, and legal safety throughout your real estate transaction."
    },
    {
      id: 'faq-thresholds',
      category: 'investment',
      icon: <Landmark size={16} className="text-muji-oak" />,
      question: "What are the legal minimum price thresholds and ownership rules for foreign investors buying residential real estate?",
      answer: "Foreign acquisitions are subject to minimum price thresholds, set by state governments to protect local buyers. In Kuala Lumpur, foreigners can buy residential property priced at RM1,000,000 or above (applicable to both landed and high-rise/strata units). In Selangor, the requirements are stricter: the minimum purchase price is RM2,000,000 (Zone 1 & 2) or RM1,000,000 (Zone 3), and acquisition is strictly limited to strata-titled high-rise residential units. Additionally, all foreign transactions require State Authority Consent (Section 433B of the National Land Code)."
    },
    {
      id: 'faq-financing',
      category: 'financing',
      icon: <Percent size={16} className="text-muji-oak" />,
      question: "How does property financing work for expat buyers and high-net-worth investors in Malaysia?",
      answer: "Expatriates and non-residents can secure residential mortgages from local Malaysian banks or foreign financial institutions. Generally, the Margin of Finance (LTV ratio) ranges from 50% to 70% for non-residents. Expatriates residing in Malaysia with valid employment passes or MM2H visas may qualify for higher LTV allocations of up to 80% or 85%. Loan tenures typically extend up to 30 years or until age 65-70, depending on individual age and asset valuations. Submitting tax files, salary sheets, and asset proofs aids quick approvals."
    },
    {
      id: 'faq-purchase-process',
      category: 'legal',
      icon: <FileText size={16} className="text-muji-oak" />,
      question: "What is the typical progression of the legal purchase process from reservation to physical key collection?",
      answer: "The transaction milestones progress through clear legal steps: First, signing the Letter of Offer and paying a 2% to 3% earnest deposit. Within 14 to 21 working days, the sale and purchase agreement (SPA) is executed along with bringing the total down payment to 10% of the price. The remaining 90% completion amount is settled within 3 months (completion period) either through bank disbursement or cash stages. Note that for foreign buyers, the 3-month completion period only starts once the official State Consent is formally approved."
    },
    {
      id: 'faq-freehold-leasehold',
      category: 'investment',
      icon: <Clock size={16} className="text-muji-oak" />,
      question: "What are the core differences between Freehold and Leasehold luxury properties in Kuala Lumpur & Selangor?",
      answer: "Freehold properties grant perpetual ownership with fewer transfer restrictions, serving as excellent long-term generational assets holding premium value retention. Leasehold properties carry a set tenure (usually 99 years). In KL/Selangor, transfer of leasehold assets requires official State Authority Consent which can add 3 to 6 months to transaction timelines. However, leasehold assets in prime urban locations are often priced 15% to 20% lower, which frequently converts into a stronger rental yield for cash-flow focused investors."
    },
    {
      id: 'faq-stamp-duties',
      category: 'financing',
      icon: <Percent size={16} className="text-muji-oak" />,
      question: "What are the latest MOT stamp duty rates, legal fees, and hidden transaction costs to budget for?",
      answer: "The Memorandum of Transfer (MOT) stamp duty is computed tier-by-tier: 1% for the first RM100,000, 2% for the next RM100,001 to RM500,000, 3% from RM500,001 to RM1,000,000, and 4% for any amount exceeding RM1,000,000. Under Malaysia's homeownership incentives, first-time homebuyers receive a complete 100% stamp duty exemption on properties under RM500,000. Legal fees for SPA are also regulated, ranging from 1% to 1.25%, decreasing gradually for higher property values."
    },
    {
      id: 'faq-mm2h-program',
      category: 'legal',
      icon: <BookOpen size={16} className="text-muji-oak" />,
      question: "How does the Malaysia My Second Home (MM2H) visa program affect luxury real estate purchases?",
      answer: "The MM2H visa program is divided into three distinct tiers (Platinum, Gold, Silver), each with specific fixed deposit, income, and minimum property purchase requirements: Silver requires a minimum property value of RM600,000; Gold requires RM1,000,000; and Platinum requires RM2,000,000. MM2H status offers expedited state consent approvals and, depending on the state, may permit foreigners to acquire landed units within designated Master Planned developments, provided they hold the property for a minimum of 10 years."
    },
    {
      id: 'faq-progressive-billing',
      category: 'financing',
      icon: <Clock size={16} className="text-muji-oak" />,
      question: "How are progressive payments structured for luxury properties under construction (Schedule H)?",
      answer: "For premium developments under construction, payments are made in installments as milestones are completed, certified by the architect. This starts with structural foundation (10%), reinforced concrete frame (15%), wall blockworks (10%), ceiling/fittings (10%), electrical/plumbing (10%), plastering/finishes (10%), and sewage/drainage (5%), with the final 17.5% paid upon vacant possession and Defects liability. This structured payment protects capital since funds are released relative to actual build-up progress."
    }
  ];

  const visibleFaqs = showAll ? faqData : faqData.slice(0, 4);

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full" id="property-faq-com-container">
      <div className="space-y-4">
        {visibleFaqs.map((faq, idx) => {
          const isOpen = openIndex === faq.id;
          return (
            <div 
              key={faq.id} 
              id={`faq-card-${faq.id}`}
              className="border border-muji-border rounded-sm bg-white overflow-hidden transition-all duration-300 hover:border-muji-oak/30"
            >
              <button
                id={`faq-btn-${faq.id}`}
                onClick={() => toggleAccordion(faq.id)}
                className="w-full py-4 px-5 md:py-6 md:px-8 flex justify-between items-center text-left hover:bg-muji-beige/10 transition-colors focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 sm:gap-4 pr-4">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-muji-beige/45 flex items-center justify-center">
                    {faq.icon}
                  </div>
                  <span className="text-xs sm:text-xs md:text-sm font-semibold text-muji-text tracking-wide leading-snug pt-0.5">
                    {faq.question}
                  </span>
                </div>
                <span className={cn(
                  "w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center bg-muji-beige text-muji-oak transition-transform duration-300 shrink-0",
                  isOpen && "rotate-180"
                )}>
                  <ChevronDown size={14} />
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2 ml-9 md:ml-12 md:px-8 md:pb-6 md:pt-2 text-xs md:text-xs lg:text-[13px] text-muji-text-muted font-normal leading-relaxed border-t border-muji-beige/20 bg-muji-beige/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Expand / See More Toggle Button */}
      <div className="mt-8 text-center" id="faq-toggle-action-wrapper">
        <button
          id="btn-faq-toggle-expand"
          onClick={() => {
            setShowAll(!showAll);
            // If going backwards, scroll back to container for accessibility
            if (showAll) {
              const el = document.getElementById('property-faq-com-container');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 border border-muji-oak text-muji-oak hover:bg-muji-oak hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest rounded-sm cursor-pointer active:scale-98"
        >
          <span>{showAll ? 'Collapse Questions' : 'Click to See More Questions'}</span>
          <motion.span
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            <ChevronDown size={14} />
          </motion.span>
        </button>
      </div>
    </div>
  );
};
