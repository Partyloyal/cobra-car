import React, { useState } from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { Sparkles, Star } from 'lucide-react';

interface ProjectItem {
  id: string;
  carTitle: string;
  category: 'sedan' | 'suv' | 'alcantara' | 'sports';
  materialUsed: string;
  stitchType: string;
  image: string;
  clientFeedback: string;
  clientName: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    carTitle: 'تويوتا كورولا 2024 - مقصورة نابا كونياك وأسود',
    category: 'sedan',
    materialUsed: 'جلد نابا ألماني ناعم + تضريب ماسي مزدوج',
    stitchType: 'خيوط ذهبية عاجية مع مسند ذراع مطابق',
    image: ASSET_IMAGES.gallerySedanInterior,
    clientFeedback: 'صالون العربية اتغير 180 درجة، راحة تامة في السفر وإتقان فظيع في خياطة الأبواب والدركسيون.',
    clientName: 'م. أحمد الشناوي',
  },
  {
    id: 'p2',
    carTitle: 'كيا سبورتاج SUV - ألكانتارا ستيلث وسقف نجوم رولز',
    category: 'suv',
    materialUsed: 'شامواه ألكانتارا إيطالي + 500 نقطة ألياف ضوئية',
    stitchType: 'خياطة دبل ستيتش فضية مع دعامات ميموري فوم',
    image: ASSET_IMAGES.gallerySuvAlcantara,
    clientFeedback: 'سقف النجوم مع الألكانتارا بالليل خيال.. أصحابي افتكروا العربية نازلة كده من المصنع!',
    clientName: 'د. طارق السعيد',
  },
  {
    id: 'p3',
    carTitle: 'هيونداي إلنترا CN7 - تصميم الصحراء الملكي',
    category: 'sedan',
    materialUsed: 'جلد جملي صحراوي مقاوم للحرارة والشمس',
    stitchType: 'تطريز ماسي ملكي مع كسوة التابلوه بالكامل',
    image: ASSET_IMAGES.heroCobraInterior,
    clientFeedback: 'شمس الصيف كانت بتحرق المقاعد القديمة.. الجلد ده بارد ومريح جداً وشكله تحفة.',
    clientName: 'أ. حسام فوزي',
  },
  {
    id: 'p4',
    carTitle: 'نيسان قشقاي - تفصيل مقاعد رياضية مضلعة',
    category: 'sports',
    materialUsed: 'جلد مثقب مسامي للتبريد مع أطراف نابا سوداء',
    stitchType: 'خيوط حمراء رياضية مع شريط أحمر على الدركسيون',
    image: ASSET_IMAGES.materialLeatherCraft,
    clientFeedback: 'الخياطة اليدوية بالمللي ولا سنتي تجعيدة.. شكراً لفريق كوبرا على الأمانة والسرعة.',
    clientName: 'كابتن عمر ممدوح',
  },
];

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="gallery-section" className="py-16 sm:py-24 bg-[#0d1017] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-right">
          <div>
            <div className="text-xs font-semibold text-amber-400 mb-2">من ورش ومراكز كوبرا</div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              معرض التحولات الحقيقية: قبل وبعد الإبداع
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              نماذج حقيقية لسيارات عملائنا العادية تم تحويلها بالكامل لصالونات فارهة
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 shrink-0">
            {[
              { id: 'all', label: 'جميع الأعمال' },
              { id: 'sedan', label: 'سيدان' },
              { id: 'suv', label: 'دفع رباعي SUV' },
              { id: 'sports', label: 'رياضي وألكانتارا' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-amber-500/40 transition-all text-right group shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.carTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-300">تفصيل مخصص في استوديو كوبرا</span>
                    <h3 className="text-lg font-black text-white">{item.carTitle}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-amber-400 font-semibold">الخامة:</span>
                    <span>{item.materialUsed}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-amber-400 font-semibold">التطريز:</span>
                    <span>{item.stitchType}</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-200">{item.clientName}</span>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 italic">"{item.clientFeedback}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
