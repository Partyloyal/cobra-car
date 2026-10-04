import React from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { Sliders, Sparkles, ShieldCheck, ArrowDown } from 'lucide-react';

interface Props {
  onStartCustomizing: () => void;
  onExploreMaterials: () => void;
}

export const Hero: React.FC<Props> = ({ onStartCustomizing, onExploreMaterials }) => {
  return (
    <section className="relative overflow-hidden bg-[#0a0d13] border-b border-zinc-800/80">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.heroCobraInterior}
          alt="كوبرا لتفصيل وتخصيص كبائن السيارات الفاخرة"
          className="w-full h-full object-cover object-center opacity-30 filter saturate-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-[#0a0d13]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d13] via-[#0a0d13]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl space-y-6 text-right">
          {/* Unboxed natural editorial subtitle without pill boxes */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400">
            <span>استوديو كوبرا المتخصص لتفصيل فرش السيارات</span>
            <span aria-hidden="true">·</span>
            <span>تفصيل ليزر بدون تجاعيد</span>
            <span aria-hidden="true">·</span>
            <span>جلود وأقمشة عالمية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight text-balance">
            حوّل سيارتك العادية إلى مقصورة فاخرة تليق بذوقك الخاص
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
            خصّص كل تفصيلة في سيارتك: ألوان وخامات الكراسي، نوع الخيوط والتطريز، تنجيد التابلوه والأبواب، وسقف
            الألكانتارا مع النجوم الليلية، لجميع الماركات والموديلات بدقة تضاهي صالونات السيارات الألمانية.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartCustomizing}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-zinc-950" />
              <span>ابدأ تخصيص سيارتك الآن</span>
            </button>

            <button
              type="button"
              onClick={onExploreMaterials}
              className="flex items-center gap-2 px-5 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              <span>دليل الجلود والأقمشة</span>
              <ArrowDown className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* Clean Unboxed Metadata and Trust Markers */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">✓</span>
              <span>متوافق مع وسائد الأمان الهوائية (Airbag Certified)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">✓</span>
              <span>ضمان شامل 3 سنوات على الخياطة والجلد</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">✓</span>
              <span>خدمة التركيب في الورشة أو عند باب بيتك</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
