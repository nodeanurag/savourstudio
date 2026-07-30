import type { RestaurantTheme } from './types';

export const SAVOR_THEMES: RestaurantTheme[] = [
  {
    id: 'steakhouse',
    name: 'Luxury Steakhouse',
    tagline: 'Deep obsidian and champagne gold. Bold, majestic, and refined.',
    fontFamilyTitle: "'Cormorant Garamond', serif",
    fontFamilyBody: "'Inter', sans-serif",
    colors: {
      primary: '#C5A880', // Champagne Gold
      secondary: '#E2C295', // Muted Bronze
      accent: '#E6C18E',
      background: '#0B0B0C', // Obsidian Black
      surface: '#141416', // Slate dark card
      textDark: '#E4E4E6', // Platinum
      textLight: '#9A9A9E', // Muted Silver
      border: 'rgba(197, 168, 128, 0.15)', // Thin gold border
      glow: 'rgba(197, 168, 128, 0.08)'
    },
    borders: {
      cardRadius: '4px',
      buttonRadius: '2px',
      borderStyle: '1px solid'
    },
    shadows: {
      cardShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      buttonShadow: '0 2px 8px rgba(197, 168, 128, 0.2)'
    },
    accents: {
      dividerStyle: 'ornate',
      cardGlow: true,
      heroOverlay: 'linear-gradient(to bottom, rgba(11, 11, 12, 0.4), rgba(11, 11, 12, 0.95))'
    }
  },
  {
    id: 'trattoria',
    name: 'Italian Trattoria',
    tagline: 'Warm terracotta, olive tones, and rustic hand-drawn accents.',
    fontFamilyTitle: "'Playfair Display', serif",
    fontFamilyBody: "'DM Sans', sans-serif",
    colors: {
      primary: '#8C2D19', // Terracotta Red
      secondary: '#3E5C38', // Olive Green
      accent: '#D4AF37', // Gold Leaf
      background: '#FAF6EE', // Linen Cream
      surface: '#FFFDF9', // Cream Card
      textDark: '#2C2520', // Espresso
      textLight: '#706258', // Cocoa
      border: '#E3DEC3'
    },
    borders: {
      cardRadius: '8px',
      buttonRadius: '4px',
      borderStyle: '1px solid'
    },
    shadows: {
      cardShadow: '0 4px 20px rgba(140, 45, 25, 0.05)',
      buttonShadow: '0 2px 4px rgba(140, 45, 25, 0.1)'
    },
    accents: {
      dividerStyle: 'dashed',
      cardGlow: false,
      heroOverlay: 'linear-gradient(to bottom, rgba(44, 37, 32, 0.3), rgba(250, 246, 238, 0.95))'
    }
  },
  {
    id: 'sushi',
    name: 'Japanese Sushi',
    tagline: 'Minimalist paper white, solid coal black, and crimson accents.',
    fontFamilyTitle: "'Outfit', sans-serif",
    fontFamilyBody: "'Inter', sans-serif",
    colors: {
      primary: '#E53E3E', // Crimson Red
      secondary: '#1A202C', // Coal Black
      accent: '#718096', // Slate Gray
      background: '#FFFFFF', // Paper White
      surface: '#F8FAFC', // Slate Tint Card
      textDark: '#111111', // Ink Black
      textLight: '#555555', // Charcoal
      border: '#E2E8F0'
    },
    borders: {
      cardRadius: '0px', // Stark sharp angles
      buttonRadius: '0px',
      borderStyle: '1px solid'
    },
    shadows: {
      cardShadow: 'none',
      buttonShadow: 'none'
    },
    accents: {
      dividerStyle: 'solid',
      cardGlow: false,
      heroOverlay: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.95))'
    }
  },
  {
    id: 'bistro',
    name: 'French Bistro',
    tagline: 'Classic deep merlot, royal navy, brass, and ivory white.',
    fontFamilyTitle: "'Playfair Display', serif",
    fontFamilyBody: "'Inter', sans-serif",
    colors: {
      primary: '#0F294A', // Royal Navy Blue
      secondary: '#8A1E2B', // Merlot Red
      accent: '#D4AF37', // Brass Gold
      background: '#FDFBF7', // Bistro Ivory
      surface: '#FFFFFF', // Clean White Card
      textDark: '#1A1D20', // Midnight
      textLight: '#5A626A', // Classic Gray
      border: '#EAE3D2'
    },
    borders: {
      cardRadius: '12px',
      buttonRadius: '6px',
      borderStyle: '1px solid'
    },
    shadows: {
      cardShadow: '0 10px 30px rgba(15, 41, 74, 0.04)',
      buttonShadow: '0 4px 10px rgba(15, 41, 74, 0.1)'
    },
    accents: {
      dividerStyle: 'double',
      cardGlow: false,
      heroOverlay: 'linear-gradient(to bottom, rgba(15, 41, 74, 0.3), rgba(253, 251, 247, 0.95))'
    }
  },
  {
    id: 'cafe',
    name: 'Artisan Café',
    tagline: 'Friendly round borders, soft caramel tones, and warm oats.',
    fontFamilyTitle: "'Outfit', sans-serif",
    fontFamilyBody: "'DM Sans', sans-serif",
    colors: {
      primary: '#5C4033', // Espresso Brown
      secondary: '#C19A6B', // Soft Caramel
      accent: '#E6D8B8', // Milky Latte
      background: '#F5F2EB', // Oat Milk Gray
      surface: '#FFFDFB', // Soft Card
      textDark: '#3D2D24', // Deep Coffee
      textLight: '#8B7A72', // Warm Charcoal
      border: '#EADFC9'
    },
    borders: {
      cardRadius: '24px', // Extremely round
      buttonRadius: '12px',
      borderStyle: '1px solid'
    },
    shadows: {
      cardShadow: '0 8px 24px rgba(92, 64, 51, 0.04)',
      buttonShadow: '0 4px 12px rgba(92, 64, 51, 0.08)'
    },
    accents: {
      dividerStyle: 'solid',
      cardGlow: false,
      heroOverlay: 'linear-gradient(to bottom, rgba(92, 64, 51, 0.2), rgba(245, 242, 235, 0.95))'
    }
  },
  {
    id: 'lounge',
    name: 'Cocktail Lounge',
    tagline: 'Vibrant neon teal and magenta glows on deep velvet space.',
    fontFamilyTitle: "'Outfit', sans-serif",
    fontFamilyBody: "'Inter', sans-serif",
    colors: {
      primary: '#00F0FF', // Neon Teal
      secondary: '#FF007F', // Neon Magenta
      accent: '#8A2BE2', // Neon Violet
      background: '#070610', // Deep Space
      surface: '#100E21', // Dark Glass Card
      textDark: '#FFFFFF', // High-Contrast White
      textLight: '#8F8CAF', // Lavender Gray
      border: 'rgba(255, 0, 127, 0.15)', // Neon glow borders
      glow: 'rgba(0, 240, 255, 0.15)'
    },
    borders: {
      cardRadius: '16px',
      buttonRadius: '8px',
      borderStyle: '1px solid'
    },
    shadows: {
      cardShadow: '0 4px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.05)',
      buttonShadow: '0 0 15px rgba(255, 0, 127, 0.3)'
    },
    accents: {
      dividerStyle: 'solid',
      cardGlow: true,
      heroOverlay: 'linear-gradient(to bottom, rgba(7, 6, 16, 0.4), rgba(7, 6, 16, 0.95))'
    }
  }
];
