import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQ_ITEMS } from '~/constants/homeData';

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="px-6 md:px-12 py-20 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-brand-950">
        Часті запитання
      </h2>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              onClick={() => toggleFaq(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && toggleFaq(index)
              }
              className="border border-brand-50 bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:border-brand-800 hover:shadow-md transition-all duration-300"
            >
              <div className="p-6 flex justify-between items-center gap-4">
                <h3 className="font-bold text-lg text-brand-950">{item.q}</h3>
                <div
                  className={`w-11 h-11 shrink-0 rounded-full border border-brand-50 flex items-center justify-center shadow-sm transition-all duration-300 ${
                    isOpen
                      ? 'bg-brand-800 text-white rotate-180 border-brand-800'
                      : 'bg-brand-50 text-brand-800'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-brand-700 text-base leading-relaxed border-t border-app-bg-alt pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
