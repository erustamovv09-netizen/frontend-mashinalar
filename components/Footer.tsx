import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-white/80 backdrop-blur-xl border-t border-zinc-100 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          
          {/* 1. BRAND QISMI */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-200 group-hover:rotate-6 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900">
                AVTO<span className="text-red-600">BOZOR</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[300px]">
              Eng sifatli avtomobillar. Ishonchli va sifatli xizmat.
            </p>
          </div>

          {/* 2. MENYU - Linklar to'g'irlandi */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Menyu</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/page" className="text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors w-fit">
                Bosh sahifa
              </Link>
              <Link href="/cars" className="text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors w-fit">
                Mashinalar
              </Link>
              <Link href="/about" className="text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors w-fit">
                Biz haqimizda
              </Link>
              <Link href="/contact" className="text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors w-fit">
                Kontakt
              </Link>
            </nav>
          </div>

          {/* 3. BOG'LANISH VA IJTIMOIY TARMOQLAR */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Biz bilan aloqa</h4>
              <a href="tel:+998901234567" className="text-lg font-black text-zinc-900 hover:text-red-600 transition-colors">
                +998 (90) 123-45-67
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://t.me/Rustamovv_E" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-zinc-100 text-zinc-600 hover:bg-[#229ED9] hover:text-white transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.206 16.561c-.19.601-.818.818-1.424.582-.284-.11-.532-.288-.74-.52l-2.003-2.003-1.077 1.077.03 1.346c.01.442-.257.842-.667.994-.41.152-.865.02-1.135-.33l-2.022-2.614-2.522-.84c-.582-.194-.848-.842-.582-1.424l13.136-7.882c.44-.264.99-.136 1.254.304.094.156.126.34.09.516l-2.338 11.2z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/rustamovv.09" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-zinc-100 text-zinc-600 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest">
            © 2026 AvtoBozor Shahrisabz. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}