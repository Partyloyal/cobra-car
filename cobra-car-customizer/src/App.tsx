/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CustomizerState } from './types/customizer';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteriorVisualizer } from './components/Visualizer/InteriorVisualizer';
import { ConfiguratorDock } from './components/Configurator/ConfiguratorDock';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { Craftsmanship } from './components/Craftsmanship';
import { Gallery } from './components/Gallery';
import { Workshops } from './components/Workshops';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { Sparkles, Sliders, Layers, RefreshCw, BookmarkCheck } from 'lucide-react';

const INITIAL_CUSTOMIZER_STATE: CustomizerState = {
  carBrand: 'تويوتا',
  carModel: 'كورولا (Corolla)',
  carYear: '2024',
  bodyType: 'sedan',
  isCustomCar: false,
  customBrandName: '',
  customModelName: '',

  exteriorColorHex: '#F5F6F8',
  exteriorColorName: 'أبيض لؤلؤي بلاتينيوم',
  exteriorFinish: 'pearl',

  activeView: 'front-seats',
  ambientLight: 'amber-orange',
  isNightMode: false,

  centerMaterialId: 'nappa-leather',
  centerColorHex: '#b87d46',
  centerColorName: 'جملي صحراوي كلاسيك',

  bolsterMaterialId: 'german-leather',
  bolsterColorHex: '#111215',
  bolsterColorName: 'أسود فحمي ملكي',

  headrestColorHex: '#111215',
  headrestColorName: 'أسود فحمي ملكي',

  stitchPattern: 'diamond',
  stitchColorHex: '#eab308',
  stitchColorName: 'ذهبي بيج عاجي',
  doubleStitchAccent: true,

  foamType: 'high-density-45',
  hasLumbarSupport: true,

  roofMaterial: 'alcantara',
  roofColorHex: '#111215',
  roofColorName: 'أسود فحمي ملكي',
  starlightEnabled: false,
  starlightDensity: 'gentle',

  dashboardUpperColorHex: '#111215',
  dashboardUpperColorName: 'أسود فحمي ملكي',
  dashboardLowerColorHex: '#b87d46',
  dashboardLowerColorName: 'جملي صحراوي كلاسيك',
  doorPanelColorHex: '#b87d46',
  doorPanelColorName: 'جملي صحراوي كلاسيك',

  steeringWheelColorHex: '#111215',
  steeringWheelColorName: 'أسود فحمي ملكي',
  steeringCenterStripeHex: '#dc2626',
  steeringPerforatedSides: true,
  gearBootMatching: true,

  floorMatsColorHex: '#111215',
  floorMatsDiamondStitch: true,

  embossingText: 'COBRA',
  embossingType: 'cobra-logo',
};

export default function App() {
  const [state, setState] = useState<CustomizerState>(INITIAL_CUSTOMIZER_STATE);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('car');

  const handleUpdate = (updates: Partial<CustomizerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMaterialFromShowcase = (materialId: string) => {
    handleUpdate({ centerMaterialId: materialId });
    handleScrollTo('configurator-section');
    setActiveSubTab('seats-center');
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Navbar with 3-zone contract */}
      <Navbar
        onOpenBooking={() => setIsOrderModalOpen(true)}
        onScrollTo={handleScrollTo}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartCustomizing={() => handleScrollTo('configurator-section')}
          onExploreMaterials={() => handleScrollTo('materials-section')}
        />

        {/* =========================================================================
            CORE INTERACTIVE CONFIGURATOR STUDIO SECTION
            ========================================================================= */}
        <section id="configurator-section" className="py-12 sm:py-20 bg-[#0b0e15] border-b border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Lead-in */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-right">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>استوديو التخصيص التفاعلي ثلاثي الأبعاد</span>
                  <span aria-hidden="true">·</span>
                  <span>معاينة فورية بالكامل</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  صمم مقصورة سيارتك الخاصة مع كوبرا
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                  غيّر خامات وألوان الكراسي، الخيوط والتطريز، السقف مع النجوم، والتابلوه والأبواب مباشرةً.
                  انقر على أي جزء في السيارة لمعاينته وتعديله فوراً.
                </p>
              </div>

              {/* Reset Customization Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setState(INITIAL_CUSTOMIZER_STATE)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
                  title="استعادة الإعدادات الافتراضية"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط التصميم</span>
                </button>
              </div>
            </div>

            {/* Configurator Workspace Grid (Visualizer + Dock) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left / Center Visualizer Column (7 Cols on desktop) */}
              <div className="lg:col-span-7 space-y-4">
                <InteriorVisualizer
                  state={state}
                  onChange={handleUpdate}
                  onSelectTab={(tab) => setActiveSubTab(tab)}
                />

                {/* Quick Spec Highlights Bar under Visualizer */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80 text-right">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">السيارة الحالية</span>
                    <span className="text-xs font-bold text-zinc-200 truncate block">
                      {state.isCustomCar
                        ? state.customBrandName || 'سيارة مخصصة'
                        : `${state.carBrand} ${state.carModel}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">اللون الخارجي</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="w-3 h-3 rounded-full border border-white/20 shadow-xs shrink-0"
                        style={{ backgroundColor: state.exteriorColorHex }}
                      />
                      <span className="text-xs font-bold text-zinc-200 truncate">{state.exteriorColorName.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">قلب الكراسي</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: state.centerColorHex }} />
                      <span className="text-xs font-bold text-zinc-200 truncate">{state.centerColorName.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">التطريز</span>
                    <span className="text-xs font-bold text-zinc-200 truncate block">
                      {state.stitchColorName.split(' ')[0]} ({state.stitchPattern === 'diamond' ? 'ماسي' : state.stitchPattern === 'ribbed' ? 'مضلع' : 'أملس'})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">سقف المقصورة</span>
                    <span className="text-xs font-bold text-zinc-200 truncate block">
                      {state.roofColorName.split(' ')[0]} {state.starlightEnabled ? '(مع نجوم)' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Configurator Dock Column (5 Cols on desktop) */}
              <div className="lg:col-span-5">
                <ConfiguratorDock
                  state={state}
                  onChange={handleUpdate}
                  onRequestQuote={() => setIsOrderModalOpen(true)}
                  activeSubTab={activeSubTab}
                  onSubTabChange={(tab) => setActiveSubTab(tab)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Materials Showcase Section */}
        <MaterialsShowcase onSelectMaterial={handleSelectMaterialFromShowcase} />

        {/* Craftsmanship Standards */}
        <Craftsmanship />

        {/* Gallery Transformations */}
        <Gallery />

        {/* Workshops & Contact */}
        <Workshops onOpenBooking={() => setIsOrderModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Order & Specification Review Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        state={state}
      />
    </div>
  );
}
