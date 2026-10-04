import React from 'react';
import { ShieldCheck, Award, Wrench, Clock, Truck, CheckCircle2 } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  return (
    <section id="craftsmanship-section" className="py-16 sm:py-24 bg-[#0a0d14] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-right">
          <div className="text-xs font-semibold text-amber-400 mb-2">لماذا يختار عملاؤنا كوبرا؟</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            معايير الجودة الصارمة: عندما يلتقي الفن بدقة الهندسة
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            لا نكتفي بتركيب كسوة فوق الفرش القديم؛ نحن نعيد بناء مقصورة سيارتك من الصفر بأسلوب المصانع الألمانية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: 'قص كمبيوتر وليزر ثلاثي الأبعاد 3D',
              desc: 'أكثر من 850 باترون أصلي لمختلف موديلات السيارات من 1995 إلى 2026، لضمان قياس ميليمترى خالٍ تماماً من التموجات والتجاعيد.',
            },
            {
              icon: ShieldCheck,
              title: 'أمان الوسائد الهوائية (Airbag Safe)',
              desc: 'نستخدم ماكينات خياطة خاصة مزودة بخيوط قابلة للانفجار اللحظي عند خروج الإيرباج الجانبي للمقاعد، مع شهادة أمان تفصيلية.',
            },
            {
              icon: Wrench,
              title: 'إسفنج ألماني طبي كثافة 45',
              desc: 'معالجة ترهل مقاعد السيارة القديمة بإضافة بطانة إسفنجية ميموري فوم عالية الكثافة تدعم الظهر وتستعيد شكل المقعد الأصلي كالجديد.',
            },
            {
              icon: Truck,
              title: 'خدمة الفك والتركيب عند باب بيتك',
              desc: 'لا وقت لديك للقدوم للورشة؟ فريق كوبرا المتنقل يصلك حتى باب منزلك أو مقر عملك لفك الكراسي وتركيبها بعد التفصيل باحترافية.',
            },
            {
              icon: Clock,
              title: 'سرعة الإنجاز والتسليم',
              desc: 'يتم تجهيز وتفصيل فرش سيارتك بالكامل خلال 48 إلى 72 ساعة، مع توفير سيارة بديلة أو خدمة الفك والتركيب في يوم واحد.',
            },
            {
              icon: CheckCircle2,
              title: 'شهادة ضمان رسمي 3 سنوات',
              desc: 'ضمان مكتوب وموثق يغطي ثبات ألوان الجلد، متانة خيوط التطريز، وعدم تقشر أو تشقق الخامة طوال فترة الضمان.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl hover:border-amber-500/40 transition-all text-right space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
