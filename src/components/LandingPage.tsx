import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Smartphone, Mail, Sparkles,
  Code, Terminal, BookOpen, CheckCircle2, AlertTriangle, Monitor, RotateCcw
} from 'lucide-react';
import { DEFAULT_RESTAURANT_DATA } from '../data/default-restaurant';
import { SAVOR_THEMES } from '../themes';
import { SavorEmail } from '../elements/SavorEmail';
import { SavorWeb } from '../elements/SavorWeb';
import { SavorDocument } from '../elements/SavorDocument';

interface LandingPageProps {
  onOpenStudio: () => void;
}

type PreviewChannel = 'email' | 'web' | 'document';
type SandboxTab = 'json' | 'docs';
type DeviceMode = 'desktop' | 'mobile';


interface ThemeAccent {
  id: string;
  name: string;
  color: string;
  stack: string;
  font: string;
  bg: string;
}

const THEME_ACCENTS: ThemeAccent[] = [
  { id: 'steakhouse', name: 'Luxury Steakhouse', color: '#C8A880', stack: 'Savor Serif', font: "'Instrument Serif', serif", bg: '#0b0b0c' },
  { id: 'sushi', name: 'Charcoal Minimal', color: '#171717', stack: 'Savor Sans', font: "'Geist', sans-serif", bg: '#FFFFFF' },
  { id: 'trattoria', name: 'Italian Trattoria', color: '#E07A5F', stack: 'Outfit Stack', font: "'Outfit', sans-serif", bg: '#FAF6EE' },
  { id: 'bistro', name: 'Forest Bistro', color: '#1E3F20', stack: 'Diner Stack', font: "'Outfit', sans-serif", bg: '#FDFBF7' },
  { id: 'lounge', name: 'Navy Lounge', color: '#0F1F3D', stack: 'Luxury Stack', font: "'Cormorant Garamond', serif", bg: '#070610' }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenStudio }) => {
  const [restaurantName, setRestaurantName] = useState<string>("L'An");
  const [selectedAccent, setSelectedAccent] = useState<ThemeAccent>(THEME_ACCENTS[0]);
  const [previewChannel, setPreviewChannel] = useState<PreviewChannel>('email');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [activeTab, setActiveTab] = useState<SandboxTab>('json');



  // Initial JSON matching restaurant state
  const getJsonString = (name: string, accent: ThemeAccent) => {
    return JSON.stringify({
      restaurant: {
        name: name,
        tagline: "Crafted Flavors. Timeless Moments.",
        theme: accent.id,
        accentColor: accent.color,
        typography: accent.stack,
        stack: "Savor Stack",
        contact: {
          phone: "+91 98765 43210",
          email: `hello@${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'restaurant'}.com`,
          address: "24, Park Street, Kolkata, India"
        }
      },
      social: {
        instagram: `@${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'restaurant'}.steakhouse`,
        website: `www.${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'restaurant'}.com`
      }
    }, null, 2);
  };

  const [jsonCode, setJsonCode] = useState<string>(getJsonString("L'An", THEME_ACCENTS[0]));
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [parsedData, setParsedData] = useState<any>(JSON.parse(getJsonString("L'An", THEME_ACCENTS[0])));

  // Update JSON when input parameters change
  useEffect(() => {
    const updated = getJsonString(restaurantName, selectedAccent);
    setJsonCode(updated);
    setIsValidJson(true);
    try {
      setParsedData(JSON.parse(updated));
    } catch (_) { }
  }, [restaurantName, selectedAccent]);

  // Handle direct JSON editing
  const handleJsonChange = (val: string) => {
    setJsonCode(val);
    try {
      const parsed = JSON.parse(val);
      setIsValidJson(true);
      setParsedData(parsed);

      // Sync back input states
      if (parsed.restaurant?.name) {
        setRestaurantName(parsed.restaurant.name);
      }
      if (parsed.restaurant?.accentColor) {
        const matchingAccent = THEME_ACCENTS.find(a => a.color.toLowerCase() === parsed.restaurant.accentColor.toLowerCase());
        if (matchingAccent) {
          setSelectedAccent(matchingAccent);
        } else {
          setSelectedAccent({
            id: parsed.restaurant.theme || 'custom',
            name: 'Custom Accent',
            color: parsed.restaurant.accentColor,
            stack: parsed.restaurant.typography || 'Custom Stack',
            font: "'Outfit', sans-serif",
            bg: '#F8F6F2'
          });
        }
      }
    } catch (_) {
      setIsValidJson(false);
    }
  };

  const handleSelectTemplate = (themeId: string) => {
    const matched = THEME_ACCENTS.find(a => a.id === themeId);
    if (matched) {
      setSelectedAccent(matched);
      const el = document.getElementById('sandbox-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Merge sandbox state with base default restaurant data to keep rendering robust
  const getRenderData = () => {
    return {
      ...DEFAULT_RESTAURANT_DATA,
      name: parsedData.restaurant?.name || restaurantName,
      tagline: parsedData.restaurant?.tagline || DEFAULT_RESTAURANT_DATA.tagline,
      contact: {
        ...DEFAULT_RESTAURANT_DATA.contact,
        ...parsedData.restaurant?.contact
      }
    };
  };

  const getRenderTheme = () => {
    const baseTheme = SAVOR_THEMES.find(t => t.id === selectedAccent.id) || SAVOR_THEMES[0];
    return {
      ...baseTheme,
      accentColor: selectedAccent.color,
      name: selectedAccent.name,
      fontTitle: selectedAccent.font,
      bgTemplate: selectedAccent.bg
    };
  };
  const getPreviewBgColor = () => {
    const theme = getRenderTheme();
    return theme.colors?.background || '#ffffff';
  };
  const lines = jsonCode.split('\n');

  return (
    <div className="landing-wrapper relative min-h-screen overflow-hidden">
      {/* Styles Injection block to ensure visual parity with layout mockup */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }

        .landing-wrapper {
          background-color: var(--landing-bg) !important;
          color: var(--landing-text-primary) !important;
          font-family: 'Geist', 'Outfit', sans-serif !important;
        }
        
        .landing-header-sticky {
          height: 72px !important;
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(231, 225, 216, 0.7) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
        }

        .nav-links {
          display: none !important;
          align-items: center !important;
          gap: 32px !important;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
        }

        .nav-link-item {
          font-size: 13px !important;
          font-weight: 500 !important;
          color: var(--landing-text-secondary) !important;
          text-decoration: none !important;
          transition: color 150ms ease !important;
        }

        .nav-link-item:hover {
          color: var(--landing-text-primary) !important;
        }

        .hero-title-font {
          font-family: var(--font-haas-groot-disp) !important;
          font-size: 56px !important;
          line-height: 1.15 !important;
          font-weight: 900 !important;
          letter-spacing: -0.015em !important;
          color: var(--color-midnight-indigo) !important;
        }
        @media (min-width: 640px) {
          .hero-title-font {
            font-size: 64px !important;
          }
        }

        .gold-italic-text {
          font-family: var(--font-haas-groot-disp) !important;
          font-weight: 900 !important;
          color: var(--color-terracotta) !important;
          font-style: normal !important;
        }

        .btn-premium-primary {
          background-color: var(--color-onyx) !important;
          color: var(--color-pure-white) !important;
          height: 52px !important;
          padding: 0 28px !important;
          border-radius: var(--landing-radius-btn) !important;
          border: 1px solid var(--color-onyx) !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          text-decoration: none !important;
          white-space: nowrap !important;
        }

        .btn-premium-primary:hover {
          background-color: var(--color-charcoal) !important;
          border-color: var(--color-charcoal) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(24, 29, 38, 0.2) !important;
        }

        .btn-premium-secondary {
          background-color: transparent !important;
          color: var(--landing-text-primary) !important;
          height: 52px !important;
          padding: 0 24px !important;
          border-radius: var(--landing-radius-btn) !important;
          border: 1px solid var(--color-onyx) !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          transition: all 180ms ease !important;
          text-decoration: none !important;
          white-space: nowrap !important;
        }

        .btn-premium-secondary:hover {
          background-color: var(--color-frost-white) !important;
          transform: translateY(-2px) !important;
        }

        .btn-nav-launch {
          background-color: var(--color-onyx) !important;
          color: var(--color-pure-white) !important;
          border: 1px solid var(--color-onyx) !important;
          border-radius: 12px !important;
          padding: 10px 20px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: var(--shadow-subtle) !important;
        }

        .btn-nav-launch:hover {
          background-color: var(--color-charcoal) !important;
          border-color: var(--color-charcoal) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 18px rgba(24, 29, 38, 0.2) !important;
        }

        .premium-card {
          background-color: var(--landing-surface) !important;
          border: 1px solid var(--landing-border) !important;
          border-radius: 24px !important;
          box-shadow: var(--landing-shadow) !important;
          overflow: hidden !important;
        }

        .sandbox-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          background-color: var(--landing-surface) !important;
          min-height: 420px !important;
        }

        @media (min-width: 768px) {
          .sandbox-grid {
            grid-template-columns: 1fr 1.15fr !important;
            height: 500px !important;
          }
        }



        .sandbox-editor-panel {
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          background-color: var(--landing-surface) !important;
          border-bottom: 1px solid var(--landing-border) !important;
          height: 100% !important;
        }

        @media (min-width: 1024px) {
          .sandbox-editor-panel {
            border-bottom: none !important;
            border-right: 1px solid var(--landing-border) !important;
          }
        }

        .sandbox-preview-panel {
          background-color: var(--landing-surface-secondary) !important;
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }

        .circle-accent-btn {
          width: 24px !important;
          height: 24px !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          transition: all 150ms ease !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        .circle-accent-btn:hover {
          transform: scale(1.08) !important;
        }

        .circle-accent-btn.active {
          outline: 2px solid var(--landing-gold) !important;
          outline-offset: 2px !important;
        }

        .editor-textarea {
          font-family: 'Consolas', 'Monaco', monospace !important;
          font-size: 11px !important;
          line-height: 18px !important;
          color: #1b5e20 !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          resize: none !important;
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
          white-space: pre !important;
          overflow-x: auto !important;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 5px !important;
          height: 5px !important;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02) !important;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.18) !important;
          border-radius: 4px !important;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3) !important;
        }

        /* Override template outer wrappers inside the sandbox preview to prevent nested borders/backgrounds */
        .sandbox-preview-inner > div {
          background-color: transparent !important;
          padding: 0 !important;
        }

        .editor-gutter {
          user-select: none !important;
          text-align: right !important;
          padding-right: 8px !important;
          color: #a1a1aa !important;
          font-family: 'Consolas', 'Monaco', monospace !important;
          font-size: 11px !important;
          line-height: 18px !important;
          border-right: 1px solid var(--landing-border) !important;
          margin-right: 10px !important;
          display: flex !important;
          flex-direction: column !important;
          padding-top: 0px !important;
          flex-shrink: 0 !important;
        }

        .gutter-num {
          display: block !important;
          height: 18px !important;
        }

        .premium-input {
          height: 44px !important;
          border-radius: var(--landing-radius-input) !important;
          border: 1px solid var(--landing-border) !important;
          background-color: var(--landing-surface) !important;
          color: var(--landing-text-primary) !important;
          outline: none !important;
          transition: all 150ms ease !important;
          width: 100% !important;
          box-sizing: border-box !important;
          padding: 0 14px !important;
          font-size: 13px !important;
        }

        .premium-input:focus {
          border-color: var(--landing-gold) !important;
          box-shadow: 0 0 0 2px rgba(200, 168, 128, 0.2) !important;
        }

        .editor-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .editor-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.08);
          border-radius: 3px;
        }
        .editor-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.15);
        }
        
        /* Features row */
        .features-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 24px !important;
        }
        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        /* Feature Row Section */
        .features-row-container {
          border-top: 1px solid rgba(231, 225, 216, 0.5) !important;
          border-bottom: 1px solid rgba(231, 225, 216, 0.5) !important;
          padding: 24px 0 !important;
          margin-top: 4.5rem !important;
        }

        .feature-item {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 6px 12px !important;
          transition: all 200ms ease !important;
          cursor: pointer !important;
        }
        
        .feature-item:hover {
          transform: translateY(-1px) !important;
        }

        .feature-item-icon-box {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: var(--landing-gold) !important;
          flex-shrink: 0 !important;
          transition: transform 200ms ease !important;
        }
        
        .feature-item:hover .feature-item-icon-box {
          transform: scale(1.1) !important;
        }



        /* Section 2: Features Showcase Layout */
        .showcase-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          align-items: center !important;
        }
        @media (min-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 1.1fr 1fr !important;
            gap: 64px !important;
          }
        }

        .workbench-mockup-frame {
          background-color: #FFFFFF !important;
          border: 1px solid var(--landing-border) !important;
          border-radius: 20px !important;
          box-shadow: var(--landing-shadow) !important;
          display: flex !important;
          height: 380px !important;
          overflow: hidden !important;
        }

        .workbench-mockup-sidebar {
          width: 170px !important;
          background-color: #FAF9F7 !important;
          border-right: 1px solid var(--landing-border) !important;
          display: flex !important;
          flex-direction: column !important;
          padding: 16px 0 !important;
          height: 100% !important;
        }

        .workbench-mockup-item {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          padding: 10px 18px !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          color: var(--landing-text-secondary) !important;
          text-decoration: none !important;
        }
        .workbench-mockup-item.active {
          background-color: #F2EFE8 !important;
          color: var(--landing-text-primary) !important;
          font-weight: 600 !important;
        }

        .workbench-mockup-panel {
          flex: 1 !important;
          padding: 24px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }

        .workbench-output-card {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 12px 16px !important;
          border: 1px solid var(--landing-border) !important;
          border-radius: 12px !important;
          background-color: #FAF9F7 !important;
          margin-bottom: 10px !important;
        }

        .green-live-badge {
          background-color: rgba(16, 185, 129, 0.08) !important;
          color: #059669 !important;
          border: 1px solid rgba(16, 185, 129, 0.15) !important;
          padding: 2.5px 8px !important;
          border-radius: 20px !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.05em !important;
          font-family: monospace !important;
        }

        .btn-dashed-add {
          border: 1px dashed var(--landing-border) !important;
          border-radius: 12px !important;
          padding: 12px !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          color: var(--landing-gold) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          cursor: pointer !important;
          background: transparent !important;
          transition: all 150ms ease !important;
        }
        .btn-dashed-add:hover {
          background-color: #FAF9F7 !important;
          border-color: var(--landing-gold) !important;
        }

        /* Value Highlight List */
        .value-highlights {
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
        }

        .value-highlight-row {
          display: flex !important;
          align-items: flex-start !important;
          gap: 16px !important;
        }

        .value-highlight-icon-box {
          width: 40px !important;
          height: 40px !important;
          border-radius: 50% !important;
          border: 1px solid var(--landing-border) !important;
          background-color: #FAF9F7 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: var(--landing-gold) !important;
          flex-shrink: 0 !important;
        }

        /* Section 3: CTA Band */
        .get-started-band {
          background-color: transparent !important;
          border-top: none !important;
          border-bottom: none !important;
          width: 100% !important;
          padding: 72px 24px !important;
        }

        .get-started-layout {
          max-width: 1280px !important;
          margin: 0 auto !important;
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 32px !important;
          align-items: center !important;
          justify-content: space-between !important;
        }
        @media (min-width: 1024px) {
          .get-started-layout {
            grid-template-columns: 1fr 1.5fr 1fr !important;
          }
        }

        /* Multi Column Footer */
        .footer-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr repeat(3, 1fr) 1.5fr !important;
          }
        }
        
        .footer-link-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
        }

        .footer-link-item {
          font-size: 13px !important;
          color: var(--landing-text-secondary) !important;
          text-decoration: none !important;
          transition: color 150ms ease !important;
        }
        .footer-link-item:hover {
          color: var(--landing-text-primary) !important;
        }

        .subscription-input-box {
          height: 44px !important;
          border-radius: 8px !important;
          border: 1px solid var(--landing-border) !important;
          background-color: #FAF9F7 !important;
          outline: none !important;
          padding: 0 12px !important;
          font-size: 13px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .subscription-input-box:focus {
          border-color: var(--landing-gold) !important;
        }

        .btn-sub-arrow {
          width: 44px !important;
          height: 44px !important;
          border-radius: 8px !important;
          background-color: var(--landing-gold) !important;
          color: #FFFFFF !important;
          border: none !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: background-color 150ms ease !important;
        }
        .btn-sub-arrow:hover {
          background-color: #bba075 !important;
        }

        /* Section 2: Templates Showcase */
        .templates-section {
          padding: 56px 0 !important;
        }

        .templates-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 24px !important;
        }
        @media (min-width: 640px) {
          .templates-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .templates-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        .template-card {
          background-color: var(--landing-surface) !important;
          border: 1px solid var(--landing-border) !important;
          border-radius: 16px !important;
          padding: 24px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          min-height: 185px !important;
          transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          cursor: pointer !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02) !important;
        }

        .template-card:hover {
          transform: translateY(-4px) !important;
          border-color: var(--landing-gold) !important;
          box-shadow: 0 12px 24px rgba(200, 168, 128, 0.08) !important;
        }

        .template-tag {
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          color: var(--landing-gold) !important;
          background-color: rgba(200, 168, 128, 0.08) !important;
          padding: 3px 7px !important;
          border-radius: 6px !important;
          display: inline-block !important;
        }
      `}</style>

      {/* STICKY NAV (72px) - Extended Edge to Edge */}
      <header className="landing-header-sticky sticky top-0 z-50 w-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/savor-logo.jpg" alt="Savor Studio Logo" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} className="border border-[#E7E1D8] shadow-sm" />
            <span className="text-sm font-semibold tracking-tight text-[#171717]">
              Savor<span className="text-zinc-500 font-normal ml-0.5">Studio</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            <a href="#features" className="nav-link-item">Features</a>
            <a href="#workflow" className="nav-link-item">How it Works</a>
            <a href="#templates" className="nav-link-item">Templates</a>
            <a href="#pricing" className="nav-link-item">Pricing</a>
            <a href="#docs" className="nav-link-item">Docs</a>
          </nav>

          <button
            onClick={onOpenStudio}
            className="btn-nav-launch"
          >
            Launch App <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION - RESTRUCTURED TO 2-COLUMN SPLIT GRID */}
      <section id="sandbox-anchor" className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: '5rem' }}>

          {/* Left Column: marketing copy/CTAs (col-span-5) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[32px] bg-[var(--color-marigold)] text-[10px] font-bold text-[var(--color-onyx)] uppercase tracking-wider font-mono animate-fade-in">
              <Sparkles className="w-3 h-3 text-[var(--color-onyx)] fill-current" />
              <span>Savor Studio 2.0 Beta</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-[#171717] leading-[1.08] hero-title-font text-left animate-fade-in delay-100">
              One dining schema.<br />
              Rendered <span className="gold-italic-text">everywhere.</span>
            </h1>

            <p style={{ maxWidth: '440px' }} className="text-sm sm:text-base text-zinc-500 leading-relaxed text-left animate-fade-in delay-200">
              An engineering-grade restaurant workbench. Sync promotional emails, tableside QR menus, and physical prints in real-time from a single source of truth.
            </p>

            <div className="flex flex-row gap-4 pt-2 animate-fade-in delay-300">
              <button
                onClick={onOpenStudio}
                className="btn-premium-primary"
              >
                Enter Studio Workbench <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenStudio}
                className="btn-premium-secondary"
              >
                <BookOpen className="w-4 h-4 text-zinc-400" /> Read Spec
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Sandbox browser window (col-span-7) */}
          <div className="lg:col-span-7 w-full animate-fade-in delay-300">
            <div className="premium-card">
              {/* Simulated Browser Title Bar */}
              <div className="flex justify-between items-center bg-[#FBFBFB] border-b border-[#E7E1D8] px-5 py-3">
                {/* Logo / Path Breadcrumb */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/15" />
                  </div>
                  <div className="h-4 w-[1px] bg-[#E7E1D8] mx-1" />
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="font-semibold text-zinc-800">savor.studio</span>
                    <span className="text-zinc-400">/</span>
                    <span>sandbox</span>
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full ml-1.5 animate-pulse" />
                    <span className="text-zinc-600 font-sans font-medium text-[9px]">Live Preview</span>
                  </div>
                </div>

                {/* Toolbar Buttons */}
                <div className="flex items-center gap-3">
                  {/* Device switcher buttons - no border container */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      style={{ background: 'transparent', border: 'none' }}
                      className={`p-1.5 rounded cursor-pointer transition-all ${deviceMode === 'desktop' ? 'text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                      title="Desktop View"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      style={{ background: 'transparent', border: 'none' }}
                      className={`p-1.5 rounded cursor-pointer transition-all ${deviceMode === 'mobile' ? 'text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                      title="Mobile View"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sandbox Grid (Left: JSON Editor, Right: Live Preview) */}
              <div className="sandbox-grid">

                {/* 2. MIDDLE COLUMN (JSON Schema Editor) */}
                <div className="sandbox-editor-panel">
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Tab controls */}
                    <div className="flex border-b border-[#E7E1D8] bg-[#FAF9F7] px-4">
                      <button
                        onClick={() => setActiveTab('json')}
                        style={{ background: 'transparent', border: 'none' }}
                        className={`py-2 px-3 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTab === 'json' ? 'border-[#C8A880] text-zinc-800' : 'border-transparent text-zinc-400 hover:text-zinc-600'
                          }`}
                      >
                        Schema (JSON)
                      </button>
                      <button
                        onClick={() => setActiveTab('docs')}
                        style={{ background: 'transparent', border: 'none' }}
                        className={`py-2 px-3 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTab === 'docs' ? 'border-[#C8A880] text-zinc-800' : 'border-transparent text-zinc-400 hover:text-zinc-600'
                          }`}
                      >
                        Documentation
                      </button>
                    </div>

                    {/* Editor Content Area */}
                    {activeTab === 'json' ? (
                      <div className="p-4 flex flex-1 overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
                        {/* Monaco-inspired Line Numbers Gutter */}
                        <div className="editor-gutter">
                          {lines.map((_, idx) => (
                            <span key={idx} className="gutter-num">{idx + 1}</span>
                          ))}
                        </div>

                        {/* Styled JSON Code Editor */}
                        <textarea
                          value={jsonCode}
                          onChange={(e) => handleJsonChange(e.target.value)}
                          className="editor-textarea editor-scroll flex-1"
                          style={{ background: 'transparent' }}
                          spellCheck={false}
                          wrap="off"
                        />
                      </div>
                    ) : (
                      <div className="p-5 space-y-4 text-xs text-zinc-600 leading-relaxed overflow-y-auto flex-1 editor-scroll" style={{ height: 'calc(100% - 40px)' }}>
                        <h4 className="font-bold text-zinc-800">Savor Schema Specification</h4>
                        <p>Savor elements are structured using standard JSON keys. Any customization to the JSON content will compile instantly into responsive HTML outputs.</p>
                        <div className="p-3 bg-[#FAF9F7] border border-[#E7E1D8] rounded-lg font-mono text-[10px] text-zinc-500">
                          <strong>restaurantName:</strong> string (max 25)<br />
                          <strong>accentColor:</strong> hex color string<br />
                          <strong>typography:</strong> display stack font name
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status indicator footer */}
                  <div className="border-t border-[#E7E1D8] bg-[#FAF9F7] px-4 py-2 flex justify-between items-center text-[10px] font-mono">
                    {isValidJson ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Schema is valid</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-600 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                        <span>Invalid JSON format</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleJsonChange(getJsonString(restaurantName, selectedAccent))}
                      style={{ background: 'white', border: '1px solid var(--landing-border)' }}
                      className="px-2 py-0.5 rounded hover:bg-[#F2EFE8] text-zinc-500 hover:text-zinc-800 transition-colors text-[9px] cursor-pointer"
                      title="Reformat Schema Code"
                    >
                      Format &lt;/&gt;
                    </button>
                  </div>
                </div>

                {/* 3. RIGHT COLUMN (Live Preview Viewport) */}
                <div className="sandbox-preview-panel">

                  {/* Preview view mode selector tabs */}
                  <div className="px-4 py-2.5 border-b border-[#E7E1D8] bg-[#FAF9F7] flex justify-between items-center">
                    <div className="relative">
                      <select
                        value={previewChannel}
                        onChange={(e) => setPreviewChannel(e.target.value as PreviewChannel)}
                        style={{ background: 'white', border: '1px solid var(--landing-border)' }}
                        className="appearance-none px-3 py-1.5 pr-8 rounded-lg text-[10px] font-semibold text-zinc-800 cursor-pointer shadow-sm outline-none hover:bg-[#FAF9F7] transition-all"
                      >
                        <option value="email">Email Preview</option>
                        <option value="web">Web Preview</option>
                        <option value="document">Print Preview</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none text-zinc-400"></span>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {deviceMode === 'desktop' ? 'Desktop 1200px' : 'Mobile 375px'}
                    </div>
                  </div>

                  {/* Viewport Frame */}
                  <div className="flex-1 p-5 flex items-center justify-center overflow-hidden relative">

                    {/* Scale wrapper mapping device selector with dynamic matching background */}
                    <div
                      style={{
                        width: deviceMode === 'desktop' ? '100%' : '300px',
                        maxWidth: '100%',
                        height: '400px',
                        transition: 'all 250ms ease',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        backgroundColor: getPreviewBgColor(),
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: getRenderTheme().id === 'steakhouse' || getRenderTheme().id === 'lounge'
                          ? 'rgba(255, 255, 255, 0.3) transparent'
                          : 'rgba(0, 0, 0, 0.2) transparent'
                      }}
                      className="border border-[#E7E1D8] relative custom-scroll"
                    >
                      {/* Miniature template renderer zoomed to fit split grid column */}
                      <div
                        style={{
                          zoom: deviceMode === 'desktop' ? 0.62 : 0.55,
                          width: '100%',
                          height: 'auto',
                          overflow: 'visible'
                        }}
                        className="p-4 sandbox-preview-inner"
                      >
                        {previewChannel === 'email' && (
                          <SavorEmail
                            restaurant={getRenderData()}
                            theme={getRenderTheme()}
                          />
                        )}
                        {previewChannel === 'web' && (
                          <SavorWeb
                            restaurant={getRenderData()}
                            theme={getRenderTheme()}
                          />
                        )}
                        {previewChannel === 'document' && (
                          <SavorDocument
                            restaurant={getRenderData()}
                            theme={getRenderTheme()}
                          />
                        )}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURE ITEMS ROW */}
      <section className="max-w-7xl mx-auto px-6 pb-12 relative z-10 animate-fade-in delay-300">
        <div className="features-row-container">
          <div className="features-grid">
            {[
              {
                title: "Single Source of Truth",
                desc: "One schema. All outputs.",
                icon: Code
              },
              {
                title: "Real-time Sync",
                desc: "Instant updates everywhere.",
                icon: RotateCcw
              },
              {
                title: "Multi-Channel Ready",
                desc: "Email, QR, Print & more.",
                icon: Mail
              },
              {
                title: "Developer Friendly",
                desc: "JSON-first. Built for scale.",
                icon: Terminal
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="feature-item"
                >
                  <div className="feature-item-icon-box">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-xs font-bold text-[#171717]">{feat.title}</h4>
                    <p className="text-[11px] text-[#6B6B6B] leading-normal" style={{ marginTop: '2px' }}>{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: TEMPLATE SHOWCASE */}
      <section id="templates" className="max-w-7xl mx-auto px-6 py-16 relative z-10 templates-section animate-fade-in delay-300">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-8">
          <span className="text-[10px] font-bold text-[#C8A880] uppercase tracking-wider font-mono">Templates</span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#171717] hero-title-font">
            Designed for every culinary <span className="gold-italic-text">style</span>
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Choose from our pre-compiled design tokens to match your brand identity instantly. Click any template to try it in the sandbox.
          </p>
        </div>

        <div className="templates-grid">
          {SAVOR_THEMES.map((theme) => {
            return (
              <div
                key={theme.id}
                onClick={() => handleSelectTemplate(theme.id)}
                className="template-card"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="template-tag">
                      {theme.id === 'steakhouse' ? 'Luxury' : theme.id === 'trattoria' ? 'Rustic' : theme.id === 'sushi' ? 'Minimal' : theme.id === 'bistro' ? 'Classic' : theme.id === 'cafe' ? 'Warm' : 'Modern'}
                    </span>

                    {/* Visual Color Palette circles */}
                    <div className="flex gap-1">
                      <span style={{ backgroundColor: theme.colors.primary }} className="w-2.5 h-2.5 rounded-full border border-black/5" />
                      <span style={{ backgroundColor: theme.colors.background }} className="w-2.5 h-2.5 rounded-full border border-black/5" />
                      <span style={{ backgroundColor: theme.colors.surface }} className="w-2.5 h-2.5 rounded-full border border-black/5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-800 mt-2">{theme.name}</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">{theme.tagline}</p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-400">
                    {theme.fontFamilyTitle.split(',')[0].replace(/'/g, '')}
                  </span>
                  <span className="text-[10px] font-semibold text-[#C8A880] hover:text-[#bba075] transition-colors flex items-center gap-1">
                    Try Template <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 3: GET STARTED CALL TO ACTION BAND */}
      <section id="pricing" className="get-started-band">
        <div className="get-started-layout">
          {/* Left: Lifestyle Photo */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/dining-lifestyle.png"
              alt="Dining Table Setting Mockup"
              style={{ width: '180px', height: '180px', borderRadius: '16px', objectFit: 'cover' }}
              className="border border-[#E7E1D8] shadow-md"
            />
          </div>

          {/* Center: Pitch & CTA button */}
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-[#C8A880] uppercase tracking-wider font-mono">Get Started</span>
            <h2 className="text-3xl font-light tracking-tight text-[#171717] hero-title-font leading-none">
              One schema to power<br />
              every <span className="gold-italic-text">experience</span>
            </h2>
            <p style={{ maxWidth: '420px' }} className="text-xs text-zinc-500 leading-relaxed mx-auto">
              Join early access and help shape the future of restaurant content infrastructure.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenStudio}
                className="btn-premium-primary"
              >
                Launch Savor Studio <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">No credit card required.</p>
          </div>

          {/* Right: tableside QR card stand mockup */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/tableside-qr.png"
              alt="Tableside QR Stand Mockup"
              style={{ width: '180px', height: '180px', borderRadius: '16px', objectFit: 'cover' }}
              className="border border-[#E7E1D8] shadow-md"
            />
          </div>
        </div>
      </section>

      {/* MULTI-COLUMN SAAS FOOTER */}
      <footer id="docs" className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="footer-grid">
          {/* Column 1: Savor Studio Branding */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <img src="/savor-logo.jpg" alt="Savor Studio Logo" style={{ width: '24px', height: '24px', borderRadius: '5px', objectFit: 'cover' }} className="border border-[#E7E1D8] shadow-sm" />
              <span className="text-xs font-bold tracking-tight text-[#171717]">Savor Studio</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              The unified content workbench for modern restaurant brands.
            </p>
          </div>

          {/* Column 2: Product link directory */}
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wider font-mono">Product</span>
            <div className="footer-link-list">
              <a href="#features" className="footer-link-item">Features</a>
              <a href="#templates" className="footer-link-item">Templates</a>
              <a href="#pricing" className="footer-link-item">Pricing</a>
              <a href="#docs" className="footer-link-item">Docs</a>
            </div>
          </div>

          {/* Column 3: Company links */}
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wider font-mono">Company</span>
            <div className="footer-link-list">
              <a href="#about" className="footer-link-item">About</a>
              <a href="#blog" className="footer-link-item">Blog</a>
              <a href="#careers" className="footer-link-item">Careers</a>
              <a href="#contact" className="footer-link-item">Contact</a>
            </div>
          </div>

          {/* Column 4: Legal policy options */}
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wider font-mono">Legal</span>
            <div className="footer-link-list">
              <a href="#privacy" className="footer-link-item">Privacy</a>
              <a href="#terms" className="footer-link-item">Terms</a>
              <a href="#security" className="footer-link-item">Security</a>
            </div>
          </div>

          {/* Column 5: Newsletter form */}
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wider font-mono">Stay in the loop</span>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Get updates on new features and releases.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="subscription-input-box"
              />
              <button className="btn-sub-arrow">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar links & copyright */}
        <div className="border-t border-[#E7E1D8] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500">
          <p>© 2026 Savor Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com" className="footer-link-item hover:text-zinc-900 transition-colors">GitHub</a>
            <a href="https://twitter.com" className="footer-link-item hover:text-zinc-900 transition-colors">Twitter</a>
            <a href="https://linkedin.com" className="footer-link-item hover:text-zinc-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
