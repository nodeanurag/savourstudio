import React, { useState, useRef } from 'react';
import type { RestaurantData, RestaurantTheme, MenuSection, MenuItem } from '../types';
import { Palette, Info, Utensils, Calendar, Plus, Trash2, Check, Star, Upload, PanelLeftClose } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable Image Upload component converting local files to Base64 Data URLs
interface ImageUploadButtonProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ label, value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isBase64 = value && value.startsWith('data:image/');

  return (
    <div className="flex flex-col">
      <label className="studio-label text-[10px]">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={isBase64 ? 'Local Image File (Uploaded)' : value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste image URL or click Upload"
          className="studio-input flex-1"
          style={{ height: '36px', fontSize: '12px' }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{ height: '36px', boxSizing: 'border-box' }}
          className="studio-btn-secondary text-xs px-3 py-0 flex items-center gap-1.5 shrink-0 border-[rgba(255,255,255,0.06)] bg-white/5 hover:bg-white/10"
        >
          <Upload className="w-3.5 h-3.5" /> Upload
        </button>
      </div>
    </div>
  );
};

interface BrandEditorProps {
  data: RestaurantData;
  onChange: (newData: RestaurantData) => void;
  selectedTheme: RestaurantTheme;
  onThemeChange: (theme: RestaurantTheme) => void;
  themes: RestaurantTheme[];
  onClose?: () => void;
}

