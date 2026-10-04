import React, { useState } from 'react';
import { CustomizerState } from '../types/customizer';
import { X, CheckCircle2, MessageSquare, Printer, Copy, Calendar, MapPin, ShieldCheck, Car } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  state: CustomizerState;
}

export const OrderModal: React.FC<Props> = ({ isOpen, onClose, state }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('القاهرة والجيزة');
  const [serviceType, setServiceType] = useState<'workshop' | 'home-service'>('workshop');
  const [preferredDate, setPreferredDate] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  // Generate unique design ID based on current selection
  const designCode = `COBRA-${state.carBrand ? state.carBrand.slice(0, 3).toUpperCase() : 'CAR'}-${Math.floor(1000 + Math.random() * 9000)}`;

  const carTitle = state.isCustomCar
    ? `${state.customBrandName || 'سيارة مخصصة'} - ${state.customModelName || 'موديل خاص'}`
    : `${state.carBrand} ${state.carModel} (${state.carYear})`;

  const generateWhatsAppMessage = () => {
    const text = `مرحباً ورشة كوبرا، أرغب في حجز موعد ومعاينة لتفصيل فرش سيارتي بناءً على التصميم التالي:
📌 كود التصميم: ${designCode}
🚗 السيارة: ${carTitle}
🎨 اللون الخارجي: ${state.exteriorColorName} (${state.exteriorFinish === 'pearl' ? 'لؤلؤي' : state.exteriorFinish === 'metallic' ? 'ميتاليك' : state.exteriorFinish === 'matte' ? 'مطفي' : 'لامع'})
💺 خامة الكراسي: قلب (${state.centerColorName}) + أجناب (${state.bolsterColorName})
🧵 نمط التطريز: ${state.stitchPattern} - لون الخيط (${state.stitchColorName})
⭐ السقف: ${state.roofMaterial} لون (${state.roofColorName}) ${state.starlightEnabled ? 'مع سقف نجوم ليلية' : ''}
🚘 التابلوه والأبواب: تابلوه علوي (${state.dashboardUpperColorName}) + بطانات الأبواب (${state.doorPanelColorName})
🛞 الدركسيون: مكسو بالجلد ${state.steeringCenterStripeHex ? 'مع شريط سباقات علوي' : ''}
🛋 نوع الإسفنج: ${state.foamType}
${state.embossingType !== 'none' ? `⚡ الحفر المخصص: ${state.embossingType} (${state.embossingText || ''})` : ''}

الاسم: ${customerName || 'عميل كوبرا'}
رقم الهاتف: ${customerPhone || 'لم يحدد'}
المدينة: ${customerCity}
طريقة التنفيذ المطلوبة: ${serviceType === 'workshop' ? 'في ورشة كوبرا' : 'خدمة التركيب عند باب البيت'}`;

    return encodeURIComponent(text);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(designCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#11151e] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-right">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-[#0d1017] border-b border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-right">
            <h3 className="text-base sm:text-lg font-black text-white">بطاقة مواصفات التصميم وطلب المعاينة</h3>
            <p className="text-[11px] text-zinc-400">كوبرا لاستوديو تفصيل فرش السيارات الفاخرة</p>
          </div>
        </div>

        {isSubmitted ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-black text-white">تم استلام طلب المعاينة بنجاح!</h4>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                شكراً لك يا <span className="text-amber-400 font-bold">{customerName || 'عميلنا العزيز'}</span>. تم تسجيل
                مواصفات تصميم سيارتك وسيتم التواصل معك خلال ساعتين لتأكيد موعد استلام السيارة أو الفحص.
              </p>
            </div>

            {/* Design Ticket Code */}
            <div className="p-4 bg-zinc-900 border border-amber-500/40 rounded-2xl max-w-md mx-auto flex items-center justify-between">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-amber-300 rounded-lg cursor-pointer transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
              </button>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">كود التصميم المعتمد</span>
                <span className="text-base font-black text-white font-mono tracking-wider">{designCode}</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/201000000000?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>متابعة المحادثة مباشرة عبر واتساب</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white underline block mx-auto cursor-pointer"
            >
              العودة إلى الاستوديو لتعديل التصميم
            </button>
          </div>
        ) : (
          /* Form & Specs Review */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
            {/* Design Summary Card */}
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <span className="font-mono text-xs font-bold text-amber-400">{designCode}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{carTitle}</span>
                  <Car className="w-4 h-4 text-amber-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-zinc-400 ml-1">اللون الخارجي:</span>
                  <span className="text-amber-300 font-semibold">{state.exteriorColorName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 ml-1">قلب الكراسي:</span>
                  <span className="text-zinc-200 font-semibold">{state.centerColorName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 ml-1">أجناب الكراسي:</span>
                  <span className="text-zinc-200 font-semibold">{state.bolsterColorName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 ml-1">التطريز والخيوط:</span>
                  <span className="text-zinc-200 font-semibold">{state.stitchColorName} ({state.stitchPattern})</span>
                </div>
                <div>
                  <span className="text-zinc-400 ml-1">سقف المقصورة:</span>
                  <span className="text-zinc-200 font-semibold">
                    {state.roofColorName} {state.starlightEnabled ? '+ نجوم' : ''}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 ml-1">التابلوه والأبواب:</span>
                  <span className="text-zinc-200 font-semibold">{state.dashboardUpperColorName} و{state.doorPanelColorName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 ml-1">الدعامات:</span>
                  <span className="text-zinc-200 font-semibold">إسفنج طبي 45</span>
                </div>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-300">بيانات الاتصال ومكان المعاينة:</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">الاسم بالكامل *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="اكتب اسمك الكريم"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">رقم الهاتف / واتساب *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-white text-xs text-left focus:outline-none focus:border-amber-500"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">المدينة أو المحافظة</label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="القاهرة والجيزة">القاهرة والجيزة</option>
                    <option value="الإسكندرية والساحل">الإسكندرية والساحل</option>
                    <option value="الدلتا (المنصورة / طنطا / الزقازيق)">الدلتا (المنصورة / طنطا)</option>
                    <option value="القناة (الإسماعيلية / بورسعيد / السويس)">مدن القناة</option>
                    <option value="الصعيد (بني سويف / المنيا / أسيوط)">الصعيد</option>
                    <option value="محافظة أخرى">محافظة أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">طريقة التنفيذ المفضلة</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setServiceType('workshop')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        serviceType === 'workshop'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      زيارة الورشة
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('home-service')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        serviceType === 'home-service'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      خدمة عند البيت
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">ملاحظات أو طلبات خاصة (اختياري)</label>
                <textarea
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="مثال: أريد إضافة تدعيم طبي إضافي لمقعد السائق، أو فحص فتحة السقف..."
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`https://wa.me/201000000000?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال التصميم لواتساب كوبرا مباشرة</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                تأكيد حجز المعاينة والتفصيل ←
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
