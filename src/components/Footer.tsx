import React from 'react';

interface Props {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<Props> = ({ onScrollTo }) => {
  return (
    <footer className="bg-[#080a0f] border-t border-zinc-800 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div className="text-right">
            <div className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-amber-500 font-mono">COBRA</span>
              <span>كوبرا لتفصيل فرش السيارات</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              الاستوديو المتخصص الأول في إعادة بناء وتخصيص كبائن السيارات العادية والفاخرة
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-300">
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
              فروعنا
            </button>
            <a
              href="/cobra-car-customizer.zip"
              download="cobra-car-customizer.zip"
              className="text-amber-400 hover:text-amber-300 transition-colors font-bold underline cursor-pointer"
            >
              تحميل الكود بالكامل (ZIP)
            </a>
          </div>
        </div>

        {/* Clean unboxed metadata without pill boxes */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} كوبرا لتجهيز السيارات</span>
            <span aria-hidden="true">·</span>
            <span>ضمان الجودة 3 سنوات</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <span>خامات ألمانية وإيطالية أصلية</span>
            <span aria-hidden="true">·</span>
            <span>تفصيل كمبيوتر ليزر 3D</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