export const BrandEditor: React.FC<BrandEditorProps> = ({
  data,
  onChange,
  selectedTheme,
  onThemeChange,
  themes,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'brand' | 'menu' | 'events'>('themes');
  const [openSectionId, setOpenSectionId] = useState<string | null>('appetizers');

  const updateField = (path: string[], value: any) => {
    const clone = JSON.parse(JSON.stringify(data));
    let current = clone;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onChange(clone);
  };

  const addMenuItem = (sectionId: string) => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    const section = (clone.menuSections || []).find(s => s.id === sectionId);
    if (section) {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: 'New Custom Dish',
        description: 'Describe the ingredients and preparation of this culinary creation.',
        price: 15,
        dietary: [],
        isChefRecommended: false
      };
      section.items.push(newItem);
      onChange(clone);
    }
  };

  const removeMenuItem = (sectionId: string, itemId: string) => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    const section = (clone.menuSections || []).find(s => s.id === sectionId);
    if (section) {
      section.items = section.items.filter(i => i.id !== itemId);
      onChange(clone);
    }
  };

  const toggleDietary = (sectionId: string, itemId: string, dietaryName: string) => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    const section = (clone.menuSections || []).find(s => s.id === sectionId);
    if (section) {
      const item = section.items.find(i => i.id === itemId);
      if (item) {
        if (item.dietary.includes(dietaryName)) {
          item.dietary = item.dietary.filter(d => d !== dietaryName);
        } else {
          item.dietary.push(dietaryName);
        }
        onChange(clone);
      }
    }
  };

  const toggleChefSpec = (sectionId: string, itemId: string) => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    const section = (clone.menuSections || []).find(s => s.id === sectionId);
    if (section) {
      const item = section.items.find(i => i.id === itemId);
      if (item) {
        item.isChefRecommended = !item.isChefRecommended;
        onChange(clone);
      }
    }
  };

  const addMenuSection = () => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    if (!clone.menuSections) clone.menuSections = [];
    const newSection: MenuSection = {
      id: `section-${Date.now()}`,
      name: 'New Menu Section',
      description: 'Describe the style of courses in this section.',
      items: []
    };
    clone.menuSections.push(newSection);
    onChange(clone);
    setOpenSectionId(newSection.id);
  };

  const removeMenuSection = (sectionId: string) => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    clone.menuSections = (clone.menuSections || []).filter(s => s.id !== sectionId);
    onChange(clone);
  };

  const addEvent = () => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    if (!clone.events) clone.events = [];
    const newEvent = {
      id: `event-${Date.now()}`,
      title: 'New Custom Event',
      date: 'Saturdays from 8:00 PM',
      description: 'Join us for a unique brand tasting experience and botanical beverage pairings.',
      badge: 'Live Event',
      price: 45,
      imageUrl: '/event-tasting.jpg'
    };
    clone.events.push(newEvent);
    onChange(clone);
  };

  const removeEvent = (eventId: string) => {
    const clone = JSON.parse(JSON.stringify(data)) as RestaurantData;
    clone.events = (clone.events || []).filter(e => e.id !== eventId);
    onChange(clone);
  };

  return (
    <div 
      style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border-studio)' }}
      className="w-full md:w-[420px] shrink-0 border-r flex flex-col h-full overflow-hidden min-h-0"
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[var(--border-studio)] flex justify-between items-center bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
          Studio Editor
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-md hover:bg-[var(--color-frost-white)] transition-all"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Editor Navigation Tabs */}
      <div className="px-4 py-3 bg-[var(--color-frost-white)] border-b border-[var(--border-studio)]">
        <div 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', borderColor: 'var(--border-studio)' }}
          className="flex items-center p-1 rounded-xl border relative"
        >
          {[
            { id: 'themes', label: 'Themes', icon: Palette },
            { id: 'brand', label: 'Brand', icon: Info },
            { id: 'menu', label: 'Menu', icon: Utensils },
            { id: 'events', label: 'Events', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{ 
                  backgroundColor: isActive ? '#181d26' : 'transparent', 
                  border: 'none' 
                }}
                className={`relative flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 ${
                  isActive ? 'text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5 custom-scroll space-y-6 min-h-0">
        <AnimatePresence mode="wait">
          {/* THEMES TAB */}
          {activeTab === 'themes' && (
            <motion.div
              key="themes"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <span className="studio-label">Select Brand Theme</span>
              {themes.map(t => {
                const isSelected = selectedTheme.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t)}
                    style={{
                      backgroundColor: isSelected ? 'var(--color-pure-white)' : 'transparent',
                      borderColor: isSelected ? 'var(--color-onyx)' : 'var(--color-silver-border)',
                      boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none'
                    }}
                    className="w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-[var(--text-primary)]">{t.name}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[var(--color-onyx)] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed pr-6">{t.tagline}</p>
                    
                    {/* Tiny Color Swatch preview */}
                    <div className="flex gap-1.5 mt-3">
                      <span className="w-4 h-4 rounded-full border border-[var(--border-studio)]" style={{ backgroundColor: t.colors.primary }} />
                      <span className="w-4 h-4 rounded-full border border-[var(--border-studio)]" style={{ backgroundColor: t.colors.secondary }} />
                      <span className="w-4 h-4 rounded-full border border-[var(--border-studio)]" style={{ backgroundColor: t.colors.background }} />
                      <span className="w-4 h-4 rounded-full border border-[var(--border-studio)]" style={{ backgroundColor: t.colors.surface }} />
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* BRAND INFO TAB */}
          {activeTab === 'brand' && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-col">
                <label className="studio-label">Restaurant Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={e => updateField(['name'], e.target.value)}
                  className="studio-input"
                />
              </div>

              <div className="flex flex-col">
                <label className="studio-label">Tagline</label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={e => updateField(['tagline'], e.target.value)}
                  className="studio-input"
                />
              </div>

              <div className="flex flex-col">
                <label className="studio-label">Description</label>
                <textarea
                  rows={3}
                  value={data.description}
                  onChange={e => updateField(['description'], e.target.value)}
                  className="studio-input resize-none"
                />
              </div>

              {/* Upload image controls for Logo & Hero image */}
              <ImageUploadButton
                label="Logo Image"
                value={data.logoUrl}
                onChange={val => updateField(['logoUrl'], val)}
              />

              <ImageUploadButton
                label="Hero Cover Image"
                value={data.heroImageUrl}
                onChange={val => updateField(['heroImageUrl'], val)}
              />

              {/* Contact Details Header and Subfields */}
              <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 space-y-3">
                <span className="studio-label text-[#c5a880]">Contact Details</span>
                
                {/* 2-Column Input Row for Contact details */}
                <div className="flex gap-3">
                  <div className="flex-1 flex flex-col">
                    <label className="studio-label">Phone</label>
                    <input
                      type="text"
                      value={data.contact.phone}
                      onChange={e => updateField(['contact', 'phone'], e.target.value)}
                      className="studio-input"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="studio-label">Email</label>
                    <input
                      type="text"
                      value={data.contact.email}
                      onChange={e => updateField(['contact', 'email'], e.target.value)}
                      className="studio-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="studio-label">Address</label>
                  <input
                    type="text"
                    value={data.contact.address}
                    onChange={e => updateField(['contact', 'address'], e.target.value)}
                    className="studio-input"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* MENU ITEMS TAB */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="studio-label">Menu Sections</span>
                <button
                  onClick={addMenuSection}
                  className="studio-btn-secondary text-xs py-1 px-3 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Section
                </button>
              </div>

              {((data.menuSections) || []).map((sec, secIdx) => {
                const isOpen = openSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    className="border border-[var(--border-studio)] rounded-xl overflow-hidden bg-[var(--color-pure-white)] shadow-sm"
                  >
                    {/* Section Header Accordion */}
                    <div
                      onClick={() => setOpenSectionId(isOpen ? null : sec.id)}
                      className="p-3.5 flex justify-between items-center cursor-pointer bg-[var(--color-pure-white)] hover:bg-[var(--color-frost-white)]"
                    >
                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)]">{sec.name || 'Untitled Section'}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">{sec.items.length} items</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMenuSection(sec.id);
                        }}
                        style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        className="text-[var(--text-secondary)] hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Section Accordion Body */}
                    {isOpen && (
                      <div className="p-4 border-t border-[var(--border-studio)] space-y-4 bg-[var(--color-frost-white)]">
                        <div className="flex flex-col">
                          <label className="studio-label text-[10px]">Section Name</label>
                          <input
                            type="text"
                            value={sec.name}
                            onChange={e => {
                              const updatedSections = [...data.menuSections];
                              updatedSections[secIdx].name = e.target.value;
                              updateField(['menuSections'], updatedSections);
                            }}
                            className="studio-input"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="studio-label text-[10px]">Section Description</label>
                          <input
                            type="text"
                            value={sec.description || ''}
                            onChange={e => {
                              const updatedSections = [...data.menuSections];
                              updatedSections[secIdx].description = e.target.value;
                              updateField(['menuSections'], updatedSections);
                            }}
                            className="studio-input"
                          />
                        </div>

                        {/* List items inside section */}
                        <div className="pt-3 space-y-4 border-t border-[rgba(255,255,255,0.04)]">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-gray-400">Dishes</span>
                            <button
                              onClick={() => addMenuItem(sec.id)}
                              style={{ background: 'transparent', border: 'none' }}
                              className="text-xs text-[#c5a880] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Dish
                            </button>
                          </div>

                           {sec.items.map((item, itemIdx) => (
                            <div
                              key={item.id}
                              style={{ border: '1px solid var(--border-studio)', background: 'var(--color-pure-white)', padding: '12px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}
                              className="space-y-3"
                            >
                              {/* Aligned Header Row for Dish Card */}
                              <div className="flex justify-between items-center pb-2 border-b border-[var(--border-studio)]">
                                <span className="text-xs font-bold text-[var(--color-onyx)]">Dish #{itemIdx + 1}</span>
                                <button
                                  onClick={() => removeMenuItem(sec.id, item.id)}
                                  style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--color-steel)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  className="hover:text-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex flex-col">
                                <label className="studio-label text-[10px]">Dish Title</label>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={e => {
                                    const updatedSections = [...data.menuSections];
                                    updatedSections[secIdx].items[itemIdx].name = e.target.value;
                                    updateField(['menuSections'], updatedSections);
                                  }}
                                  className="studio-input py-1 text-xs"
                                />
                              </div>

                              {/* Price and Signature side-by-side with aligned height */}
                              <div className="flex gap-3">
                                <div className="flex-1 flex flex-col">
                                  <label className="studio-label text-[10px]">Price ($)</label>
                                  <input
                                    type="number"
                                    value={item.price}
                                    onChange={e => {
                                      const updatedSections = [...data.menuSections];
                                      updatedSections[secIdx].items[itemIdx].price = parseFloat(e.target.value) || 0;
                                      updateField(['menuSections'], updatedSections);
                                    }}
                                    className="studio-input py-1 text-xs"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col">
                                  <label className="studio-label text-[10px]">&nbsp;</label>
                                  <button
                                    onClick={() => toggleChefSpec(sec.id, item.id)}
                                    style={{ height: '36px', boxSizing: 'border-box' }}
                                    className={`w-full flex items-center justify-center gap-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                      item.isChefRecommended
                                        ? 'bg-[var(--color-onyx)] text-white border-[var(--color-onyx)] shadow-sm'
                                        : 'bg-[var(--color-pure-white)] border-[var(--border-studio)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-frost-white)]'
                                    }`}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${item.isChefRecommended ? 'fill-current' : ''}`} /> Signature
                                  </button>
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <label className="studio-label text-[10px]">Description</label>
                                <textarea
                                  rows={2}
                                  value={item.description}
                                  onChange={e => {
                                    const updatedSections = [...data.menuSections];
                                    updatedSections[secIdx].items[itemIdx].description = e.target.value;
                                    updateField(['menuSections'], updatedSections);
                                  }}
                                  className="studio-input py-1 text-xs resize-none"
                                />
                              </div>

                              <div className="flex flex-col">
                                <label className="studio-label text-[10px]">Plating & Quality Specs (One per line)</label>
                                <textarea
                                  rows={3}
                                  value={item.recipeSpecs || ''}
                                  placeholder={"Ensure portion weights match guidelines.\nServe hot at 145°F within 8 minutes."}
                                  onChange={e => {
                                    const updatedSections = [...data.menuSections];
                                    updatedSections[secIdx].items[itemIdx].recipeSpecs = e.target.value;
                                    updateField(['menuSections'], updatedSections);
                                  }}
                                  className="studio-input py-1 text-xs resize-y"
                                />
                              </div>

                              {/* Dietary Badges Customization pills */}
                              <div>
                                <label className="studio-label text-[9px] mb-1.5">Dietary Markers</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {['Vegetarian', 'Gluten-Free', 'Nut-Free', 'Dairy-Free'].map(diet => {
                                    const hasDiet = item.dietary.includes(diet);
                                    return (
                                      <button
                                        key={diet}
                                        onClick={() => toggleDietary(sec.id, item.id, diet)}
                                        style={{ 
                                          background: hasDiet ? 'var(--color-marigold)' : 'var(--color-frost-white)',
                                          border: `1px solid ${hasDiet ? 'var(--color-marigold)' : 'var(--border-studio)'}`,
                                          color: hasDiet ? 'var(--color-onyx)' : 'var(--color-graphite)',
                                          borderRadius: '20px',
                                          padding: '4px 10px',
                                          fontSize: '10px',
                                          fontWeight: 600,
                                          cursor: 'pointer',
                                          transition: 'all 0.2s'
                                        }}
                                        className="hover:text-[var(--text-primary)]"
                                      >
                                        {diet.replace('-Free', '').replace('arian', '')}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* EVENTS & HIGHLIGHTS TAB */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="flex justify-between items-center">
                <span className="studio-label">Restaurant Highlights & Events</span>
                <button
                  onClick={addEvent}
                  className="studio-btn-secondary text-xs py-1 px-3 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Event
                </button>
              </div>

              {((data.events) || []).map((event, eventIdx) => (
                <div
                  key={event.id}
                  className="p-4 rounded-xl border border-[var(--border-studio)] bg-[var(--color-pure-white)] shadow-sm space-y-3"
                >
                  {/* Event Header Row */}
                  <div className="flex justify-between items-center pb-2 border-b border-[var(--border-studio)]">
                    <span className="text-xs font-bold text-[var(--color-onyx)]">Event #{eventIdx + 1}</span>
                    <button
                      onClick={() => removeEvent(event.id)}
                      style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--color-steel)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      className="hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <label className="studio-label text-[10px]">Event/Promo Title</label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={e => {
                        const updatedEvents = [...data.events];
                        updatedEvents[eventIdx].title = e.target.value;
                        updateField(['events'], updatedEvents);
                      }}
                      className="studio-input"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="studio-label text-[10px]">Date & Timing</label>
                    <input
                      type="text"
                      value={event.date}
                      onChange={e => {
                        const updatedEvents = [...data.events];
                        updatedEvents[eventIdx].date = e.target.value;
                        updateField(['events'], updatedEvents);
                      }}
                      className="studio-input"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 flex flex-col">
                      <label className="studio-label text-[10px]">Price / Cover ($)</label>
                      <input
                        type="number"
                        value={event.price || 0}
                        onChange={e => {
                          const updatedEvents = [...data.events];
                          updatedEvents[eventIdx].price = parseFloat(e.target.value) || undefined;
                          updateField(['events'], updatedEvents);
                        }}
                        className="studio-input"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="studio-label text-[10px]">Badge Label</label>
                      <input
                        type="text"
                        value={event.badge}
                        onChange={e => {
                          const updatedEvents = [...data.events];
                          updatedEvents[eventIdx].badge = e.target.value;
                          updateField(['events'], updatedEvents);
                        }}
                        className="studio-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="studio-label text-[10px]">Description</label>
                    <textarea
                      rows={2}
                      value={event.description}
                      onChange={e => {
                        const updatedEvents = [...data.events];
                        updatedEvents[eventIdx].description = e.target.value;
                        updateField(['events'], updatedEvents);
                      }}
                      className="studio-input resize-none"
                    />
                  </div>

                  {/* Banner Image with Upload option */}
                  <ImageUploadButton
                    label="Banner Image"
                    value={event.imageUrl}
                    onChange={val => {
                      const updatedEvents = [...data.events];
                      updatedEvents[eventIdx].imageUrl = val;
                      updateField(['events'], updatedEvents);
                    }}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
