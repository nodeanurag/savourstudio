export interface OpeningHours {
  days: string;
  hours: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  dietary: string[]; // e.g. ['Vegan', 'Gluten-Free', 'Nut-Free', 'Dairy-Free']
  isChefRecommended: boolean;
  recipeSpecs?: string;
}

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface EventPromo {
  id: string;
  title: string;
  description: string;
  date: string;
  price?: number;
  imageUrl: string;
  badge: string; // e.g. 'Live Music', 'Wine Tasting', 'Chef Special'
  ctaText?: string;
}

export interface RestaurantData {
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  heroImageUrl: string;
  contact: ContactInfo;
  socials: SocialLinks;
  openingHours: OpeningHours[];
  menuSections: MenuSection[];
  events: EventPromo[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textDark: string;
  textLight: string;
  border: string;
  glow?: string;
}

export interface ThemeBorders {
  cardRadius: string;
  buttonRadius: string;
  borderStyle: string; // e.g. '1px solid', '2px dashed'
}

export interface ThemeShadows {
  cardShadow: string;
  buttonShadow: string;
}

export interface ThemeAccents {
  dividerStyle: 'solid' | 'dashed' | 'double' | 'ornate';
  cardGlow?: boolean;
  heroOverlay?: string;
}

export interface RestaurantTheme {
  id: string;
  name: string;
  tagline: string;
  fontFamilyTitle: string;
  fontFamilyBody: string;
  colors: ThemeColors;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  accents: ThemeAccents;
}
