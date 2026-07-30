import React, { useState } from 'react';
import type { RestaurantData, RestaurantTheme } from '../types';
import { DEFAULT_RESTAURANT_DATA } from '../data/default-restaurant';
import { SAVOR_THEMES } from '../themes';
import { BrandEditor } from './BrandEditor';
import { PreviewLayout } from './PreviewLayout';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface StudioDashboardProps {
  onExit: () => void;
}

export const StudioDashboard: React.FC<StudioDashboardProps> = ({ onExit }) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantData>(DEFAULT_RESTAURANT_DATA);
  const [selectedTheme, setSelectedTheme] = useState<RestaurantTheme>(SAVOR_THEMES[0]); // Default to Luxury Steakhouse
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true); // Sidebar toggle control

  const handleReset = () => {
    setRestaurantData(DEFAULT_RESTAURANT_DATA);
    setSelectedTheme(SAVOR_THEMES[0]);
    toast.success('Workspace reset to default restaurant!');
  };

  return (
    <div 
      className="flex flex-col h-screen overflow-hidden bg-[var(--bg-studio)] text-[var(--text-primary)]"
    >
      {/* Sonner Toast Notification Center */}
      <Toaster position="bottom-right" theme="light" toastOptions={{
        style: {
          background: 'var(--color-pure-white)',
          border: '1px solid var(--color-silver-border)',
          color: 'var(--color-onyx)'
        }
      }} />

      {/* Dashboard Top Header Bar */}
      <header className="h-16 shrink-0 border-b border-[var(--border-studio)] bg-white px-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            style={{ background: 'transparent', border: 'none' }}
            className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-[var(--color-frost-white)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          
          <div className="h-4 w-[1px] bg-[var(--border-studio)]" />

          <div className="flex items-center gap-2">
            <img src="/savor-logo.jpg" alt="Savor Studio Logo" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} className="border border-[var(--border-studio)]" />
            <h1 className="text-sm font-semibold tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
              <span>Savor<span className="text-[var(--text-muted)] font-normal ml-0.5">Studio</span></span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h1>
          </div>
        </div>

        {/* Selected Theme Details Banner & Reset controls */}
        <div className="flex items-center gap-2">

          <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-onyx)]/5 px-2.5 py-1 rounded-[32px]">
            <Sparkles className="w-3 h-3 text-[var(--color-onyx)] fill-current" />
            <span className="text-[var(--text-muted)]">Theme:</span>
            <span className="text-[var(--text-primary)]">{selectedTheme.name}</span>
          </div>

          <button
            onClick={handleReset}
            style={{ background: 'var(--color-pure-white)' }}
            className="border border-[var(--border-studio)] hover:border-red-200 hover:bg-red-50 text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-[32px] flex items-center gap-1 cursor-pointer text-[var(--text-secondary)] hover:text-red-600 transition-all duration-200"
            title="Reset Workspace to default data"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </header>

      {/* Workspace Area: Editor Sidebar & Previews Panel */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0">
        {sidebarOpen && (
          <BrandEditor
            data={restaurantData}
            onChange={setRestaurantData}
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
            themes={SAVOR_THEMES}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        
        <PreviewLayout
          restaurant={restaurantData}
          theme={selectedTheme}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
};
