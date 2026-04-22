'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: "E'lon berish pullikmi?",
    answer: "Hozircha saytimizda e'lon berish mutlaqo bepul! Siz o'z avtomobilingiz rasmlari va ma'lumotlarini bemalol joylashtirishingiz mumkin."
  },
  {
    question: "Mashinamni qanday sotsam bo'ladi?",
    answer: "Tepada turgan 'E'lon berish +' tugmasini bosing, so'ngra avtomobil ma'lumotlarini va telefon raqamingizni qoldiring. Bizning adminlar ma'lumotlarni tekshirib, saytga chiqarishadi."
  },
  {
    question: "Avtomobilni tekshirib berasizlarmi?",
    answer: "Biz shunchaki e'lonlar platformasimiz. Avtomobilni sotib olishdan oldin mutaxassis bilan maslahatlashishni tavsiya qilamiz."
  },
  {
    question: "Admin bilan qanday bog'lanish mumkin?",
    answer: "Telegram yoki telefon orqali haftaning istalgan kunida bog'lanishingiz mumkin. Biz 09:00 dan 21:00 gacha onlaynmiz."
  }
];

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* SARLAVHA */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
            Yordam Markazi
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900">
            KO'P BERILADIGAN <span className="text-red-600">SAVOLLAR</span>
          </h1>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4 mb-24">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-zinc-100 rounded-3xl overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 md:p-8 text-left flex justify-between items-center group"
              >
                <span className="text-lg font-black uppercase italic tracking-tight text-zinc-800 group-hover:text-red-600 transition-colors">
                  {faq.question}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="p-8 pt-0 text-zinc-500 font-medium leading-relaxed border-t border-zinc-50 border-dashed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* KONTAKT BLOKI */}
        <div className="bg-zinc-900 rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">
              SAVOLINGIZGA JAVOB <br /> TOPMADINGIZMI?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tel */}
              <a href="tel:+998901234567" className="bg-white/10 hover:bg-white/20 p-6 rounded-2xl transition-all">
                <div className="text-2xl mb-2">📞</div>
                <p className="text-[10px] font-black uppercase opacity-60">Telefon</p>
                <p className="font-bold text-sm">90 123 45 67</p>
              </a>

              {/* Telegram - Logo o'zgardi */}
              <a href="https://t.me/Rustamovv_E" className="bg-white/10 hover:bg-[#229ED9] p-6 rounded-2xl transition-all flex flex-col items-center justify-center">
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                    alt="Telegram" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[10px] font-black uppercase opacity-60">Telegram</p>
                <p className="font-bold text-sm">@Rustamovv_E</p>
              </a>

              {/* Instagram - Logo o'zgardi */}
              <a href="https://instagram.com/rustamovv.09" className="bg-white/10 hover:bg-pink-600 p-6 rounded-2xl transition-all flex flex-col items-center justify-center">
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                    alt="Instagram" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[10px] font-black uppercase opacity-60">Instagram</p>
                <p className="font-bold text-sm">@rustamovv.09</p>
              </a>

              {/* Email */}
              <a href="mailto:info@avtobozor.uz" className="bg-white/10 hover:bg-red-600 p-6 rounded-2xl transition-all">
                <div className="text-2xl mb-2">✉️</div>
                <p className="text-[10px] font-black uppercase opacity-60">Email</p>
                <p className="font-bold text-sm">info@avto.uz</p>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}