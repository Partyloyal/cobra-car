import React from 'react';
import { MapPin, Phone, Clock, Truck, MessageCircle, HelpCircle } from 'lucide-react';

interface Props {
  onOpenBooking: () => void;
}

export const Workshops: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <section id="workshop-section" className="py-16 sm:py-24 bg-[#0a0d13] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-right">
          <div className="text-xs font-semibold text-amber-400 mb-2">فروع وورش استوديو كوبرا</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            تفضل بزيارتنا أو اطلب فريق التركيب المتنقل
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            مراكز مجهزة بأحدث ماكينات الخياطة الألمانية، وصالات عرض للخامات والجلود لتلمس نعومتها بنفسك قبل التفصيل.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4 text-right">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">الفرع الرئيسي والورشة المركزية</h3>
              <p className="text-xs text-zinc-400 mt-1">القاهرة الجديدة - التجمع الخامس (المنطقة الصناعية)</p>
            </div>
            <div className="text-xs text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>يومياً: 10:00 ص - 10:00 م (الجمعة 2:00 م)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr">0100 000 0001</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4 text-right">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">فرع غرب القاهرة (الشيخ زايد)</h3>
              <p className="text-xs text-zinc-400 mt-1">الشيخ زايد - محور 26 يوليو (مجمع مراكز السيارات)</p>
            </div>
            <div className="text-xs text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>يومياً: 10:00 ص - 10:00 م</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr">0100 000 0002</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4 text-right">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">أسطول الخدمة المتنقلة (VIP)</h3>
              <p className="text-xs text-zinc-400 mt-1">يغطي جميع أنحاء القاهرة الكبرى والإسكندرية والمحافظات</p>
            </div>
            <div className="text-xs text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>حجز مسبق مع فريق فني مجهز</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>تنسيق فوري عبر واتساب</span>
              </div>
            </div>
          </div>
        </div>

        {/* Common Questions FAQ */}
        <div className="max-w-3xl mx-auto space-y-4 text-right">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">الأسئلة الشائعة حول تفصيل الفرش</h3>

          {[
            {
              q: 'هل يؤثر تنجيد الكراسي الجديد على وسائد الهواء (Airbag) بالسيارة؟',
              a: 'إطلاقاً. ورشة كوبرا تستخدم خيوطاً ألمانية مصممة خصيصاً للتفكك اللحظي بمجرد انتفاخ وسادة الهواء، مع الحفاظ التام على أمان الركاب وفق معايير TÜV العالمية.',
            },
            {
              q: 'كم يستغرق تفصيل وتركيب الفرش بالكامل؟',
              a: 'في العادة يتم التفصيل مسبقاً بناءً على كود سيارتك، ويستغرق الفك والتركيب في الورشة يوماً واحداً (من 4 إلى 6 ساعات)، وتستلم سيارتك في نفس اليوم.',
            },
            {
              q: 'هل الفرش ثابت أم تلبيسة فوق القديم؟',
              a: 'نحن نقوم بعمل فرش كبس وتفصيل أصلي محكم بالكامل بالمشابك والتدبيس مثل المصنع تماماً بدون أي فراغات هوائية أو تجاعيد.',
            },
            {
              q: 'كيف أنظف مقاعد الجلد والألكانتارا بعد التركيب؟',
              a: 'الجلود معالجة بطبقة نانو طاردة للبقع؛ يكفيك مسحها بقطعة قماش مايكروفايبر مبللة بالماء الفاتر، ونوفر مع كل فرش علبة بلسم مرطب مجانية للعناية الدورية.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pr-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
