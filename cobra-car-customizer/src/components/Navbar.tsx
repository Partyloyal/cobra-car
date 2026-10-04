import React from 'react';
import { Phone, Calendar, Download } from 'lucide-react';

interface Props {
  onOpenBooking: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<Props> = ({ onOpenBooking, onScrollTo }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0e14]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-black tracking-wider text-white hover:text-amber-400 transition-colors flex items-center gap-2"
        >
          <span className="text-amber-500 font-mono text-2xl font-black">COBRA</span>
          <span className="text-zinc-200">كوبرا</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300">
          <button
            type="button"
            onClick={() => onScrollTo('configurator-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            استوديو التخصيص
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('materials-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            دليل الخامات
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('craftsmanship-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            معايير الجودة
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('gallery-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            معرض الأعمال
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('workshop-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            الفروع والورشة
          </button>
        </nav>

        {/* Zone 3: Actions (ZIP Download & Booking) */}
        <div className="flex items-center gap-2.5">
          <a
            href="/cobra-car-customizer.zip"
            download="cobra-car-customizer.zip"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            title="تحميل جميع ملفات المشروع ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تحميل كود المشروع ZIP</span>
            <span className="sm:hidden">ZIP</span>
          </a>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs sm:text-sm font-black text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            حجز معاينة وتفصيل
          </button>
        </div>
      </div>
    </header>
  );
};
