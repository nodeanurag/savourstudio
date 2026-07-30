import React, { useState } from 'react';
import type { RestaurantData, RestaurantTheme } from '../types';
import { SavorEmail } from '../elements/SavorEmail';
import { SavorWeb } from '../elements/SavorWeb';
import { SavorDocument } from '../elements/SavorDocument';
import { generateEmailHtml, generateDocumentHtml } from '../utils/exporter';

import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { Mail, Smartphone, FileText, LayoutGrid, Copy, Download, Code, PanelLeftOpen, ChevronDown, FileImage } from 'lucide-react';
 
interface PreviewLayoutProps {
  restaurant: RestaurantData;
  theme: RestaurantTheme;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}
 
type PreviewMode = 'email' | 'web' | 'document' | 'split';
 
export const PreviewLayout: React.FC<PreviewLayoutProps> = ({ 
  restaurant, 
  theme,
  sidebarOpen = true,
  onToggleSidebar
}) => {
  const [activeMode, setActiveMode] = useState<PreviewMode>('split');
  const [showCodeInspect, setShowCodeInspect] = useState<boolean>(false);
  const [showExportDropdown, setShowExportDropdown] = useState<boolean>(false);

  // Success Handler (confetti + toast)
  const handleCopySuccess = (msg: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: [theme.colors.primary, theme.colors.secondary, '#ffffff']
    });
    toast.success(msg);
  };

  const copyEmailHtml = () => {
    const html = generateEmailHtml(restaurant, theme);
    navigator.clipboard.writeText(html);
    handleCopySuccess('Email HTML copied to clipboard!');
  };

  const copyDocHtml = () => {
    const html = generateDocumentHtml(restaurant, theme);
    navigator.clipboard.writeText(html);
    handleCopySuccess('Document HTML copied to clipboard!');
  };

  const downloadJson = () => {
    const jsonStr = JSON.stringify(restaurant, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${restaurant.name.toLowerCase().replace(/\s+/g, '-')}-savor-studio.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Restaurant JSON configuration downloaded!');
  };

  const exportPdf = () => {
    let htmlContent = '';
    if (activeMode === 'email') {
      htmlContent = generateEmailHtml(restaurant, theme);
    } else if (activeMode === 'document' || activeMode === 'split') {
      htmlContent = generateDocumentHtml(restaurant, theme);
    } else {
      toast.error("PDF export is supported for Email and Document views.");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Let images and custom stylesheets load
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  };

  const exportImage = async () => {
    const toastId = toast.loading("Generating full image...");
    try {
      let elementId = '';
      if (activeMode === 'email') {
        elementId = 'email-preview-container';
      } else if (activeMode === 'document') {
        elementId = 'document-preview-container';
      } else if (activeMode === 'web') {
        elementId = 'web-preview-container';
      } else if (activeMode === 'split') {
        elementId = 'document-preview-split';
      }
      
      const target = document.getElementById(elementId);
      if (!target) {
        toast.dismiss(toastId);
        toast.error("Could not find preview element to export.");
        return;
      }
 
      // Clone the element to render the full height offscreen
      const clone = target.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.top = '0px';
      clone.style.left = '-9999px';
      clone.style.transform = 'none';
      clone.style.width = (activeMode === 'split' ? '500px' : target.getBoundingClientRect().width + 'px');
      clone.style.height = 'auto';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';
 
      // Reset scroll containers inside clone to show full content
      const scrollContainers = clone.querySelectorAll('.overflow-y-auto, [style*="height"]');
      scrollContainers.forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = 'auto';
        htmlEl.style.maxHeight = 'none';
        htmlEl.style.overflow = 'visible';
      });
 
      document.body.appendChild(clone);
 
      // Wait a small frame for layout resolution
      await new Promise(resolve => setTimeout(resolve, 200));
 
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(clone, {
        useCORS: true,
        scale: 2, // 2x resolution
        backgroundColor: null,
        logging: false,
        width: clone.scrollWidth,
        height: clone.scrollHeight
      });
 
      document.body.removeChild(clone);
 
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${restaurant.name.toLowerCase().replace(/\s+/g, '-')}-${activeMode}-preview.png`;
      link.click();
      
      toast.dismiss(toastId);
      handleCopySuccess("Full image downloaded successfully!");
    } catch (err) {
      toast.dismiss(toastId);
      console.error(err);
      toast.error("Failed to generate image.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-studio)] relative">
      
      {/* Sub-Header bar inside viewport containing Mode switchers and action buttons */}
      <header className="h-16 shrink-0 px-6 flex flex-col md:flex-row md:items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              style={{ background: 'var(--color-pure-white)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className={`text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1.5 rounded-lg border border-[var(--border-studio)] hover:bg-[var(--color-frost-white)] transition-all ${
                sidebarOpen ? 'hidden' : 'flex'
              }`}
              title="Expand Sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}

          {/* Mode Switcher Tabs */}
          <div 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', borderColor: 'var(--border-studio)' }}
            className="flex items-center p-1 rounded-xl border relative"
          >
            {[
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'web', label: 'Web QR', icon: Smartphone },
              { id: 'document', label: 'Document', icon: FileText },
              { id: 'split', label: 'Split View', icon: LayoutGrid }
            ].map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveMode(mode.id as PreviewMode);
                    setShowCodeInspect(false);
                  }}
                  style={{ 
                    backgroundColor: isActive ? '#181d26' : 'transparent', 
                    border: 'none' 
                  }}
                  className={`relative px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200 ${
                    isActive ? 'text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <Icon className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} />
                    {mode.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowCodeInspect(!showCodeInspect)}
            style={{ background: 'var(--color-pure-white)' }}
            className={`studio-btn-secondary text-[11px] py-1 px-3 flex items-center gap-1 border-[var(--border-studio)] ${
              showCodeInspect ? 'bg-[var(--accent-purple-glow)] border-[var(--accent-purple)] text-[var(--accent-purple)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Inspect compiled HTML/JSON source"
          >
            <Code className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Code
          </button>
 
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              style={{ background: 'var(--color-pure-white)' }}
              className="studio-btn-secondary text-[11px] py-1 px-3 flex items-center gap-1 border-[var(--border-studio)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Export <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>
 
            {showExportDropdown && (
              <>
                {/* Invisible backdrop to close the dropdown */}
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setShowExportDropdown(false)} 
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white border border-[var(--border-studio)] shadow-lg z-30 py-1 flex flex-col">
                  {/* Copy Email Option */}
                  {(activeMode === 'email' || activeMode === 'split') && (
                    <button
                      onClick={() => {
                        copyEmailHtml();
                        setShowExportDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-frost-white)] flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Copy Email HTML
                    </button>
                  )}
 
                  {/* Copy Document Option */}
                  {(activeMode === 'document' || activeMode === 'split') && (
                    <button
                      onClick={() => {
                        copyDocHtml();
                        setShowExportDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-frost-white)] flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Copy Document HTML
                    </button>
                  )}

                  <div className="h-[1px] bg-[var(--border-studio)] my-1" />

                  {/* Export as PDF Option */}
                  {(activeMode === 'email' || activeMode === 'document' || activeMode === 'split') && (
                    <button
                      onClick={() => {
                        exportPdf();
                        setShowExportDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-frost-white)] flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Export as PDF
                    </button>
                  )}

                  {/* Export as Image Option */}
                  <button
                    onClick={() => {
                      exportImage();
                      setShowExportDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-frost-white)] flex items-center gap-2 border-none bg-transparent cursor-pointer"
                  >
                    <FileImage className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Export as Image
                  </button>

                  <div className="h-[1px] bg-[var(--border-studio)] my-1" />
 
                  {/* Download JSON Option */}
                  <button
                    onClick={() => {
                      downloadJson();
                      setShowExportDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-frost-white)] flex items-center gap-2 border-none bg-transparent cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> Download JSON Config
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Viewport Panels */}
      <div className="flex-1 overflow-y-auto p-6 custom-scroll min-h-0">
        {showCodeInspect ? (
          /* CODE INSPECTOR PANEL */
          <div className="w-full max-w-4xl mx-auto p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(14,12,24,0.7)] backdrop-blur font-mono text-xs text-gray-300 relative select-text overflow-x-auto">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  activeMode === 'email'
                    ? generateEmailHtml(restaurant, theme)
                    : activeMode === 'document'
                    ? generateDocumentHtml(restaurant, theme)
                    : JSON.stringify(restaurant, null, 2)
                );
                handleCopySuccess('Source copied!');
              }}
              className="absolute top-4 right-4 studio-btn-secondary text-xs py-1 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Source
            </button>
            <h4 className="text-[#c5a880] mb-4 text-sm font-bold border-b border-[rgba(255,255,255,0.06)] pb-2 flex items-center gap-2">
              <span>⚡</span> Compiled Code Output ({activeMode.toUpperCase()})
            </h4>
            <pre className="mt-2 text-left leading-relaxed">
              {activeMode === 'email'
                ? generateEmailHtml(restaurant, theme)
                : activeMode === 'document'
                ? generateDocumentHtml(restaurant, theme)
                : JSON.stringify(restaurant, null, 2)}
            </pre>
          </div>
        ) : (
          /* ACTUAL VISUAL RENDERERS */
          <div className="w-full flex justify-center items-start">
            {activeMode === 'email' && (
              <div id="email-preview-container" className="w-full max-w-[620px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <SavorEmail restaurant={restaurant} theme={theme} />
              </div>
            )}
 
            {activeMode === 'web' && (
              <div id="web-preview-container" className="w-full max-w-4xl rounded-xl border border-[var(--border-studio)] bg-white shadow-lg overflow-hidden flex flex-col">
                {/* Desktop Browser Header */}
                <div className="h-10 border-b border-[var(--border-studio)] bg-[var(--color-frost-white)] px-4 flex items-center gap-4 shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 max-w-md mx-auto h-6 rounded-md bg-white border border-[var(--border-studio)] text-[10px] text-[var(--text-muted)] flex items-center justify-center font-mono">
                    https://savor.menu/{restaurant.name.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>
                
                {/* Desktop Webpage Viewport */}
                <div style={{ height: '700px' }} className="overflow-y-auto custom-scroll bg-[var(--bg-studio)] p-6 flex justify-center items-start">
                  <SavorWeb restaurant={restaurant} theme={theme} isWebpageMode={true} />
                </div>
              </div>
            )}
 
            {activeMode === 'document' && (
              <div id="document-preview-container" className="rounded-lg shadow-lg overflow-hidden border border-[var(--border-studio)]">
                <SavorDocument restaurant={restaurant} theme={theme} />
              </div>
            )}
 
            {activeMode === 'split' && (
              /* SPLIT PREVIEW VIEWPORT */
              <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-10 items-start justify-center max-w-[1300px] mx-auto px-2">
                
                {/* Email Column */}
                <div className="w-full max-w-[360px] mx-auto bg-white border border-[var(--border-studio)] rounded-2xl p-4 shadow-sm flex flex-col items-center transition-all hover:border-[var(--color-graphite)]">
                  <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--border-studio)] w-full pb-2.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--color-cobalt-blue)]" style={{ width: '14px', height: '14px' }} />
                    <span>Email Newsletter</span>
                    <span className="ml-auto text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Synced</span>
                  </div>
                  <div className="w-full overflow-y-auto custom-scroll pr-1" style={{ height: '480px' }}>
                    <div id="email-preview-split" className="w-full rounded-xl overflow-hidden border border-[var(--border-studio)] shadow-sm transform scale-[0.82] origin-top">
                      <SavorEmail restaurant={restaurant} theme={theme} />
                    </div>
                  </div>
                </div>
 
                {/* Web Column */}
                <div className="w-full max-w-[310px] mx-auto bg-white border border-[var(--border-studio)] rounded-2xl p-4 shadow-sm flex flex-col items-center transition-all hover:border-[var(--color-graphite)]">
                  <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--border-studio)] w-full pb-2.5">
                    <Smartphone className="w-3.5 h-3.5 text-[var(--color-terracotta)]" style={{ width: '14px', height: '14px' }} />
                    <span>Mobile QR Menu</span>
                    <span className="ml-auto text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Live</span>
                  </div>
                  <div className="w-full overflow-hidden" style={{ height: '480px' }}>
                    <div id="web-preview-split" className="w-full rounded-[24px] border-[5px] border-[var(--color-onyx)] shadow-sm overflow-hidden bg-black transform scale-[0.82] origin-top">
                      <div style={{ height: '580px' }} className="overflow-y-auto custom-scroll pt-2">
                        <SavorWeb restaurant={restaurant} theme={theme} />
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Document Column */}
                <div className="w-full max-w-[380px] mx-auto bg-white border border-[var(--border-studio)] rounded-2xl p-4 shadow-sm flex flex-col items-center transition-all hover:border-[var(--color-graphite)]">
                  <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--border-studio)] w-full pb-2.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" style={{ width: '14px', height: '14px' }} />
                    <span>Print Dining Menu</span>
                    <span className="ml-auto text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Ready</span>
                  </div>
                  <div className="w-full overflow-y-auto custom-scroll pr-1" style={{ height: '480px' }}>
                    <div id="document-preview-split" className="w-full rounded-xl overflow-hidden border border-[var(--border-studio)] shadow-sm transform scale-[0.82] origin-top">
                      <SavorDocument restaurant={restaurant} theme={theme} />
                    </div>
                  </div>
                </div>
 
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
