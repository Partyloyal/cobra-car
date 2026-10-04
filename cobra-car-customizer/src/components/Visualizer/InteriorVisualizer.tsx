import React, { useState } from 'react';
import { CustomizerState, InteriorView } from '../../types/customizer';
import { Eye, Sun, Moon, Sparkles, Layers, Maximize2, Minimize2, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface Props {
  state: CustomizerState;
  onChange: (updates: Partial<CustomizerState>) => void;
  onSelectTab?: (tab: string) => void;
}

export const InteriorVisualizer: React.FC<Props> = ({ state, onChange, onSelectTab }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const getAmbientFilter = () => {
    if (state.ambientLight === 'off') return 'none';
    switch (state.ambientLight) {
      case 'ice-blue':
        return 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.45))';
      case 'amber-orange':
        return 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.45))';
      case 'crimson':
        return 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.45))';
      case 'neon-purple':
        return 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.45))';
      case 'warm-white':
        return 'drop-shadow(0 0 15px rgba(254, 243, 199, 0.35))';
      default:
        return 'none';
    }
  };

  const getAmbientColor = () => {
    switch (state.ambientLight) {
      case 'ice-blue': return '#38bdf8';
      case 'amber-orange': return '#f59e0b';
      case 'crimson': return '#ef4444';
      case 'neon-purple': return '#c084fc';
      case 'warm-white': return '#fef08a';
      default: return 'transparent';
    }
  };

  return (
    <div className={`relative flex flex-col rounded-2xl bg-[#0f131a] border border-zinc-800/80 overflow-hidden shadow-2xl transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 bg-[#0c0f14]' : 'w-full'}`}>
      {/* Top Visualizer Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#131822]/90 border-b border-zinc-800 backdrop-blur-sm z-10">
        {/* View switcher buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800/80 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => onChange({ activeView: 'front-seats' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              state.activeView === 'front-seats'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            المقاعد الأمامية
          </button>
          <button
            type="button"
            onClick={() => onChange({ activeView: 'dashboard' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              state.activeView === 'dashboard'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            التابلوه والدركسيون
          </button>
          <button
            type="button"
            onClick={() => onChange({ activeView: 'roof' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              state.activeView === 'roof'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            سقف المقصورة والنجوم
          </button>
          <button
            type="button"
            onClick={() => onChange({ activeView: 'rear-cabin' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              state.activeView === 'rear-cabin'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            الكنبة الخلفية والأبواب
          </button>
          <button
            type="button"
            onClick={() => onChange({ activeView: 'exterior' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              state.activeView === 'exterior'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-xs shrink-0"
              style={{ backgroundColor: state.exteriorColorHex }}
            />
            <span>الهيكل الخارجي والمطابقة</span>
          </button>
        </div>

        {/* Ambient & View controls */}
        <div className="flex items-center gap-2">
          {/* Day / Night mode */}
          <button
            type="button"
            onClick={() => onChange({ isNightMode: !state.isNightMode })}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              state.isNightMode
                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
                : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800'
            }`}
            title="تبديل إضاءة المقصورة (نهار / ليل)"
          >
            {state.isNightMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>{state.isNightMode ? 'وضع ليلي' : 'وضع نهاري'}</span>
          </button>

          {/* Ambient Lighting Quick Toggle */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-zinc-900/80 rounded-lg border border-zinc-800">
            <span className="text-[11px] text-zinc-400 ml-1">إضاءة محيطية:</span>
            {[
              { id: 'off', bg: '#27272a', name: 'إيقاف' },
              { id: 'ice-blue', bg: '#38bdf8', name: 'أزرق جليدي' },
              { id: 'amber-orange', bg: '#f59e0b', name: 'كهرماني' },
              { id: 'crimson', bg: '#ef4444', name: 'أحمر سبورت' },
              { id: 'neon-purple', bg: '#c084fc', name: 'أرجواني' },
            ].map((amb) => (
              <button
                key={amb.id}
                type="button"
                onClick={() => onChange({ ambientLight: amb.id as any })}
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                  state.ambientLight === amb.id ? 'ring-2 ring-white scale-125' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: amb.bg }}
                title={amb.name}
              />
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded cursor-pointer"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded cursor-pointer"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded cursor-pointer"
              title="إعادة ضبط الحجم"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-lg border border-zinc-800 cursor-pointer"
            title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div
        className={`relative flex items-center justify-center p-4 sm:p-8 min-h-[460px] md:min-h-[540px] overflow-hidden select-none transition-colors duration-500 ${
          state.isNightMode ? 'bg-[#06080c]' : 'bg-[#0d1017]'
        }`}
      >
        {/* Dynamic Studio Ambient Glow */}
        {state.ambientLight !== 'off' && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${getAmbientColor()}44 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Backdrop Ambient lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#383e4a_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Live Hover Tag */}
        {hoveredPart && (
          <div className="absolute top-4 left-6 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 bg-zinc-900/95 border border-amber-500/40 rounded-lg shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold text-amber-200">{hoveredPart}</span>
            <span className="text-[10px] text-zinc-400">انقر للتعديل</span>
          </div>
        )}

        {/* Car spec badge pinned inside preview */}
        <div className="absolute bottom-4 right-6 z-20 pointer-events-none bg-zinc-950/80 border border-zinc-800/80 rounded-xl px-3.5 py-2 backdrop-blur-md">
          <div className="text-[11px] text-zinc-400 font-medium">السيارة المختارة</div>
          <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
            {state.isCustomCar
              ? `${state.customBrandName || 'سيارة مخصصة'} - ${state.customModelName || 'موديل خاص'}`
              : `${state.carBrand} ${state.carModel}`} <span className="text-amber-400 font-mono text-xs">({state.carYear})</span>
          </div>
        </div>

        {/* View indicator badge */}
        <div className="absolute bottom-4 left-6 z-20 pointer-events-none bg-zinc-950/80 border border-zinc-800/80 rounded-xl px-3 py-1.5 backdrop-blur-md hidden sm:flex items-center gap-2">
          <span className="text-[11px] text-zinc-400">المنظور:</span>
          <span className="text-xs font-semibold text-zinc-200">
            {state.activeView === 'front-seats' && 'المقاعد الأمامية والكونسول'}
            {state.activeView === 'dashboard' && 'التابلوه وعجلة القيادة'}
            {state.activeView === 'roof' && 'سقف المقصورة والتطريز'}
            {state.activeView === 'rear-cabin' && 'الصالون الخلفي والأبواب'}
            {state.activeView === 'exterior' && 'الهيكل الخارجي ومطابقة الفرش مع الطلاء'}
          </span>
        </div>

        {/* SVG Container with Zoom */}
        <div
          className="relative w-full max-w-[850px] aspect-[16/11] flex items-center justify-center transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel})`,
            filter: getAmbientFilter(),
          }}
        >
          {state.activeView === 'front-seats' && (
            <FrontSeatsSVG
              state={state}
              onPartHover={setHoveredPart}
              onPartClick={(part) => {
                if (part.includes('قلب')) onSelectTab?.('seats-center');
                else if (part.includes('أجناب')) onSelectTab?.('seats-bolster');
                else if (part.includes('خيوط')) onSelectTab?.('stitching');
                else if (part.includes('كونسول')) onSelectTab?.('dashboard');
              }}
            />
          )}

          {state.activeView === 'dashboard' && (
            <DashboardSVG
              state={state}
              onPartHover={setHoveredPart}
              onPartClick={(part) => {
                if (part.includes('دركسيون')) onSelectTab?.('steering');
                else if (part.includes('تابلوه')) onSelectTab?.('dashboard');
              }}
            />
          )}

          {state.activeView === 'roof' && (
            <RoofHeadlinerSVG
              state={state}
              onPartHover={setHoveredPart}
              onPartClick={() => onSelectTab?.('roof')}
            />
          )}

          {state.activeView === 'rear-cabin' && (
            <RearCabinSVG
              state={state}
              onPartHover={setHoveredPart}
              onPartClick={(part) => {
                if (part.includes('أبواب')) onSelectTab?.('doors');
                else if (part.includes('أرضيات')) onSelectTab?.('floors');
                else onSelectTab?.('seats-center');
              }}
            />
          )}

          {state.activeView === 'exterior' && (
            <ExteriorCarSVG
              state={state}
              onPartHover={setHoveredPart}
              onPartClick={(part) => {
                if (part.includes('خارجي') || part.includes('طلاء') || part.includes('هيكل')) onSelectTab?.('exterior');
                else if (part.includes('كراسي') || part.includes('فرش')) onSelectTab?.('seats-center');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   1. FRONT SEATS & CONSOLE SVG VIEW
   ========================================================================= */
const FrontSeatsSVG: React.FC<{
  state: CustomizerState;
  onPartHover: (label: string | null) => void;
  onPartClick: (label: string) => void;
}> = ({ state, onPartHover, onPartClick }) => {
  const centerFill = state.centerColorHex;
  const bolsterFill = state.bolsterColorHex;
  const headrestFill = state.headrestColorHex;
  const stitchStroke = state.stitchColorHex;
  const ambientStroke = state.ambientLight !== 'off' ? '#f59e0b' : '#334155';

  return (
    <svg viewBox="0 0 900 620" className="w-full h-full drop-shadow-2xl">
      <defs>
        {/* Leather texture filters */}
        <filter id="leatherShading" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodOpacity="0.35" floodColor="#000" />
        </filter>
        <radialGradient id="seatGradientCenter" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </radialGradient>
        <linearGradient id="bolsterGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="bolsterGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </linearGradient>

        {/* Diamond stitch pattern */}
        <pattern id="diamondPattern" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M 14,0 L 28,14 L 14,28 L 0,14 Z"
            fill="none"
            stroke={stitchStroke}
            strokeWidth="1.2"
            strokeDasharray="2,2"
            opacity="0.8"
          />
        </pattern>

        {/* Ribbed fluted pattern */}
        <pattern id="ribbedPattern" width="100" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="10" x2="100" y2="10" stroke={stitchStroke} strokeWidth="1.4" strokeDasharray="3,1" opacity="0.85" />
          <line x1="0" y1="12" x2="100" y2="12" stroke="#000000" strokeWidth="0.8" opacity="0.4" />
        </pattern>

        {/* Honeycomb pattern */}
        <pattern id="honeycombPattern" width="24" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 12,0 L 24,7 L 24,20 L 12,27 L 0,20 L 0,7 Z"
            fill="none"
            stroke={stitchStroke}
            strokeWidth="1.1"
            strokeDasharray="2,2"
            opacity="0.8"
          />
          <path
            d="M 12,40 L 24,33 L 24,20 L 12,27 L 0,20 L 0,33 Z"
            fill="none"
            stroke={stitchStroke}
            strokeWidth="1.1"
            strokeDasharray="2,2"
            opacity="0.8"
          />
        </pattern>

        {/* Perforated leather pattern */}
        <pattern id="perforatedPattern" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.8" fill="#000000" opacity="0.45" />
        </pattern>
      </defs>

      {/* Car Interior Background: Windshield silhouette & Pillars */}
      <rect x="50" y="30" width="800" height="560" rx="30" fill="#0b0e14" />
      {/* Front Windshield view (subtle street horizon) */}
      <path d="M 120,60 L 780,60 L 830,220 L 70,220 Z" fill="#0e131d" stroke="#1a2230" strokeWidth="2" />
      <line x1="70" y1="180" x2="830" y2="180" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6,4" />

      {/* Dashboard Top Silhouette */}
      <path
        d="M 60,210 Q 450,195 840,210 L 860,265 Q 450,250 40,265 Z"
        fill={state.dashboardUpperColorHex}
        stroke="#18202d"
        strokeWidth="2"
      />

      {/* Ambient Neon Strip on Dashboard */}
      {state.ambientLight !== 'off' && (
        <path
          d="M 75,235 Q 450,220 825,235"
          fill="none"
          stroke={
            state.ambientLight === 'ice-blue' ? '#38bdf8' :
            state.ambientLight === 'amber-orange' ? '#f59e0b' :
            state.ambientLight === 'crimson' ? '#ef4444' :
            state.ambientLight === 'neon-purple' ? '#c084fc' : '#fef08a'
          }
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-all duration-300"
          style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
        />
      )}

      {/* Center Console & Armrest */}
      <g
        className="cursor-pointer transition-transform hover:opacity-95"
        onMouseEnter={() => onPartHover('الكونسول ومسند اليد')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('كونسول')}
      >
        <path d="M 405,310 L 495,310 L 525,580 L 375,580 Z" fill="#131720" stroke="#222b3b" strokeWidth="2" />
        {/* Armrest Cushion */}
        <rect x="400" y="440" width="100" height="135" rx="14" fill={bolsterFill} stroke={stitchStroke} strokeWidth="1.5" />
        <rect x="400" y="440" width="100" height="135" rx="14" fill="url(#seatGradientCenter)" />
        {/* Stitching on armrest */}
        <line x1="412" y1="445" x2="412" y2="565" stroke={stitchStroke} strokeWidth="1.4" strokeDasharray="3,2" />
        <line x1="488" y1="445" x2="488" y2="565" stroke={stitchStroke} strokeWidth="1.4" strokeDasharray="3,2" />
      </g>

      {/* LEFT SEAT (Driver / Passenger) */}
      <g id="leftSeat" className="cursor-pointer">
        {/* Seat Backrest Outer Bolsters */}
        <path
          d="M 120,220 Q 90,340 105,450 L 160,455 Q 145,350 165,225 Z"
          fill={bolsterFill}
          stroke="#1a1c22"
          strokeWidth="1.5"
          onMouseEnter={() => onPartHover('أجناب المقعد (Bolsters)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('أجناب المقعد')}
        />
        <path d="M 120,220 Q 90,340 105,450 L 160,455 Q 145,350 165,225 Z" fill="url(#bolsterGradientLeft)" />

        <path
          d="M 330,220 Q 360,340 345,450 L 290,455 Q 305,350 285,225 Z"
          fill={bolsterFill}
          stroke="#1a1c22"
          strokeWidth="1.5"
          onMouseEnter={() => onPartHover('أجناب المقعد (Bolsters)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('أجناب المقعد')}
        />
        <path d="M 330,220 Q 360,340 345,450 L 290,455 Q 305,350 285,225 Z" fill="url(#bolsterGradientRight)" />

        {/* Seat Backrest Center Insert */}
        <path
          d="M 165,220 L 285,220 Q 295,340 288,445 L 162,445 Q 155,340 165,220 Z"
          fill={centerFill}
          stroke="#1c202a"
          strokeWidth="1.5"
          onMouseEnter={() => onPartHover('قلب المقعد (Center Cushion)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('قلب المقعد')}
        />
        {/* Pattern overlay on center insert */}
        {state.stitchPattern === 'diamond' && (
          <path
            d="M 165,220 L 285,220 Q 295,340 288,445 L 162,445 Q 155,340 165,220 Z"
            fill="url(#diamondPattern)"
            opacity="0.8"
            pointerEvents="none"
          />
        )}
        {state.stitchPattern === 'ribbed' && (
          <path
            d="M 165,220 L 285,220 Q 295,340 288,445 L 162,445 Q 155,340 165,220 Z"
            fill="url(#ribbedPattern)"
            opacity="0.85"
            pointerEvents="none"
          />
        )}
        {state.stitchPattern === 'honeycomb' && (
          <path
            d="M 165,220 L 285,220 Q 295,340 288,445 L 162,445 Q 155,340 165,220 Z"
            fill="url(#honeycombPattern)"
            opacity="0.8"
            pointerEvents="none"
          />
        )}
        {state.centerMaterialId === 'perforated-sport' && (
          <path
            d="M 165,220 L 285,220 Q 295,340 288,445 L 162,445 Q 155,340 165,220 Z"
            fill="url(#perforatedPattern)"
            opacity="0.75"
            pointerEvents="none"
          />
        )}
        <path d="M 165,220 L 285,220 Q 295,340 288,445 L 162,445 Q 155,340 165,220 Z" fill="url(#seatGradientCenter)" pointerEvents="none" />

        {/* Stitching Lines across Left Center Back */}
        <path d="M 168,222 Q 158,340 165,443" fill="none" stroke={stitchStroke} strokeWidth="1.6" strokeDasharray="3,2" />
        <path d="M 282,222 Q 292,340 285,443" fill="none" stroke={stitchStroke} strokeWidth="1.6" strokeDasharray="3,2" />
        {state.doubleStitchAccent && (
          <>
            <path d="M 172,223 Q 162,340 169,443" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.8" />
            <path d="M 278,223 Q 288,340 281,443" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.8" />
          </>
        )}

        {/* Headrest */}
        <g
          onMouseEnter={() => onPartHover('مخدع الرأس (Headrest)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('مخدع الرأس')}
        >
          {/* Headrest Chrome Struts */}
          <rect x="200" y="200" width="8" height="25" fill="#a1a1aa" rx="2" />
          <rect x="242" y="200" width="8" height="25" fill="#a1a1aa" rx="2" />
          <rect x="180" y="125" width="90" height="85" rx="18" fill={headrestFill} stroke="#1b1e25" strokeWidth="1.5" />
          <rect x="180" y="125" width="90" height="85" rx="18" fill="url(#seatGradientCenter)" />
          {/* Headrest stitch border */}
          <rect x="186" y="131" width="78" height="73" rx="14" fill="none" stroke={stitchStroke} strokeWidth="1.3" strokeDasharray="3,2" />
          {/* Custom Embossing if selected */}
          {state.embossingType === 'cobra-logo' && (
            <text x="225" y="172" textAnchor="middle" fill={stitchStroke} fontSize="14" fontWeight="bold" fontFamily="sans-serif" opacity="0.85">
              ⚡ COBRA
            </text>
          )}
          {state.embossingType === 'custom-initials' && state.embossingText && (
            <text x="225" y="172" textAnchor="middle" fill={stitchStroke} fontSize="15" fontWeight="900" fontFamily="sans-serif" opacity="0.9">
              {state.embossingText.toUpperCase().slice(0, 4)}
            </text>
          )}
          {state.embossingType === 'car-brand-logo' && (
            <text x="225" y="172" textAnchor="middle" fill={stitchStroke} fontSize="11" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">
              ★ {state.carBrand || 'VIP'} ★
            </text>
          )}
        </g>

        {/* Seat Bottom Cushion */}
        <g
          onMouseEnter={() => onPartHover('قاعدة الجلوس السفلية')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('قلب المقعد')}
        >
          {/* Bolsters bottom */}
          <path d="M 95,455 Q 85,550 115,570 L 165,565 Q 145,510 155,455 Z" fill={bolsterFill} stroke="#171920" strokeWidth="1.5" />
          <path d="M 355,455 Q 365,550 335,570 L 285,565 Q 305,510 295,455 Z" fill={bolsterFill} stroke="#171920" strokeWidth="1.5" />
          {/* Center base cushion */}
          <path d="M 155,455 L 295,455 L 285,565 L 165,565 Z" fill={centerFill} stroke="#171920" strokeWidth="1.5" />
          {state.stitchPattern === 'diamond' && (
            <path d="M 155,455 L 295,455 L 285,565 L 165,565 Z" fill="url(#diamondPattern)" opacity="0.8" pointerEvents="none" />
          )}
          {state.stitchPattern === 'ribbed' && (
            <path d="M 155,455 L 295,455 L 285,565 L 165,565 Z" fill="url(#ribbedPattern)" opacity="0.85" pointerEvents="none" />
          )}
          {state.stitchPattern === 'honeycomb' && (
            <path d="M 155,455 L 295,455 L 285,565 L 165,565 Z" fill="url(#honeycombPattern)" opacity="0.8" pointerEvents="none" />
          )}
          <path d="M 155,455 L 295,455 L 285,565 L 165,565 Z" fill="url(#seatGradientCenter)" pointerEvents="none" />
          <line x1="168" y1="460" x2="175" y2="560" stroke={stitchStroke} strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="282" y1="460" x2="275" y2="560" stroke={stitchStroke} strokeWidth="1.5" strokeDasharray="3,2" />
        </g>
      </g>

      {/* RIGHT SEAT (Mirror identical high-detail) */}
      <g id="rightSeat" className="cursor-pointer">
        {/* Bolsters */}
        <path
          d="M 570,220 Q 540,340 555,450 L 610,455 Q 595,350 615,225 Z"
          fill={bolsterFill}
          stroke="#1a1c22"
          strokeWidth="1.5"
          onMouseEnter={() => onPartHover('أجناب المقعد (Bolsters)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('أجناب المقعد')}
        />
        <path d="M 570,220 Q 540,340 555,450 L 610,455 Q 595,350 615,225 Z" fill="url(#bolsterGradientLeft)" />

        <path
          d="M 780,220 Q 810,340 795,450 L 740,455 Q 755,350 735,225 Z"
          fill={bolsterFill}
          stroke="#1a1c22"
          strokeWidth="1.5"
          onMouseEnter={() => onPartHover('أجناب المقعد (Bolsters)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('أجناب المقعد')}
        />
        <path d="M 780,220 Q 810,340 795,450 L 740,455 Q 755,350 735,225 Z" fill="url(#bolsterGradientRight)" />

        {/* Seat Backrest Center Insert */}
        <path
          d="M 615,220 L 735,220 Q 745,340 738,445 L 612,445 Q 605,340 615,220 Z"
          fill={centerFill}
          stroke="#1c202a"
          strokeWidth="1.5"
          onMouseEnter={() => onPartHover('قلب المقعد (Center Cushion)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('قلب المقعد')}
        />
        {state.stitchPattern === 'diamond' && (
          <path d="M 615,220 L 735,220 Q 745,340 738,445 L 612,445 Q 605,340 615,220 Z" fill="url(#diamondPattern)" opacity="0.8" pointerEvents="none" />
        )}
        {state.stitchPattern === 'ribbed' && (
          <path d="M 615,220 L 735,220 Q 745,340 738,445 L 612,445 Q 605,340 615,220 Z" fill="url(#ribbedPattern)" opacity="0.85" pointerEvents="none" />
        )}
        {state.stitchPattern === 'honeycomb' && (
          <path d="M 615,220 L 735,220 Q 745,340 738,445 L 612,445 Q 605,340 615,220 Z" fill="url(#honeycombPattern)" opacity="0.8" pointerEvents="none" />
        )}
        {state.centerMaterialId === 'perforated-sport' && (
          <path d="M 615,220 L 735,220 Q 745,340 738,445 L 612,445 Q 605,340 615,220 Z" fill="url(#perforatedPattern)" opacity="0.75" pointerEvents="none" />
        )}
        <path d="M 615,220 L 735,220 Q 745,340 738,445 L 612,445 Q 605,340 615,220 Z" fill="url(#seatGradientCenter)" pointerEvents="none" />

        {/* Stitching Lines across Right Center Back */}
        <path d="M 618,222 Q 608,340 615,443" fill="none" stroke={stitchStroke} strokeWidth="1.6" strokeDasharray="3,2" />
        <path d="M 732,222 Q 742,340 735,443" fill="none" stroke={stitchStroke} strokeWidth="1.6" strokeDasharray="3,2" />
        {state.doubleStitchAccent && (
          <>
            <path d="M 622,223 Q 612,340 619,443" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.8" />
            <path d="M 728,223 Q 738,340 731,443" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.8" />
          </>
        )}

        {/* Headrest */}
        <g
          onMouseEnter={() => onPartHover('مخدع الرأس (Headrest)')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('مخدع الرأس')}
        >
          <rect x="650" y="200" width="8" height="25" fill="#a1a1aa" rx="2" />
          <rect x="692" y="200" width="8" height="25" fill="#a1a1aa" rx="2" />
          <rect x="630" y="125" width="90" height="85" rx="18" fill={headrestFill} stroke="#1b1e25" strokeWidth="1.5" />
          <rect x="630" y="125" width="90" height="85" rx="18" fill="url(#seatGradientCenter)" />
          <rect x="636" y="131" width="78" height="73" rx="14" fill="none" stroke={stitchStroke} strokeWidth="1.3" strokeDasharray="3,2" />
          {state.embossingType === 'cobra-logo' && (
            <text x="675" y="172" textAnchor="middle" fill={stitchStroke} fontSize="14" fontWeight="bold" fontFamily="sans-serif" opacity="0.85">
              ⚡ COBRA
            </text>
          )}
          {state.embossingType === 'custom-initials' && state.embossingText && (
            <text x="675" y="172" textAnchor="middle" fill={stitchStroke} fontSize="15" fontWeight="900" fontFamily="sans-serif" opacity="0.9">
              {state.embossingText.toUpperCase().slice(0, 4)}
            </text>
          )}
          {state.embossingType === 'car-brand-logo' && (
            <text x="675" y="172" textAnchor="middle" fill={stitchStroke} fontSize="11" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">
              ★ {state.carBrand || 'VIP'} ★
            </text>
          )}
        </g>

        {/* Seat Bottom Cushion */}
        <g
          onMouseEnter={() => onPartHover('قاعدة الجلوس السفلية')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('قلب المقعد')}
        >
          <path d="M 545,455 Q 535,550 565,570 L 615,565 Q 595,510 605,455 Z" fill={bolsterFill} stroke="#171920" strokeWidth="1.5" />
          <path d="M 805,455 Q 815,550 785,570 L 735,565 Q 755,510 745,455 Z" fill={bolsterFill} stroke="#171920" strokeWidth="1.5" />
          <path d="M 605,455 L 745,455 L 735,565 L 615,565 Z" fill={centerFill} stroke="#171920" strokeWidth="1.5" />
          {state.stitchPattern === 'diamond' && (
            <path d="M 605,455 L 745,455 L 735,565 L 615,565 Z" fill="url(#diamondPattern)" opacity="0.8" pointerEvents="none" />
          )}
          {state.stitchPattern === 'ribbed' && (
            <path d="M 605,455 L 745,455 L 735,565 L 615,565 Z" fill="url(#ribbedPattern)" opacity="0.85" pointerEvents="none" />
          )}
          {state.stitchPattern === 'honeycomb' && (
            <path d="M 605,455 L 745,455 L 735,565 L 615,565 Z" fill="url(#honeycombPattern)" opacity="0.8" pointerEvents="none" />
          )}
          <path d="M 605,455 L 745,455 L 735,565 L 615,565 Z" fill="url(#seatGradientCenter)" pointerEvents="none" />
          <line x1="618" y1="460" x2="625" y2="560" stroke={stitchStroke} strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="732" y1="460" x2="725" y2="560" stroke={stitchStroke} strokeWidth="1.5" strokeDasharray="3,2" />
        </g>
      </g>

      {/* Door Panels on left and right edge */}
      <path
        d="M 50,220 L 75,220 L 75,560 L 50,560 Z"
        fill={state.doorPanelColorHex}
        stroke="#1a1e27"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('بطانة الباب الأيسر')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('أبواب')}
      />
      <path
        d="M 825,220 L 850,220 L 850,560 L 825,560 Z"
        fill={state.doorPanelColorHex}
        stroke="#1a1e27"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('بطانة الباب الأيمن')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('أبواب')}
      />
    </svg>
  );
};

/* =========================================================================
   2. DASHBOARD & STEERING WHEEL SVG VIEW
   ========================================================================= */
const DashboardSVG: React.FC<{
  state: CustomizerState;
  onPartHover: (label: string | null) => void;
  onPartClick: (label: string) => void;
}> = ({ state, onPartHover, onPartClick }) => {
  const stitchStroke = state.stitchColorHex;
  const upperDash = state.dashboardUpperColorHex;
  const lowerDash = state.dashboardLowerColorHex;
  const wheelColor = state.steeringWheelColorHex;
  const stripeColor = state.steeringCenterStripeHex;

  return (
    <svg viewBox="0 0 900 620" className="w-full h-full drop-shadow-2xl">
      <defs>
        <radialGradient id="dashGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="wheelRimGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* Windshield Background */}
      <rect x="50" y="30" width="800" height="560" rx="30" fill="#0b0e14" />
      <path d="M 80,50 L 820,50 L 850,200 L 50,200 Z" fill="#0f1420" stroke="#1d2638" strokeWidth="2" />
      <line x1="50" y1="170" x2="850" y2="170" stroke="#1a2333" strokeWidth="1.5" />

      {/* Rearview Mirror */}
      <rect x="410" y="70" width="80" height="35" rx="8" fill="#181e28" stroke="#334155" strokeWidth="1.5" />

      {/* UPPER DASHBOARD WRAP */}
      <path
        d="M 50,200 Q 450,185 850,200 L 850,310 Q 450,300 50,310 Z"
        fill={upperDash}
        stroke="#1a202c"
        strokeWidth="2"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('التابلوه العلوي المعالج بالجلد')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('تابلوه')}
      />
      <path d="M 50,200 Q 450,185 850,200 L 850,310 Q 450,300 50,310 Z" fill="url(#dashGradient)" pointerEvents="none" />
      {/* Upper Dash Hand-Stitch Line */}
      <path d="M 70,225 Q 450,210 830,225" fill="none" stroke={stitchStroke} strokeWidth="1.8" strokeDasharray="4,3" />

      {/* Ambient Lighting Strip */}
      {state.ambientLight !== 'off' && (
        <path
          d="M 60,305 Q 450,295 840,305"
          fill="none"
          stroke={
            state.ambientLight === 'ice-blue' ? '#38bdf8' :
            state.ambientLight === 'amber-orange' ? '#f59e0b' :
            state.ambientLight === 'crimson' ? '#ef4444' :
            state.ambientLight === 'neon-purple' ? '#c084fc' : '#fef08a'
          }
          strokeWidth="4"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 10px currentColor)' }}
        />
      )}

      {/* LOWER DASHBOARD & GLOVE BOX */}
      <path
        d="M 50,310 Q 450,300 850,310 L 830,470 L 70,470 Z"
        fill={lowerDash}
        stroke="#161922"
        strokeWidth="2"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('التابلوه السفلي ودرج التابلوه')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('تابلوه')}
      />
      <path d="M 50,310 Q 450,300 850,310 L 830,470 L 70,470 Z" fill="url(#dashGradient)" pointerEvents="none" />

      {/* Center Infotainment Screen & AC Vents */}
      <rect x="360" y="220" width="180" height="110" rx="10" fill="#090b10" stroke="#374151" strokeWidth="2.5" />
      <rect x="375" y="235" width="150" height="80" rx="6" fill="#111827" />
      {/* Screen Display graphic */}
      <text x="450" y="265" textAnchor="middle" fill="#d97706" fontSize="13" fontWeight="bold">COBRA STUDIO</text>
      <text x="450" y="285" textAnchor="middle" fill="#9ca3af" fontSize="10">{state.carBrand || 'Auto'} {state.carModel || 'Custom'}</text>
      <text x="450" y="302" textAnchor="middle" fill="#38bdf8" fontSize="9">● نظام صوتي ونظام ملاحة</text>

      {/* AC Vents Left & Right */}
      <rect x="130" y="240" width="80" height="35" rx="6" fill="#131722" stroke="#2c3648" strokeWidth="1.5" />
      <rect x="690" y="240" width="80" height="35" rx="6" fill="#131722" stroke="#2c3648" strokeWidth="1.5" />

      {/* Glovebox seam */}
      <line x1="620" y1="360" x2="800" y2="360" stroke="#1f2937" strokeWidth="2" />
      <rect x="700" y="352" width="25" height="6" rx="2" fill="#4b5563" />

      {/* Center Console with Gear Shift */}
      <path d="M 370,420 L 530,420 L 560,580 L 340,580 Z" fill="#141822" stroke="#242e3d" strokeWidth="2" />
      {/* Gear Shift Boot */}
      <path
        d="M 425,480 L 475,480 L 490,540 L 410,540 Z"
        fill={state.gearBootMatching ? state.centerColorHex : '#1c1917'}
        stroke={stitchStroke}
        strokeWidth="1.5"
      />
      {/* Gear Knob */}
      <circle cx="450" cy="470" r="18" fill="#1f2430" stroke="#d97706" strokeWidth="2" />
      <text x="450" y="474" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="bold">P R N D</text>

      {/* STEERING WHEEL (Detailed Driver Side) */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('طارة الدركسيون المكسوة بالجلد')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('دركسيون')}
      >
        {/* Steering Column Background */}
        <circle cx="250" cy="390" r="165" fill="none" stroke="#000000" strokeWidth="48" opacity="0.6" />

        {/* Outer Wheel Rim */}
        <circle
          cx="250"
          cy="390"
          r="165"
          fill="none"
          stroke={wheelColor}
          strokeWidth="38"
          strokeLinecap="round"
        />
        <circle cx="250" cy="390" r="165" fill="none" stroke="url(#wheelRimGlow)" strokeWidth="38" />

        {/* Inner Hand-Stitch seam on Rim */}
        <circle
          cx="250"
          cy="390"
          r="150"
          fill="none"
          stroke={stitchStroke}
          strokeWidth="2.2"
          strokeDasharray="4,3"
        />

        {/* 12 O'Clock Racing Marker Stripe */}
        {stripeColor && (
          <path
            d="M 240,207 A 165 165 0 0 1 260,207"
            fill="none"
            stroke={stripeColor}
            strokeWidth="40"
          />
        )}

        {/* Steering Center Boss / Horn Pad */}
        <circle cx="250" cy="390" r="62" fill="#141720" stroke="#252d3d" strokeWidth="2.5" />
        <circle cx="250" cy="390" r="50" fill={wheelColor} stroke="#1b212c" strokeWidth="1.5" />
        {/* Cobra Steering Emblem */}
        <circle cx="250" cy="390" r="28" fill="#0d1017" stroke="#d97706" strokeWidth="2" />
        <text x="250" y="394" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">COBRA</text>

        {/* Steering Spokes (3-Spoke Design) */}
        {/* Left spoke */}
        <path d="M 188,380 L 105,370 L 105,405 L 188,400 Z" fill="#1c2230" stroke="#2e384d" strokeWidth="1.5" />
        {/* Right spoke */}
        <path d="M 312,380 L 395,370 L 395,405 L 312,400 Z" fill="#1c2230" stroke="#2e384d" strokeWidth="1.5" />
        {/* Bottom spoke */}
        <path d="M 235,450 L 235,535 L 265,535 L 265,450 Z" fill="#1c2230" stroke="#2e384d" strokeWidth="1.5" />
      </g>
    </svg>
  );
};

/* =========================================================================
   3. ROOF / HEADLINER & STARLIGHT VIEW
   ========================================================================= */
const RoofHeadlinerSVG: React.FC<{
  state: CustomizerState;
  onPartHover: (label: string | null) => void;
  onPartClick: () => void;
}> = ({ state, onPartHover, onPartClick }) => {
  const roofFill = state.roofColorHex;

  // Starlight coordinates generator
  const stars = [
    { x: 220, y: 120, r: 1.5, o: 0.9 }, { x: 310, y: 150, r: 2.2, o: 1 }, { x: 450, y: 110, r: 1.8, o: 0.8 },
    { x: 580, y: 140, r: 2.4, o: 0.95 }, { x: 670, y: 100, r: 1.4, o: 0.7 }, { x: 180, y: 220, r: 2.0, o: 0.85 },
    { x: 270, y: 280, r: 1.6, o: 0.9 }, { x: 380, y: 240, r: 2.5, o: 1 }, { x: 490, y: 270, r: 1.7, o: 0.8 },
    { x: 600, y: 230, r: 2.1, o: 0.9 }, { x: 710, y: 260, r: 1.5, o: 0.75 }, { x: 230, y: 360, r: 2.3, o: 0.95 },
    { x: 340, y: 390, r: 1.9, o: 0.85 }, { x: 440, y: 350, r: 2.6, o: 1 }, { x: 540, y: 380, r: 1.8, o: 0.9 },
    { x: 660, y: 370, r: 2.2, o: 0.9 }, { x: 190, y: 440, r: 1.5, o: 0.8 }, { x: 300, y: 470, r: 2.0, o: 0.95 },
    { x: 410, y: 450, r: 1.6, o: 0.85 }, { x: 510, y: 460, r: 2.4, o: 1 }, { x: 620, y: 440, r: 1.7, o: 0.8 },
    { x: 730, y: 450, r: 2.1, o: 0.9 }, { x: 260, y: 520, r: 1.8, o: 0.85 }, { x: 470, y: 530, r: 2.2, o: 0.95 },
    { x: 640, y: 510, r: 1.5, o: 0.75 },
  ];

  return (
    <svg viewBox="0 0 900 620" className="w-full h-full drop-shadow-2xl">
      <defs>
        <radialGradient id="roofShadow" cx="50%" cy="50%" r="60%">
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* Frame of car cabin ceiling */}
      <rect x="60" y="40" width="780" height="540" rx="35" fill="#0b0d12" stroke="#1d2330" strokeWidth="3" />

      {/* MAIN ROOF HEADLINER SURFACE */}
      <path
        d="M 120,60 L 780,60 Q 820,310 780,560 L 120,560 Q 80,310 120,60 Z"
        fill={roofFill}
        stroke="#1a1c22"
        strokeWidth="2"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover(`سقف المقصورة (${state.roofMaterial === 'alcantara' ? 'ألكانتارا إيطالي' : 'جلد فاخر'})`)}
        onMouseLeave={() => onPartHover(null)}
        onClick={onPartClick}
      />
      <path d="M 120,60 L 780,60 Q 820,310 780,560 L 120,560 Q 80,310 120,60 Z" fill="url(#roofShadow)" pointerEvents="none" />

      {/* Sun Visors (Driver & Passenger) */}
      <rect x="180" y="80" width="220" height="70" rx="12" fill="#141720" stroke="#283244" strokeWidth="1.5" />
      <rect x="500" y="80" width="220" height="70" rx="12" fill="#141720" stroke="#283244" strokeWidth="1.5" />

      {/* Overhead Dome Light & Sunroof Console */}
      <rect x="405" y="80" width="90" height="110" rx="16" fill="#1b212d" stroke="#334155" strokeWidth="2" />
      <circle cx="430" cy="115" r="14" fill="#fef08a" opacity="0.8" />
      <circle cx="470" cy="115" r="14" fill="#fef08a" opacity="0.8" />
      <rect x="425" y="145" width="50" height="12" rx="4" fill="#374151" />

      {/* Grab Handles on Roof Sides */}
      <rect x="95" y="240" width="16" height="85" rx="8" fill="#1e2533" stroke="#3b485e" strokeWidth="1.5" />
      <rect x="789" y="240" width="16" height="85" rx="8" fill="#1e2533" stroke="#3b485e" strokeWidth="1.5" />

      {/* STARLIGHT FIBER OPTICS (If Enabled) */}
      {state.starlightEnabled && (
        <g id="starlightCluster" className="pointer-events-none">
          {stars.map((star, idx) => (
            <g key={idx}>
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill="#ffffff"
                opacity={star.o}
                className="animate-pulse"
                style={{
                  filter: 'drop-shadow(0 0 4px #93c5fd)',
                  animationDuration: `${1.5 + (idx % 3) * 0.8}s`,
                }}
              />
              <circle cx={star.x} cy={star.y} r={star.r * 2} fill="#60a5fa" opacity="0.2" />
            </g>
          ))}

          {/* Shooting Star streak if dense / shooting-star */}
          {state.starlightDensity === 'shooting-star' && (
            <line
              x1="260"
              y1="180"
              x2="480"
              y2="340"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
              style={{ filter: 'drop-shadow(0 0 8px #60a5fa)' }}
            />
          )}
        </g>
      )}

      {/* Custom Stitching Lines along Roof Contours */}
      <path d="M 170,180 L 170,520" stroke={state.stitchColorHex} strokeWidth="1.2" strokeDasharray="4,3" opacity="0.6" />
      <path d="M 730,180 L 730,520" stroke={state.stitchColorHex} strokeWidth="1.2" strokeDasharray="4,3" opacity="0.6" />
    </svg>
  );
};

/* =========================================================================
   4. REAR CABIN BENCH & DOOR PANELS VIEW
   ========================================================================= */
const RearCabinSVG: React.FC<{
  state: CustomizerState;
  onPartHover: (label: string | null) => void;
  onPartClick: (label: string) => void;
}> = ({ state, onPartHover, onPartClick }) => {
  const centerFill = state.centerColorHex;
  const bolsterFill = state.bolsterColorHex;
  const headrestFill = state.headrestColorHex;
  const stitchStroke = state.stitchColorHex;

  return (
    <svg viewBox="0 0 900 620" className="w-full h-full drop-shadow-2xl">
      <defs>
        <radialGradient id="rearCenterGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </radialGradient>
        <pattern id="floorMatsDiamond" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 11,0 L 22,11 L 11,22 L 0,11 Z" fill="none" stroke={stitchStroke} strokeWidth="1" strokeDasharray="2,2" opacity="0.75" />
        </pattern>
      </defs>

      {/* Car Interior Shell */}
      <rect x="50" y="30" width="800" height="560" rx="30" fill="#0a0c10" stroke="#1c2230" strokeWidth="2" />
      {/* Rear Window & Parcel Shelf */}
      <path d="M 180,60 L 720,60 L 770,180 L 130,180 Z" fill="#0f1422" stroke="#1d2638" strokeWidth="1.5" />
      <rect x="150" y="170" width="600" height="40" fill="#141924" rx="6" />

      {/* 3 REAR HEADRESTS */}
      {/* Left Headrest */}
      <rect x="220" y="140" width="75" height="70" rx="16" fill={headrestFill} stroke="#1f2533" strokeWidth="1.5" />
      <rect x="224" y="144" width="67" height="62" rx="12" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" />
      {/* Center Headrest */}
      <rect x="415" y="150" width="70" height="60" rx="14" fill={headrestFill} stroke="#1f2533" strokeWidth="1.5" />
      <rect x="419" y="154" width="62" height="52" rx="10" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" />
      {/* Right Headrest */}
      <rect x="605" y="140" width="75" height="70" rx="16" fill={headrestFill} stroke="#1f2533" strokeWidth="1.5" />
      <rect x="609" y="144" width="67" height="62" rx="12" fill="none" stroke={stitchStroke} strokeWidth="1.2" strokeDasharray="3,2" />

      {/* REAR BENCH SEATBACK */}
      {/* Left Bolster */}
      <path d="M 140,210 L 220,210 L 205,420 L 140,420 Z" fill={bolsterFill} stroke="#1c202a" strokeWidth="1.5" />
      {/* Right Bolster */}
      <path d="M 760,210 L 680,210 L 695,420 L 760,420 Z" fill={bolsterFill} stroke="#1c202a" strokeWidth="1.5" />

      {/* Left Seat Insert */}
      <path
        d="M 220,210 L 375,210 L 365,420 L 205,420 Z"
        fill={centerFill}
        stroke="#1c202a"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('المقعد الخلفي الأيسر')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('مقاعد')}
      />
      {state.stitchPattern === 'diamond' && (
        <path d="M 220,210 L 375,210 L 365,420 L 205,420 Z" fill="url(#diamondPattern)" opacity="0.8" pointerEvents="none" />
      )}
      {state.stitchPattern === 'ribbed' && (
        <path d="M 220,210 L 375,210 L 365,420 L 205,420 Z" fill="url(#ribbedPattern)" opacity="0.85" pointerEvents="none" />
      )}

      {/* Center Fold-down Armrest */}
      <rect
        x="385"
        y="215"
        width="130"
        height="200"
        rx="10"
        fill={bolsterFill}
        stroke={stitchStroke}
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('المسند الخلفي الأوسط القابل للطي')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('مقاعد')}
      />
      {/* Cupholders on Armrest */}
      <circle cx="425" cy="255" r="16" fill="#131720" stroke="#334155" strokeWidth="1.5" />
      <circle cx="475" cy="255" r="16" fill="#131720" stroke="#334155" strokeWidth="1.5" />

      {/* Right Seat Insert */}
      <path
        d="M 525,210 L 680,210 L 695,420 L 535,420 Z"
        fill={centerFill}
        stroke="#1c202a"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('المقعد الخلفي الأيمن')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('مقاعد')}
      />
      {state.stitchPattern === 'diamond' && (
        <path d="M 525,210 L 680,210 L 695,420 L 535,420 Z" fill="url(#diamondPattern)" opacity="0.8" pointerEvents="none" />
      )}
      {state.stitchPattern === 'ribbed' && (
        <path d="M 525,210 L 680,210 L 695,420 L 535,420 Z" fill="url(#ribbedPattern)" opacity="0.85" pointerEvents="none" />
      )}

      {/* REAR BENCH SEAT BASE CUSHION */}
      <path
        d="M 130,420 L 770,420 L 790,490 L 110,490 Z"
        fill={centerFill}
        stroke="#181d28"
        strokeWidth="2"
      />
      <line x1="130" y1="455" x2="770" y2="455" stroke={stitchStroke} strokeWidth="1.4" strokeDasharray="4,3" />

      {/* FLOOR MATS (7D Luxury Mats) */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('الأرضيات والدواسات الجلدية 7D')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('أرضيات')}
      >
        <path d="M 110,495 L 790,495 L 820,575 L 80,575 Z" fill={state.floorMatsColorHex || '#111215'} stroke="#222a3a" strokeWidth="2" />
        {state.floorMatsDiamondStitch && (
          <path d="M 110,495 L 790,495 L 820,575 L 80,575 Z" fill="url(#floorMatsDiamond)" pointerEvents="none" />
        )}
        {/* Footrest border & Cobra emblem on mat */}
        <rect x="360" y="520" width="180" height="40" rx="8" fill="#1f2533" stroke="#d97706" strokeWidth="1.5" />
        <text x="450" y="545" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="bold">COBRA 7D MATS</text>
      </g>

      {/* REAR DOOR CARDS & HANDLES (Left & Right) */}
      <path
        d="M 50,180 L 120,200 L 110,490 L 50,490 Z"
        fill={state.doorPanelColorHex}
        stroke="#1c2330"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('بطانة الباب الخلفي الأيسر')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('أبواب')}
      />
      <path
        d="M 850,180 L 780,200 L 790,490 L 850,490 Z"
        fill={state.doorPanelColorHex}
        stroke="#1c2330"
        strokeWidth="1.5"
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('بطانة الباب الخلفي الأيمن')}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('أبواب')}
      />
    </svg>
  );
};

/* =========================================================================
   5. CAR EXTERIOR & INTERIOR COLOR MATCHING VIEW (SVG)
   ========================================================================= */
const ExteriorCarSVG: React.FC<{
  state: CustomizerState;
  onPartHover: (label: string | null) => void;
  onPartClick: (label: string) => void;
}> = ({ state, onPartHover, onPartClick }) => {
  const exteriorFill = state.exteriorColorHex || '#F5F6F8';
  const finish = state.exteriorFinish || 'pearl';
  const isSuv = state.bodyType === 'suv';
  const isCoupe = state.bodyType === 'coupe';
  const isHatch = state.bodyType === 'hatchback';

  // Y offsets and curve adjustments based on body type
  const roofHeight = isSuv ? 115 : isCoupe ? 155 : isHatch ? 135 : 140;
  const rearSlopeX = isSuv ? 680 : isCoupe ? 740 : isHatch ? 690 : 710;
  const rearDeckX = isSuv ? 760 : isCoupe ? 790 : isHatch ? 750 : 785;

  return (
    <svg viewBox="0 0 920 540" className="w-full h-full drop-shadow-2xl select-none">
      <defs>
        {/* Exterior Paint Specular Highlight Shader */}
        <linearGradient id="exteriorPaintGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={finish === 'matte' ? 0.08 : finish === 'pearl' ? 0.45 : 0.35} />
          <stop offset="35%" stopColor={exteriorFill} stopOpacity="1" />
          <stop offset="75%" stopColor={exteriorFill} stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity={finish === 'matte' ? 0.3 : 0.45} />
        </linearGradient>

        {/* Roof Highlight */}
        <linearGradient id="roofPaintShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity={finish === 'gloss' ? 0.5 : 0.3} />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>

        {/* Shoulder Line Dynamic Reflection */}
        <linearGradient id="shoulderReflection" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity={finish === 'matte' ? 0.15 : 0.55} />
          <stop offset="70%" stopColor="#ffffff" stopOpacity={finish === 'matte' ? 0.15 : 0.55} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>

        {/* Studio Floor Reflection & Shadow */}
        <radialGradient id="carGroundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Tinted Glass Gradient */}
        <linearGradient id="tintedGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#1e293b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#090d16" stopOpacity="0.85" />
        </linearGradient>

        {/* Wheel Alloy Rim Shader */}
        <radialGradient id="alloyRim" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="45%" stopColor="#1e293b" />
          <stop offset="85%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>

        {/* Headlight glow */}
        <linearGradient id="headlightBeam" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
        </linearGradient>

        {/* Taillight glow */}
        <linearGradient id="taillightGlow" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* 1. STUDIO LIGHTING ENVIRONMENT & FLOOR */}
      <rect x="20" y="20" width="880" height="500" rx="24" fill="#090c12" />
      {/* Studio ceiling light reflection */}
      <ellipse cx="460" cy="50" rx="320" ry="18" fill="#ffffff" opacity="0.04" />
      {/* Floor grid / podium */}
      <ellipse cx="460" cy="425" rx="410" ry="60" fill="url(#carGroundShadow)" />
      <line x1="80" y1="425" x2="840" y2="425" stroke="#1f2937" strokeWidth="1" strokeDasharray="6,4" />

      {/* 2. DYNAMIC HEADLIGHT & TAILLIGHT BEAMS */}
      <polygon points="120,320 20,290 20,360" fill="url(#headlightBeam)" opacity="0.45" />
      <polygon points="810,320 900,300 900,345" fill="url(#taillightGlow)" opacity="0.4" />

      {/* 3. CAR BODY MAIN SILHOUETTE */}
      <g
        className="cursor-pointer transition-opacity hover:opacity-95"
        onMouseEnter={() => onPartHover(`طلاء الهيكل الخارجي (${state.exteriorColorName})`)}
        onMouseLeave={() => onPartHover(null)}
        onClick={() => onPartClick('طلاء خارجي')}
      >
        {/* Main Body Lower & Middle Shell */}
        <path
          d={`
            M 120,335
            C 120,310 140,295 190,290
            L 280,270
            L 360,${roofHeight + 15}
            C 400,${roofHeight} 540,${roofHeight} 610,${roofHeight + 5}
            L ${rearSlopeX},${roofHeight + 35}
            L ${rearDeckX},290
            C 820,295 830,320 825,345
            L 815,365
            C 805,370 780,370 770,365
            C 755,320 675,320 660,365
            L 340,365
            C 325,320 245,320 230,365
            L 140,365
            C 125,365 120,355 120,335
            Z
          `}
          fill="url(#exteriorPaintGradient)"
          stroke="#1e2633"
          strokeWidth="2"
        />

        {/* Roof line shine & highlights */}
        <path
          d={`
            M 360,${roofHeight + 15}
            C 400,${roofHeight} 540,${roofHeight} 610,${roofHeight + 5}
            L ${rearSlopeX},${roofHeight + 35}
            L 360,${roofHeight + 15}
            Z
          `}
          fill="url(#roofPaintShine)"
        />

        {/* Body Character Shoulder Crease Line */}
        <path
          d="M 150,300 Q 460,285 805,305"
          fill="none"
          stroke="url(#shoulderReflection)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 160,301 Q 460,286 800,306"
          fill="none"
          stroke="#000000"
          strokeWidth="1.2"
          opacity="0.3"
        />

        {/* Aerodynamic rocker panel skirt */}
        <path
          d="M 230,370 L 660,370 L 650,385 L 240,385 Z"
          fill="#0b0e14"
          stroke="#1e293b"
          strokeWidth="1.5"
        />

        {/* SUV Roof Rails (If SUV) */}
        {isSuv && (
          <g opacity="0.9">
            <path d="M 370,110 L 630,110 L 635,115 L 365,115 Z" fill="#475569" stroke="#0f172a" strokeWidth="1" />
            <line x1="390" y1="115" x2="390" y2="125" stroke="#475569" strokeWidth="4" />
            <line x1="610" y1="115" x2="610" y2="125" stroke="#475569" strokeWidth="4" />
          </g>
        )}
      </g>

      {/* 4. CABIN INTERIOR PREVIEW (SEATS & INTERIOR VISIBLE THROUGH GLASS) */}
      {/* Behind the glass: The Leather Seats & Dashboard */}
      <g id="interiorThroughGlass">
        {/* Headliner / Interior Roof Ceiling */}
        <path
          d={`M 365,${roofHeight + 18} Q 480,${roofHeight + 10} 605,${roofHeight + 18} L 605,${roofHeight + 26} Q 480,${roofHeight + 18} 365,${roofHeight + 26} Z`}
          fill={state.roofColorHex}
        />

        {/* REAR SEAT CABIN (Visible through rear passenger window) */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onPartHover('الفرش الداخلي للكنبة الخلفية')}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('كراسي')}
        >
          {/* Rear Headrest */}
          <rect x="545" y={roofHeight + 35} width="32" height="28" rx="8" fill={state.headrestColorHex} stroke={state.stitchColorHex} strokeWidth="1" />
          {/* Rear Seat Backrest */}
          <path
            d={`M 535,${roofHeight + 63} L 575,${roofHeight + 63} L 565,275 L 525,275 Z`}
            fill={state.centerColorHex}
            stroke={state.bolsterColorHex}
            strokeWidth="3"
          />
          {/* Stitch accent line */}
          <line x1="550" y1={roofHeight + 65} x2="545" y2="270" stroke={state.stitchColorHex} strokeWidth="1.2" strokeDasharray="3,2" />
        </g>

        {/* FRONT BUCKET SEAT (Driver / Passenger Seat - Clearly visible!) */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onPartHover(`فرش الكراسي الأمامية (${state.centerColorName})`)}
          onMouseLeave={() => onPartHover(null)}
          onClick={() => onPartClick('كراسي')}
        >
          {/* Front Headrest */}
          <rect x="420" y={roofHeight + 30} width="36" height="30" rx="9" fill={state.headrestColorHex} stroke={state.stitchColorHex} strokeWidth="1.2" />
          {/* Front Seat Bolster Wing */}
          <path
            d={`M 395,${roofHeight + 58} C 410,${roofHeight + 52} 455,${roofHeight + 52} 470,${roofHeight + 58} L 460,275 C 445,280 415,280 405,275 Z`}
            fill={state.bolsterColorHex}
          />
          {/* Front Seat Center Insert (Leather Cushion) */}
          <path
            d={`M 412,${roofHeight + 60} L 452,${roofHeight + 60} L 444,272 L 418,272 Z`}
            fill={state.centerColorHex}
          />
          {/* Diamond or Ribbed stitch pattern in seat */}
          <line x1="432" y1={roofHeight + 62} x2="431" y2="270" stroke={state.stitchColorHex} strokeWidth="1.4" strokeDasharray="3,2" />
          <line x1="422" y1={roofHeight + 75} x2="442" y2={roofHeight + 75} stroke={state.stitchColorHex} strokeWidth="1" strokeDasharray="2,2" />
          <line x1="420" y1={roofHeight + 95} x2="444" y2={roofHeight + 95} stroke={state.stitchColorHex} strokeWidth="1" strokeDasharray="2,2" />
        </g>

        {/* Steering Wheel silhouette through front window */}
        <g opacity="0.85">
          <ellipse cx="360" cy={roofHeight + 85} rx="16" ry="24" fill="none" stroke={state.steeringWheelColorHex} strokeWidth="4.5" />
          {/* 12 o'clock racing stripe on wheel */}
          <rect x="358" y={roofHeight + 61} width="4" height="6" fill={state.steeringCenterStripeHex || '#dc2626'} rx="1" />
        </g>

        {/* Dashboard Upper Silhouette */}
        <path
          d={`M 290,265 Q 360,${roofHeight + 85} 410,265 L 410,275 Q 360,${roofHeight + 95} 290,275 Z`}
          fill={state.dashboardUpperColorHex}
        />
      </g>

      {/* 5. TINTED WINDOW GLASS PANELS & PILLARS */}
      <g id="carWindows" opacity="0.88">
        {/* Front Windshield (A-pillar glass) */}
        <path
          d={`M 285,268 L 360,${roofHeight + 20} L 368,${roofHeight + 20} L 315,268 Z`}
          fill="url(#tintedGlass)"
          stroke="#0b0f17"
          strokeWidth="1.5"
        />

        {/* Front Door Side Window */}
        <path
          d={`M 374,${roofHeight + 20} L 476,${roofHeight + 17} L 476,270 L 325,270 Z`}
          fill="url(#tintedGlass)"
          stroke="#0b0f17"
          strokeWidth="1.5"
        />

        {/* Rear Door Side Window */}
        <path
          d={`M 484,${roofHeight + 17} L 595,${roofHeight + 22} L 585,270 L 484,270 Z`}
          fill="url(#tintedGlass)"
          stroke="#0b0f17"
          strokeWidth="1.5"
        />

        {/* Rear Quarter Glass */}
        <path
          d={`M 603,${roofHeight + 23} L ${rearSlopeX - 10},${roofHeight + 35} L 620,270 L 593,270 Z`}
          fill="url(#tintedGlass)"
          stroke="#0b0f17"
          strokeWidth="1.5"
        />

        {/* B-Pillar & Window Chrome Frame Trim */}
        <line x1="479" y1={roofHeight + 16} x2="479" y2="271" stroke="#0b0f17" strokeWidth="6" />
        <path
          d={`M 320,270 L 370,${roofHeight + 17} C 420,${roofHeight + 12} 550,${roofHeight + 14} 600,${roofHeight + 20} L ${rearSlopeX - 5},${roofHeight + 36} L 625,270 Z`}
          fill="none"
          stroke="#334155"
          strokeWidth="2.5"
          opacity="0.8"
        />

        {/* Subtle Glass Light Glare / Reflection */}
        <path
          d={`M 350,270 L 410,${roofHeight + 19} L 430,${roofHeight + 19} L 370,270 Z`}
          fill="#ffffff"
          opacity="0.12"
        />
        <path
          d={`M 510,270 L 550,${roofHeight + 20} L 565,${roofHeight + 20} L 525,270 Z`}
          fill="#ffffff"
          opacity="0.1"
        />
      </g>

      {/* 6. EXTERIOR CAR DETAILS (Mirrors, Door Handles, Headlights, Tail Lights) */}
      {/* Side View Mirror */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onPartHover('المرآة الجانبية')}
        onMouseLeave={() => onPartHover(null)}
      >
        <path d="M 330,268 L 360,265 L 365,278 L 332,277 Z" fill={exteriorFill} stroke="#1e2633" strokeWidth="1.5" />
        {/* Mirror LED indicator */}
        <line x1="334" y1="272" x2="355" y2="270" stroke="#f59e0b" strokeWidth="1.5" />
      </g>

      {/* Door Handles (Front & Rear) */}
      <rect x="420" y="295" width="34" height="6" rx="3" fill="#1e293b" stroke={exteriorFill} strokeWidth="1.5" />
      <rect x="540" y="295" width="34" height="6" rx="3" fill="#1e293b" stroke={exteriorFill} strokeWidth="1.5" />

      {/* Front LED Headlight Cluster */}
      <g>
        <path d="M 125,325 L 180,310 L 175,328 L 130,336 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        {/* DRL Cyan Light Bar */}
        <path d="M 130,328 L 174,316" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }} />
        {/* Amber turn signal accent */}
        <circle cx="170" cy="324" r="2.5" fill="#f59e0b" />
      </g>

      {/* Rear 3D LED Taillight Lightbar */}
      <g>
        <path d="M 825,325 L 775,320 L 778,335 L 820,340 Z" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
        <path d="M 822,328 L 780,323" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px #ef4444)' }} />
      </g>

      {/* Dual Chrome Exhaust Tips */}
      <rect x="808" y="372" width="16" height="8" rx="3" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />

      {/* 7. ALLOY WHEELS & BRAKE CALIPERS */}
      {/* FRONT WHEEL */}
      <g id="frontWheel" transform="translate(285, 365)">
        {/* Tire Outer Rubber */}
        <circle cx="0" cy="0" r="54" fill="#0c0e14" stroke="#1f2937" strokeWidth="4" />
        <circle cx="0" cy="0" r="50" fill="none" stroke="#2a3342" strokeWidth="1.5" strokeDasharray="6,4" />
        {/* Rim Barrel */}
        <circle cx="0" cy="0" r="38" fill="url(#alloyRim)" stroke="#475569" strokeWidth="2.5" />
        {/* Sport Brake Caliper */}
        <path d="M -18,-24 A 30 30 0 0 1 12,-30 L 8,-18 A 20 20 0 0 0 -12,-15 Z" fill="#d97706" />
        <text x="-4" y="-21" fill="#ffffff" fontSize="6" fontWeight="bold">COBRA</text>
        {/* 5-Spoke Sport Design */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 36}
            y2={Math.sin((angle * Math.PI) / 180) * 36}
            stroke="#cbd5e1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
        {/* Center Cap */}
        <circle cx="0" cy="0" r="9" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="#d97706" />
      </g>

      {/* REAR WHEEL */}
      <g id="rearWheel" transform="translate(715, 365)">
        {/* Tire Outer Rubber */}
        <circle cx="0" cy="0" r="54" fill="#0c0e14" stroke="#1f2937" strokeWidth="4" />
        <circle cx="0" cy="0" r="50" fill="none" stroke="#2a3342" strokeWidth="1.5" strokeDasharray="6,4" />
        {/* Rim Barrel */}
        <circle cx="0" cy="0" r="38" fill="url(#alloyRim)" stroke="#475569" strokeWidth="2.5" />
        {/* Sport Brake Caliper */}
        <path d="M -18,-24 A 30 30 0 0 1 12,-30 L 8,-18 A 20 20 0 0 0 -12,-15 Z" fill="#d97706" />
        <text x="-4" y="-21" fill="#ffffff" fontSize="6" fontWeight="bold">COBRA</text>
        {/* 5-Spoke Sport Design */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 36}
            y2={Math.sin((angle * Math.PI) / 180) * 36}
            stroke="#cbd5e1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
        {/* Center Cap */}
        <circle cx="0" cy="0" r="9" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="#d97706" />
      </g>

      {/* 8. OVERLAY HUD SPEC CARD INSIDE PREVIEW */}
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="280" height="66" rx="14" fill="#090d16" fillOpacity="0.88" stroke="#2a3346" strokeWidth="1.2" />
        {/* Color circle swatch */}
        <circle cx="28" cy="33" r="14" fill={exteriorFill} stroke="#ffffff" strokeWidth="2" strokeOpacity="0.3" />
        <text x="54" y="26" fill="#94a3b8" fontSize="10" fontFamily="'Cairo', sans-serif">طلاء الهيكل الخارجي المعتمد</text>
        <text x="54" y="44" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="'Cairo', sans-serif">
          {state.exteriorColorName.length > 24 ? state.exteriorColorName.slice(0, 22) + '...' : state.exteriorColorName}
        </text>
        <text x="54" y="58" fill="#f59e0b" fontSize="10" fontWeight="600" fontFamily="'Cairo', sans-serif">
          {state.exteriorFinish === 'pearl' ? '✨ لمعان لؤلؤي براق' : state.exteriorFinish === 'metallic' ? '💎 ميتاليك كريستال' : state.exteriorFinish === 'matte' ? '🌑 مطفي فاخر (Matte)' : '🌟 لامع كلاسيكي'}
        </text>
      </g>

      {/* INTERIOR HARMONY BADGE */}
      <g transform="translate(630, 40)">
        <rect x="0" y="0" width="240" height="66" rx="14" fill="#090d16" fillOpacity="0.88" stroke="#2a3346" strokeWidth="1.2" />
        <text x="220" y="26" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="'Cairo', sans-serif">تناسق الطلاء مع جلد المقصورة</text>
        <g transform="translate(40, 36)">
          {/* Swatches side by side showing exterior vs interior center */}
          <circle cx="15" cy="10" r="10" fill={exteriorFill} stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="38" cy="10" r="10" fill={state.centerColorHex} stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="61" cy="10" r="7" fill={state.stitchColorHex} stroke="#ffffff" strokeWidth="1" />
          <text x="85" y="14" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="'Cairo', sans-serif">
            تناغم ممتاز 100%
          </text>
        </g>
      </g>
    </svg>
  );
};
