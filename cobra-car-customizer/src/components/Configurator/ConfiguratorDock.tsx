import React, { useState } from 'react';
import { CustomizerState, MaterialOption, ExteriorColorOption, ExteriorFinish } from '../../types/customizer';
import { CAR_BRANDS, YEARS, BODY_TYPES, getExteriorColorsForBrand, UNIVERSAL_EXTERIOR_COLORS } from '../../data/cars';
import { MATERIALS, COLOR_PALETTE, STITCH_COLORS, STITCH_PATTERNS, DESIGN_PRESETS } from '../../data/materials';
import {
  Car,
  Layers,
  Sparkles,
  Compass,
  Palette,
  Check,
  ShieldCheck,
  Activity,
  Sliders,
  Maximize,
  HelpCircle,
  ChevronDown,
  Search,
  Paintbrush,
  Eye,
  CheckCircle2,
  Wand2,
  BookmarkCheck,
} from 'lucide-react';

interface Props {
  state: CustomizerState;
  onChange: (updates: Partial<CustomizerState>) => void;
  onRequestQuote: () => void;
  activeSubTab?: string;
  onSubTabChange?: (tab: string) => void;
}

export const ConfiguratorDock: React.FC<Props> = ({
  state,
  onChange,
  onRequestQuote,
  activeSubTab = 'car',
  onSubTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<'car' | 'exterior' | 'seats' | 'stitching' | 'roof' | 'dashboard' | 'presets'>('car');
  const [brandSearch, setBrandSearch] = useState('');
  const [customExteriorHex, setCustomExteriorHex] = useState(state.exteriorColorHex || '#F5F6F8');

  // Handle external tab change if needed
  const currentTab = activeSubTab === 'exterior'
    ? 'exterior'
    : activeSubTab === 'seats-center' || activeSubTab === 'seats-bolster'
    ? 'seats'
    : activeSubTab === 'stitching'
    ? 'stitching'
    : activeSubTab === 'roof'
    ? 'roof'
    : activeSubTab === 'dashboard' || activeSubTab === 'steering' || activeSubTab === 'doors' || activeSubTab === 'floors'
    ? 'dashboard'
    : activeTab;

  const setTab = (tab: any) => {
    setActiveTab(tab);
    onSubTabChange?.(tab);
  };

  const filteredBrands = CAR_BRANDS.filter(
    (b) =>
      b.nameAr.includes(brandSearch) ||
      b.nameEn.toLowerCase().includes(brandSearch.toLowerCase()) ||
      b.popularModels.some((m) => m.toLowerCase().includes(brandSearch.toLowerCase()))
  );

  const selectedBrandObj = CAR_BRANDS.find((b) => b.nameAr === state.carBrand) || CAR_BRANDS[0];
  const brandExteriorColors = selectedBrandObj.exteriorColors || [];

  return (
    <div className="flex flex-col bg-[#11151e] border border-zinc-800/90 rounded-2xl shadow-2xl overflow-hidden">
      {/* Category Tabs Header */}
      <div className="flex items-center gap-1 p-2 bg-[#0d1017] border-b border-zinc-800/80 overflow-x-auto scrollbar-none">
        {[
          { id: 'car', label: 'السيارة والموديل', icon: Car },
          { id: 'exterior', label: 'اللون الخارجي', icon: Palette },
          { id: 'seats', label: 'الكراسي والخامات', icon: Layers },
          { id: 'stitching', label: 'الخيوط والتنجيد', icon: Sparkles },
          { id: 'roof', label: 'السقف والنجوم', icon: Compass },
          { id: 'dashboard', label: 'التابلوه والأبواب', icon: Sliders },
          { id: 'presets', label: 'أنماط جاهزة', icon: BookmarkCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-amber-500/80'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Body */}
      <div className="p-4 sm:p-6 max-h-[580px] overflow-y-auto space-y-6 text-right">
        {/* =========================================================================
            TAB 1: CAR & MODEL SELECTION
            ========================================================================= */}
        {currentTab === 'car' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">حدد ماركة وموديل سيارتك لتفصيل المقاسات بدقة</span>
                <span className="text-xs font-semibold text-amber-400">تغطية لجميع الموديلات</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">اختيار ماركة وموديل السيارة</h3>
            </div>

            {/* Custom Car Checkbox */}
            <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-200">سيارتي غير موجودة بالقائمة أو موديل خاص؟</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">يمكنك كتابة اسم الماركة والموديل وتفصيلها خصيصاً في ورشة كوبرا</div>
              </div>
              <button
                type="button"
                onClick={() => onChange({ isCustomCar: !state.isCustomCar })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  state.isCustomCar ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {state.isCustomCar ? 'مفعل (موديل يدوي)' : 'إدخال يدوي'}
              </button>
            </div>

            {state.isCustomCar ? (
              /* Custom Inputs */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-900/60 rounded-xl border border-amber-500/30">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">اسم الماركة (مثال: بروتون، ليفان، دايهاتسو، لادا...)</label>
                  <input
                    type="text"
                    value={state.customBrandName}
                    onChange={(e) => onChange({ customBrandName: e.target.value })}
                    placeholder="اكتب ماركة السيارة"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">اسم الموديل وسنة الصنع</label>
                  <input
                    type="text"
                    value={state.customModelName}
                    onChange={(e) => onChange({ customModelName: e.target.value })}
                    placeholder="مثال: واجا 2012 / بيك آب 2008"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ) : (
              /* Preset Brand Selector */
              <div className="space-y-4">
                {/* Search Brand */}
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="ابحث عن ماركة سيارتك (تويوتا، هيونداي، نيسان، رينو...)"
                    className="w-full pr-10 pl-4 py-2.5 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Brands Grid */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">الماركات الشائعة:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                    {filteredBrands.map((brand) => {
                      const isSelected = state.carBrand === brand.nameAr;
                      return (
                        <button
                          key={brand.id}
                          type="button"
                          onClick={() => {
                            onChange({
                              carBrand: brand.nameAr,
                              carModel: brand.popularModels[0] || '',
                            });
                          }}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                              : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/60'
                          }`}
                        >
                          <span className="text-xs font-bold">{brand.nameAr}</span>
                          <span className="text-[10px] text-zinc-400 font-mono">{brand.nameEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Model Selector based on brand */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">موديل السيارة:</label>
                    <div className="relative">
                      <select
                        value={state.carModel}
                        onChange={(e) => onChange({ carModel: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-xs appearance-none focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        {selectedBrandObj.popularModels.map((m) => (
                          <option key={m} value={m} className="bg-zinc-900 text-white">
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">سنة الصنع:</label>
                    <div className="relative">
                      <select
                        value={state.carYear}
                        onChange={(e) => onChange({ carYear: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-xs appearance-none focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y} className="bg-zinc-900 text-white">
                            {y}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Exterior Color Summary Card */}
            <div className="p-3.5 bg-zinc-900/90 rounded-2xl border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md shrink-0"
                  style={{ backgroundColor: state.exteriorColorHex }}
                />
                <div className="text-right">
                  <div className="text-xs font-bold text-white">اللون الخارجي: {state.exteriorColorName}</div>
                  <div className="text-[11px] text-zinc-400">
                    لمعان الطلاء: {state.exteriorFinish === 'pearl' ? 'لؤلؤي' : state.exteriorFinish === 'metallic' ? 'ميتاليك' : state.exteriorFinish === 'matte' ? 'مطفي فاخر' : 'لامع'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTab('exterior')}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                تغيير لون الطلاء ←
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: CAR EXTERIOR COLOR (ألوان الهيكل الخارجي ومستوى اللمعان)
            ========================================================================= */}
        {currentTab === 'exterior' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">ألوان المصنع والوكالة الرسمية لسيارات {selectedBrandObj.nameAr}</span>
                <button
                  type="button"
                  onClick={() => onChange({ activeView: 'exterior' })}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة الهيكل الخارجي</span>
                </button>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">طلاء الهيكل الخارجي للسيارة</h3>
              <p className="text-xs text-zinc-400 mt-1">
                اختر لون طلاء سيارتك الخارجي لمعاينة تناسق المقصورة والفرش الداخلي معه بدقة عالية.
              </p>
            </div>

            {/* Current Selected Exterior Color Banner */}
            <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg shrink-0 relative overflow-hidden"
                  style={{ backgroundColor: state.exteriorColorHex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400">اللون الخارجي الحالي:</div>
                  <div className="text-sm font-black text-white">{state.exteriorColorName}</div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    {state.exteriorFinish === 'pearl' ? '✨ لمعان لؤلؤي متعدد الطبقات' : state.exteriorFinish === 'metallic' ? '💎 ميتاليك كريستال' : state.exteriorFinish === 'matte' ? '🌑 طلاء مطفي (Matte Magno)' : '🌟 لامع صلب كلاسيكي'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onChange({ activeView: 'exterior' })}
                className="px-3 py-1.5 bg-amber-500 text-zinc-950 text-xs font-bold rounded-xl shadow-md hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap"
              >
                معاينة السيارة ←
              </button>
            </div>

            {/* SECTION 1: OFFICIAL BRAND OEM COLORS */}
            {brandExteriorColors.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-200">
                    ألوان المصنع والوكالة الرسمية لـ {selectedBrandObj.nameAr} ({brandExteriorColors.length} لون معتمد):
                  </label>
                  <span className="text-[11px] text-amber-400 font-semibold">{selectedBrandObj.nameEn} OEM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {brandExteriorColors.map((color) => {
                    const isSelected = state.exteriorColorHex.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => {
                          onChange({
                            exteriorColorHex: color.hex,
                            exteriorColorName: color.nameAr,
                            exteriorFinish: color.finish,
                          });
                        }}
                        className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/50 shadow-md'
                            : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-7 h-7 rounded-full border-2 border-white/20 shadow-sm shrink-0 relative overflow-hidden"
                            style={{ backgroundColor: color.hex }}
                          >
                            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
                          </span>
                          <div className="truncate">
                            <div className="text-xs font-bold text-white truncate">{color.nameAr}</div>
                            <div className="text-[10px] text-zinc-400 truncate">{color.nameEn}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {color.finishLabelAr}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 2: POPULAR UNIVERSAL EXTERIOR PAINTS */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-zinc-200">
                ألوان الهيكل الأكثر طلباً وشهرة في التعديل:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {UNIVERSAL_EXTERIOR_COLORS.map((col) => {
                  const isSelected = state.exteriorColorHex.toLowerCase() === col.hex.toLowerCase();
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => {
                        onChange({
                          exteriorColorHex: col.hex,
                          exteriorColorName: col.nameAr,
                          exteriorFinish: col.finish,
                        });
                      }}
                      className={`p-2.5 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 shadow-sm'
                          : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800/50'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/20 shrink-0 relative overflow-hidden shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                      </span>
                      <div className="truncate min-w-0">
                        <div className="text-[11px] font-bold text-white truncate">{col.nameAr.split(' ')[0]} {col.nameAr.split(' ')[1] || ''}</div>
                        <div className="text-[9px] text-zinc-400 truncate">{col.finishLabelAr}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: PAINT FINISH SELECTOR */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-zinc-200">
                مستوى ونوع لمعان الطلاء (Paint Finish):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'metallic', label: 'ميتاليك لامع', desc: 'كريستال براق' },
                  { id: 'pearl', label: 'لؤلؤي ناصع', desc: 'طبقات لؤلؤية' },
                  { id: 'gloss', label: 'لامع كلاسيكي', desc: 'صلب عاكس' },
                  { id: 'matte', label: 'مطفي فاخر', desc: 'Matte Magno' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onChange({ exteriorFinish: f.id as any })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      state.exteriorFinish === f.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{f.label}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 4: SMART COLOR HARMONY ADVISOR */}
            <div className="p-4 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 rounded-2xl border border-amber-500/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Wand2 className="w-4 h-4 text-amber-500" />
                <span>مستشار تناسق الفرش الداخلي مع طلاء سيارتك:</span>
              </div>

              {/* Dynamic recommendation text based on current color */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {state.exteriorColorHex.toLowerCase().includes('f5') ||
                state.exteriorColorHex.toLowerCase().includes('f6') ||
                state.exteriorColorHex.toLowerCase().includes('f7') ||
                state.exteriorColorHex.toLowerCase().includes('f8') ||
                state.exteriorColorHex.toLowerCase().includes('f9') ||
                state.exteriorColorHex.toLowerCase().includes('c0') ||
                state.exteriorColorHex.toLowerCase().includes('c2')
                  ? 'سيارتك ذات لون فاتح (أبيض أو فضي). أجمل وأفخم مقصورة تتألق معها هي المقاعد بلون "الجملي الصحراوي الكلاسيك" أو "الهافان" مع خيوط ذهبية وتطريز ماسي.'
                  : state.exteriorColorHex.toLowerCase().includes('11') ||
                    state.exteriorColorHex.toLowerCase().includes('12') ||
                    state.exteriorColorHex.toLowerCase().includes('0c') ||
                    state.exteriorColorHex.toLowerCase().includes('0f') ||
                    state.exteriorColorHex.toLowerCase().includes('10')
                  ? 'سيارتك ذات طلاء أسود ملكي فخم. تناسبها جداً المقصورة بلون "الأحمر البوردو العنابي" أو "الجملي النابا الملكي" لخلق تباين رياضي ساحر وفاره.'
                  : state.exteriorColorHex.toLowerCase().includes('74') ||
                    state.exteriorColorHex.toLowerCase().includes('7d') ||
                    state.exteriorColorHex.toLowerCase().includes('6b') ||
                    state.exteriorColorHex.toLowerCase().includes('4e')
                  ? 'سيارتك بلون رمادي ناردو جراي العصري. يناسبها جداً مقاعد جلد "أسود فحمي مع خياطة حمراء سبورت" أو فرش كامل بلون "أحمر فيراري سبورتس".'
                  : state.exteriorColorHex.toLowerCase().includes('15') ||
                    state.exteriorColorHex.toLowerCase().includes('1a') ||
                    state.exteriorColorHex.toLowerCase().includes('16') ||
                    state.exteriorColorHex.toLowerCase().includes('19') ||
                    state.exteriorColorHex.toLowerCase().includes('1e')
                  ? 'سيارتك بلون أزرق أو كحلي ملكي. توليفة "الجملي التان الدافئ" أو "الأوف وايت اللؤلؤي" تمنح كابينتك إحساس يخوت السوبر لاكشري.'
                  : 'لون طلاء سيارتك استثنائي وجريء. ننصح بمقصورة متوازنة بقلب جملي صحراوي أو أسود ملكي مع خياطة متناسقة.'}
              </p>

              {/* 1-Click Apply Recommended Harmony */}
              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const isDark = state.exteriorColorHex.toLowerCase().includes('11') || state.exteriorColorHex.toLowerCase().includes('12') || state.exteriorColorHex.toLowerCase().includes('0c');
                    const isGrey = state.exteriorColorHex.toLowerCase().includes('74') || state.exteriorColorHex.toLowerCase().includes('7d') || state.exteriorColorHex.toLowerCase().includes('6b');
                    
                    if (isGrey) {
                      onChange({
                        centerMaterialId: 'nappa-leather',
                        centerColorHex: '#18191c',
                        centerColorName: 'أسود فحمي ملكي',
                        bolsterColorHex: '#111215',
                        bolsterColorName: 'أسود فحمي ملكي',
                        stitchColorHex: '#dc2626',
                        stitchColorName: 'أحمر سبورتس ناري',
                        stitchPattern: 'diamond',
                        steeringCenterStripeHex: '#dc2626',
                        doorPanelColorHex: '#18191c',
                      });
                    } else if (isDark) {
                      onChange({
                        centerMaterialId: 'nappa-leather',
                        centerColorHex: '#7f1d1d',
                        centerColorName: 'أحمر بوردو عنابي ملكي',
                        bolsterColorHex: '#18191c',
                        bolsterColorName: 'أسود فحمي ملكي',
                        stitchColorHex: '#fef08a',
                        stitchColorName: 'ذهبي بيج عاجي',
                        stitchPattern: 'diamond',
                        doorPanelColorHex: '#7f1d1d',
                      });
                    } else {
                      onChange({
                        centerMaterialId: 'nappa-leather',
                        centerColorHex: '#b87d46',
                        centerColorName: 'جملي صحراوي كلاسيك',
                        bolsterColorHex: '#111215',
                        bolsterColorName: 'أسود فحمي ملكي',
                        stitchColorHex: '#eab308',
                        stitchColorName: 'ذهبي بيج عاجي',
                        stitchPattern: 'diamond',
                        doorPanelColorHex: '#b87d46',
                      });
                    }
                  }}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  ⚡ تطبيق التوليفة المثالية للفرش الداخلي بنقرة واحدة
                </button>
              </div>
            </div>

            {/* SECTION 5: CUSTOM HEX COLOR PICKER */}
            <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-zinc-200">لون خارجي مخصص بالكامل (Custom Color / Wrap):</div>
                <div className="text-[11px] text-zinc-400">للسيارات المعدلة بتجليد أو دهان مخصص</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="color"
                  value={state.exteriorColorHex}
                  onChange={(e) => {
                    onChange({
                      exteriorColorHex: e.target.value,
                      exteriorColorName: `لون مخصص (${e.target.value.toUpperCase()})`,
                    });
                  }}
                  className="w-9 h-9 rounded-lg border border-zinc-700 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-zinc-300 uppercase">{state.exteriorColorHex}</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: SEATS & MATERIALS
            ========================================================================= */}
        {currentTab === 'seats' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">تخصيص قلب وأجناب ومخادع الكراسي</span>
                <span className="text-xs font-semibold text-amber-400">خامات عالمية معتمدة</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">خامات وألوان المقاعد</h3>
            </div>

            {/* Center Cushion Material */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-zinc-200">
                1. نوع خامة قلب المقعد (Center Cushion Material):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MATERIALS.map((mat) => {
                  const isSelected = state.centerMaterialId === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => onChange({ centerMaterialId: mat.id })}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md'
                          : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-zinc-200'}`}>
                          {mat.nameAr}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-2">{mat.descriptionAr}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Cushion Color Palette */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-200">2. لون قلب المقعد:</label>
                <span className="text-xs font-semibold text-amber-300">{state.centerColorName}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {COLOR_PALETTE.map((c) => {
                  const isSelected = state.centerColorHex === c.hex;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onChange({ centerColorHex: c.hex, centerColorName: c.nameAr })}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 border-amber-500 scale-105'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full shadow-inner border border-white/20 flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className={`w-3.5 h-3.5 ${c.hex === '#edece8' ? 'text-zinc-950' : 'text-white'}`} />}
                      </span>
                      <span className="text-[10px] text-zinc-300 truncate w-full text-center">{c.nameAr.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bolster / Wings Color Palette */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-200">3. لون أجناب وأطراف المقعد (Bolsters):</label>
                <span className="text-xs font-semibold text-amber-300">{state.bolsterColorName}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {COLOR_PALETTE.map((c) => {
                  const isSelected = state.bolsterColorHex === c.hex;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onChange({ bolsterColorHex: c.hex, bolsterColorName: c.nameAr })}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 border-amber-500 scale-105'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full shadow-inner border border-white/20 flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className={`w-3.5 h-3.5 ${c.hex === '#edece8' ? 'text-zinc-950' : 'text-white'}`} />}
                      </span>
                      <span className="text-[10px] text-zinc-300 truncate w-full text-center">{c.nameAr.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Headrest Color Matching */}
            <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-200">لون مساند الرأس (Headrests)</div>
                <div className="text-[11px] text-zinc-400">يمكن مطابقتها مع الأجناب أو القلب</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ headrestColorHex: state.bolsterColorHex, headrestColorName: state.bolsterColorName })}
                  className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 cursor-pointer"
                >
                  مطابقة الأجناب
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ headrestColorHex: state.centerColorHex, headrestColorName: state.centerColorName })}
                  className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 cursor-pointer"
                >
                  مطابقة القلب
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: STITCHING, PATTERNS & FOAM
            ========================================================================= */}
        {currentTab === 'stitching' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">نقشات التطريز وألوان الخيوط الألمانية ودعامات الراحة</span>
                <span className="text-xs font-semibold text-amber-400">خياطة كمبيوتر فائقة الدقة</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">الخيوط والتطريز والتبطين</h3>
            </div>

            {/* Stitching Patterns */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-zinc-200">1. تصميم وتضريب المقعد (Stitch Pattern):</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STITCH_PATTERNS.map((p) => {
                  const isSelected = state.stitchPattern === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onChange({ stitchPattern: p.id })}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 shadow-md'
                          : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-zinc-200'}`}>
                          {p.nameAr}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400">{p.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stitch Colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-200">2. لون خيط الخياطة (Thread Color):</label>
                <span className="text-xs font-semibold text-amber-300">{state.stitchColorName}</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {STITCH_COLORS.map((sc) => {
                  const isSelected = state.stitchColorHex === sc.hex;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => onChange({ stitchColorHex: sc.hex, stitchColorName: sc.nameAr })}
                      className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 border-amber-500'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: sc.hex }}
                      />
                      <span className="text-[11px] text-zinc-300 truncate">{sc.nameAr.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Double stitch toggle */}
            <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-200">خياطة ألمانية مزدوجة (Double Stitch Accent)</div>
                <div className="text-[11px] text-zinc-400">إضافة خط خياطة إضافي موازي على جميع الحواف لزيادة متانة الفرش</div>
              </div>
              <input
                type="checkbox"
                checked={state.doubleStitchAccent}
                onChange={(e) => onChange({ doubleStitchAccent: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {/* Foam & Ergonomics */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-200">3. نوع الإسفنج والتبطين الطبي المقاوم للهبوط:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'standard', name: 'إسفنج فابريك قياسي متين' },
                  { id: 'high-density-45', name: 'إسفنج طبي ألماني كثافة 45 مقاوم للهبوط 5 سنوات' },
                  { id: 'memory-foam', name: 'طبقة ميموري فوم ناعمة لرحلات السفر الطويلة' },
                  { id: 'orthopedic-lumbar', name: 'دعامات جانبية للفقرات وأسفل الظهر' },
                ].map((foam) => (
                  <button
                    key={foam.id}
                    type="button"
                    onClick={() => onChange({ foamType: foam.id as any })}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer text-xs ${
                      state.foamType === foam.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {foam.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Laser Embossing on Headrests */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-200">4. حفر ليزر / تطريز شعار على مساند الرأس:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'بدون حفر (سادة)' },
                  { id: 'cobra-logo', label: 'شعار كوبرا ⚡' },
                  { id: 'car-brand-logo', label: 'شعار ماركة السيارة' },
                  { id: 'custom-initials', label: 'اسم العميل / حروف' },
                ].map((emb) => (
                  <button
                    key={emb.id}
                    type="button"
                    onClick={() => onChange({ embossingType: emb.id as any })}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                      state.embossingType === emb.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {emb.label}
                  </button>
                ))}
              </div>
              {state.embossingType === 'custom-initials' && (
                <div className="mt-2">
                  <input
                    type="text"
                    maxLength={10}
                    value={state.embossingText}
                    onChange={(e) => onChange({ embossingText: e.target.value })}
                    placeholder="اكتب اسمك أو حروفك الأولى (مثال: AHMED أو A.E)"
                    className="w-full px-3.5 py-2 bg-zinc-950 border border-amber-500/40 rounded-lg text-white text-xs text-center focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ROOF, PILLARS & STARLIGHT
            ========================================================================= */}
        {currentTab === 'roof' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">تجديد سقف السيارة والقوايم والشماسات ونظام النجوم</span>
                <span className="text-xs font-semibold text-amber-400">مظهر الرولز-رويس</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">سقف المقصورة والقوايم والنجوم</h3>
            </div>

            {/* Roof Material */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-zinc-200">1. خامة كسوة السقف والقوايم:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'alcantara', name: 'ألكانتارا / شامواه إيطالي', desc: 'الملمس الأكثر فخامة ونعومة، يمنح عزلاً صوتياً مبهراً' },
                  { id: 'fabric', name: 'قماش سقف فابريك أصلي', desc: 'قماش سقف مخصص مقاوم للحرارة لا يهبط أبداً' },
                  { id: 'leather', name: 'جلد منقوش أو نابا ناعم', desc: 'مظهر جريء وعصري سهل التنظيف بالمسح' },
                ].map((rm) => (
                  <button
                    key={rm.id}
                    type="button"
                    onClick={() => onChange({ roofMaterial: rm.id as any })}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      state.roofMaterial === rm.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1">{rm.name}</div>
                    <div className="text-[11px] text-zinc-400">{rm.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Roof Color */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-200">2. لون سقف المقصورة والقوايم:</label>
                <span className="text-xs font-semibold text-amber-300">{state.roofColorName}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {[
                  { hex: '#111215', name: 'أسود فحمي ملكي' },
                  { hex: '#262930', name: 'رمادي غامق جرافيت' },
                  { hex: '#d9cdb8', name: 'بيج عاجي دافئ' },
                  { hex: '#b87d46', name: 'جملي كونياك' },
                  { hex: '#991b1b', name: 'أحمر سبورت' },
                  { hex: '#1a273b', name: 'أزرق كحلي ليلي' },
                ].map((rc) => {
                  const isSelected = state.roofColorHex === rc.hex;
                  return (
                    <button
                      key={rc.hex}
                      type="button"
                      onClick={() => onChange({ roofColorHex: rc.hex, roofColorName: rc.name })}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected ? 'bg-zinc-800 border-amber-500' : 'bg-zinc-900/60 border-zinc-800'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: rc.hex }} />
                      <span className="text-[10px] text-zinc-300 truncate w-full text-center">{rc.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Starlight Option (Stars ceiling) */}
            <div className="p-4 bg-zinc-900/90 rounded-xl border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>سقف النجوم الليلية بالألياف الضوئية (Starlight Headliner)</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    تثبيت مئات الألياف الضوئية الدقيقة بالسقف مع ريموت تحكم لتغيير الإضاءة وسرعة الوميض
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={state.starlightEnabled}
                  onChange={(e) => onChange({ starlightEnabled: e.target.checked })}
                  className="w-5 h-5 accent-indigo-500 rounded cursor-pointer"
                />
              </div>

              {state.starlightEnabled && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
                  {[
                    { id: 'gentle', label: 'نجوم هادئة (300 نقطة)' },
                    { id: 'dense', label: 'سماء مكتملة (600 نقطة)' },
                    { id: 'shooting-star', label: 'شهاب متحرك Shooting Star' },
                  ].map((den) => (
                    <button
                      key={den.id}
                      type="button"
                      onClick={() => onChange({ starlightDensity: den.id as any })}
                      className={`p-2 rounded-lg text-[11px] font-semibold text-center border cursor-pointer ${
                        state.starlightDensity === den.id
                          ? 'bg-indigo-900/50 border-indigo-400 text-indigo-200'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {den.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: DASHBOARD, DOORS & DETAILS
            ========================================================================= */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">كسوة التابلوه وبطانات الأبواب وعجلة القيادة والأرضيات</span>
                <span className="text-xs font-semibold text-amber-400">تحول داخلي كامل 360°</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">التابلوه والأبواب وعجلة القيادة</h3>
            </div>

            {/* Dashboard Upper & Lower Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-200">التابلوه العلوي:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hex: '#111215', name: 'أسود' },
                    { hex: '#543621', name: 'تبغ' },
                    { hex: '#1a273b', name: 'كحلي' },
                    { hex: '#63676c', name: 'رمادي' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => onChange({ dashboardUpperColorHex: c.hex, dashboardUpperColorName: c.name })}
                      className={`p-2 rounded-lg border flex flex-col items-center gap-1 cursor-pointer ${
                        state.dashboardUpperColorHex === c.hex ? 'border-amber-500 bg-zinc-800' : 'border-zinc-800 bg-zinc-900'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] text-zinc-300">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-200">التابلوه السفلي ودرج التابلوه:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hex: '#111215', name: 'أسود' },
                    { hex: '#b87d46', name: 'جملي' },
                    { hex: '#d9cdb8', name: 'بيج' },
                    { hex: '#991b1b', name: 'أحمر' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => onChange({ dashboardLowerColorHex: c.hex, dashboardLowerColorName: c.name })}
                      className={`p-2 rounded-lg border flex flex-col items-center gap-1 cursor-pointer ${
                        state.dashboardLowerColorHex === c.hex ? 'border-amber-500 bg-zinc-800' : 'border-zinc-800 bg-zinc-900'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] text-zinc-300">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Door Panels 4 Doors */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-200">كسوة بطانات الأبواب الأربعة (Door Panels):</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {COLOR_PALETTE.slice(0, 6).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange({ doorPanelColorHex: c.hex, doorPanelColorName: c.nameAr })}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 cursor-pointer ${
                      state.doorPanelColorHex === c.hex ? 'border-amber-500 bg-zinc-800' : 'border-zinc-800 bg-zinc-900'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                    <span className="text-[10px] text-zinc-300 truncate w-full text-center">{c.nameAr.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Steering Wheel Wrap & 12 o'clock stripe */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-200">طارة الدركسيون (عجلة القيادة):</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-2">
                  <span className="text-xs text-zinc-300 font-semibold block">شريط السباقات العلوي (12 O'Clock Stripe):</span>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#dc2626', name: 'أحمر' },
                      { hex: '#f97316', name: 'برتقالي' },
                      { hex: '#eab308', name: 'أصفر' },
                      { hex: '#38bdf8', name: 'أزرق' },
                      { hex: '', name: 'بدون شريط' },
                    ].map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => onChange({ steeringCenterStripeHex: s.hex })}
                        className={`px-2.5 py-1 text-[11px] rounded-lg border cursor-pointer ${
                          state.steeringCenterStripeHex === s.hex ? 'border-amber-500 bg-zinc-800 text-white font-bold' : 'border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block">جلد مثقب مسامي على الأجناب</span>
                    <span className="text-[11px] text-zinc-400">لقبضة مريحة تمنع تعرق اليدين</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={state.steeringPerforatedSides}
                    onChange={(e) => onChange({ steeringPerforatedSides: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 7D Floor Mats */}
            <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-200">أرضيات ودواسات السيارة الجلدية 7D بالكامل</div>
                  <div className="text-[11px] text-zinc-400">عازلة للمياه والأتربة مع تطريز ماسي مقاوم للمسح</div>
                </div>
                <input
                  type="checkbox"
                  checked={state.floorMatsDiamondStitch}
                  onChange={(e) => onChange({ floorMatsDiamondStitch: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: PRESETS (1-CLICK INSPIRATION)
            ========================================================================= */}
        {currentTab === 'presets' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">توليفات ألوان وخامات مصممة بعناية فائقة بواسطة مهندسي كوبرا</span>
                <span className="text-xs font-semibold text-amber-400">تطبيق بنقرة واحدة</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">أنماط وتوليفات كوبرا الجاهزة</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DESIGN_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChange(preset.state)}
                  className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/80 hover:bg-zinc-800/40 text-right transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: preset.thumbnailColor1 }} />
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm -mr-2" style={{ backgroundColor: preset.thumbnailColor2 }} />
                      <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: preset.accentColor }} />
                    </div>
                    <span className="text-xs font-bold text-amber-400 group-hover:underline">تطبيق النمط ←</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {preset.nameAr}
                  </h4>
                  <p className="text-xs text-amber-200/80 font-medium mt-0.5">{preset.subtitleAr}</p>
                  <p className="text-[11px] text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dock Bottom Action Footer (STRICT NO-PRICES) */}
      <div className="p-4 bg-[#0d1017] border-t border-zinc-800/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-right">
            <div className="text-xs font-bold text-zinc-200">ضمان كوبرا الذهبي 3 سنوات</div>
            <div className="text-[11px] text-zinc-400">على ثبات الألوان، جودة الخياطة، وعدم تقشر الجلود</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onRequestQuote}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            طلب تفصيل ومعاينة مجانية ←
          </button>
        </div>
      </div>
    </div>
  );
};
