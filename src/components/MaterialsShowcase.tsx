import React, { useState } from 'react';
import { MATERIALS } from '../data/materials';
import { ASSET_IMAGES } from '../assets/images';
import { ShieldCheck, Flame, Wind, Sparkles } from 'lucide-react';

interface Props {
  onSelectMaterial: (materialId: string) => void;
}

export const MaterialsShowcase: React.FC<Props> = ({ onSelectMaterial }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMaterials = selectedCategory === 'all'
    ? MATERIALS
    : MATERIALS.filter((m) => m.category === selectedCategory);

  return (
    <section id="materials-section" className="py-16 sm:py-24 bg-[#0d1017] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="text-xs font-semibold text-amber-400 mb-2">خامات عالمية معتمدة لبيئتنا الحارة</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            دليل أقمشة وجلود كوبرا: اختر الخامة المثالية لسيارتك
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            نستورد جلودنا وأقمشتنا من كبرى المدابغ الألمانية والإيطالية والتركية، معالجة بطبقات حماية نانو ضد الأشعة
            فوق البنفسجية، بدون أي انبعاثات روائح كيميائية ومقاومة تامة للحرارة والتشقق.
          </p>
        </div>

        {/* Feature Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-7 space-y-4 text-right">
            <div className="text-xs font-bold text-amber-400">حرفية يدوية وتفصيل كمبيوتر</div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              سر متانة فرش كوبرا: درزات مزدوجة معالجة ضد التفكك
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              كل مقعد يتم تفكيكه بدقة، وتثبيت طبقة الإسفنج الطبي المقاوم للهبوط، ثم إعادة تنجيده بأقوى خيوط بوليستر ألمانية
              مقاومة لشد حتى 120 نيوتن، مما يضمن بقاء المقعد مشدوداً كالوكالة لسنوات طويلة دون ترهل أو تجاعيد.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
                <div className="text-xs font-bold text-zinc-200">مقاومة درجات الحرارة</div>
                <div className="text-[11px] text-zinc-400 mt-1">تتحمل حتى 75°C داخل صالون السيارة</div>
              </div>
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
                <div className="text-xs font-bold text-zinc-200">أمان الأيرباج 100%</div>
                <div className="text-[11px] text-zinc-400 mt-1">خياطة خاصة قابلة للفتح اللحظي مع الوسادة</div>
              </div>
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
                <div className="text-xs font-bold text-zinc-200">صديقة للبشرة</div>
                <div className="text-[11px] text-zinc-400 mt-1">خالية من الفورمالديهايد والمواد الضارة</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-zinc-700/60">
            <img
              src={ASSET_IMAGES.materialLeatherCraft}
              alt="حرفية خياطة وتفصيل جلود السيارات في ورشة كوبرا"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div className="text-right">
                <span className="text-xs font-bold text-amber-300">ورشة كوبرا المركزية</span>
                <p className="text-[11px] text-zinc-300">خياطة يدوية دقيقة للمقاعد والتابلوه</p>
              </div>
            </div>
          </div>
        </div>

        {/* Material Cards Grid (NO PRICES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATERIALS.map((mat) => (
            <div
              key={mat.id}
              className="flex flex-col justify-between p-6 bg-zinc-900/70 border border-zinc-800/80 rounded-2xl hover:border-amber-500/50 transition-all text-right group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">{mat.nameEn}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {mat.nameAr}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {mat.descriptionAr}
                </p>

                {/* Rating bars (Durability, Heat, Breathability) */}
                <div className="space-y-2 pt-3 border-t border-zinc-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>قوة التحمل ومقاومة الاحتكاك:</span>
                    </span>
                    <span className="font-mono text-zinc-200">{mat.durability} / 5</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(mat.durability / 5) * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>مقاومة الشمس والحرارة:</span>
                    </span>
                    <span className="font-mono text-zinc-200">{mat.heatResistance} / 5</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(mat.heatResistance / 5) * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-amber-400" />
                      <span>التهوية ونفاذية الهواء:</span>
                    </span>
                    <span className="font-mono text-zinc-200">{mat.breathability} / 5</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(mat.breathability / 5) * 100}%` }} />
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                  <span className="font-semibold text-zinc-300">موصى به لـ: </span>
                  {mat.recommendedFor}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectMaterial(mat.id)}
                  className="w-full py-2.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/30 rounded-xl transition-all cursor-pointer text-center"
                >
                  اختر هذه الخامة في الاستوديو ←
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
