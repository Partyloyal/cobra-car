export type InteriorView = 'front-seats' | 'dashboard' | 'roof' | 'rear-cabin' | 'exterior';

export type BodyType = 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'commercial';

export type ExteriorFinish = 'metallic' | 'pearl' | 'matte' | 'gloss';

export interface ExteriorColorOption {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  finish: ExteriorFinish;
  finishLabelAr: string;
  isPopular?: boolean;
}

export interface CarBrand {
  id: string;
  nameAr: string;
  nameEn: string;
  popularModels: string[];
  logoText: string;
  exteriorColors?: ExteriorColorOption[];
}

export type MaterialCategory = 'nappa' | 'german' | 'eco' | 'alcantara' | 'fabric' | 'perforated';

export interface MaterialOption {
  id: string;
  nameAr: string;
  nameEn: string;
  category: MaterialCategory;
  descriptionAr: string;
  texturePattern: string; // css gradient or svg pattern id
  durability: number; // 1-5
  heatResistance: number; // 1-5
  breathability: number; // 1-5
  recommendedFor: string;
}

export interface ColorOption {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  secondaryHex?: string;
  isPopular?: boolean;
}

export type StitchPattern = 'diamond' | 'ribbed' | 'honeycomb' | 'double-french' | 'smooth';

export interface StitchPatternOption {
  id: StitchPattern;
  nameAr: string;
  nameEn: string;
  description: string;
}

export type FoamDensity = 'standard' | 'high-density-45' | 'memory-foam' | 'orthopedic-lumbar';

export interface CustomizerState {
  // Car details
  carBrand: string;
  carModel: string;
  carYear: string;
  bodyType: BodyType;
  isCustomCar: boolean;
  customBrandName: string;
  customModelName: string;

  // Car Exterior Paint (لون الهيكل الخارجي للسيارة ومستوى اللمعان)
  exteriorColorHex: string;
  exteriorColorName: string;
  exteriorFinish: ExteriorFinish;

  // Active view
  activeView: InteriorView;
  ambientLight: 'off' | 'ice-blue' | 'amber-orange' | 'crimson' | 'neon-purple' | 'warm-white';
  isNightMode: boolean;

  // Seats customization
  centerMaterialId: string;
  centerColorHex: string;
  centerColorName: string;

  bolsterMaterialId: string;
  bolsterColorHex: string;
  bolsterColorName: string;

  headrestColorHex: string;
  headrestColorName: string;

  // Stitching
  stitchPattern: StitchPattern;
  stitchColorHex: string;
  stitchColorName: string;
  doubleStitchAccent: boolean;

  // Foam & Ergonomics
  foamType: FoamDensity;
  hasLumbarSupport: boolean;

  // Roof & Headliner
  roofMaterial: 'alcantara' | 'fabric' | 'leather';
  roofColorHex: string;
  roofColorName: string;
  starlightEnabled: boolean;
  starlightDensity: 'gentle' | 'dense' | 'shooting-star';

  // Dashboard & Doors
  dashboardUpperColorHex: string;
  dashboardUpperColorName: string;
  dashboardLowerColorHex: string;
  dashboardLowerColorName: string;
  doorPanelColorHex: string;
  doorPanelColorName: string;

  // Steering wheel & Gear
  steeringWheelColorHex: string;
  steeringWheelColorName: string;
  steeringCenterStripeHex: string; // 12 o'clock racing stripe
  steeringPerforatedSides: boolean;
  gearBootMatching: boolean;

  // Floor mats
  floorMatsColorHex: string;
  floorMatsDiamondStitch: boolean;

  // Custom Embossing
  embossingText: string;
  embossingType: 'none' | 'cobra-logo' | 'custom-initials' | 'car-brand-logo';
}

export interface DesignPreset {
  id: string;
  nameAr: string;
  subtitleAr: string;
  description: string;
  thumbnailColor1: string;
  thumbnailColor2: string;
  accentColor: string;
  state: Partial<CustomizerState>;
}
