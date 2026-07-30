import React, { useState } from 'react';
import type { RestaurantData, RestaurantTheme } from '../types';
import { MenuSection, Footer } from './blocks';
import { QRCodeSVG } from 'qrcode.react';

export interface SavorWebProps {
  restaurant: RestaurantData;
  theme: RestaurantTheme;
  isWebpageMode?: boolean;
}
 
export const SavorWeb: React.FC<SavorWebProps> = ({ restaurant, theme, isWebpageMode = false }) => {
  const [activeSection, setActiveSection] = useState<string>('all');
 
  const filteredSections = activeSection === 'all'
    ? restaurant.menuSections
    : restaurant.menuSections.filter(s => s.id === activeSection);
 
  const isDarkTheme = theme.id === 'steakhouse' || theme.id === 'lounge';
 
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.textDark,
        fontFamily: theme.fontFamilyBody,
        minHeight: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0 20px 0'
      }}
    >
      {/* Mobile Wrapper Simulator */}
      <div
        style={{
          width: '100%',
          maxWidth: isWebpageMode ? '800px' : '480px',
          backgroundColor: theme.colors.surface,
          boxShadow: theme.shadows.cardShadow,
          borderRadius: theme.borders.cardRadius === '0px' ? '0px' : '20px',
          border: theme.borders.borderStyle === 'none' ? 'none' : `1px solid ${theme.colors.border}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* Banner with Restaurant Details */}
        <div style={{ position: 'relative', height: isWebpageMode ? '280px' : '200px', overflow: 'hidden' }}>
          <img
            src={restaurant.heroImageUrl}
            alt={restaurant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.accents.heroOverlay || 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <img
                src={restaurant.logoUrl}
                alt="Logo"
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${theme.colors.primary}`
                }}
              />
              <div>
                <h1
                  style={{
                    fontFamily: theme.fontFamilyTitle,
                    color: theme.id === 'sushi' ? '#111111' : '#ffffff',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    margin: 0,
                    textShadow: isDarkTheme ? `0 0 10px ${theme.colors.glow}` : 'none'
                  }}
                >
                  {restaurant.name}
                </h1>
                <p
                  style={{
                    margin: 0,
                    fontSize: '11px',
                    color: isDarkTheme ? theme.colors.textLight : 'rgba(255,255,255,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {restaurant.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Simulated QR Scanner */}
        <div
          style={{
            padding: '16px',
            borderBottom: `1px solid ${theme.colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: theme.colors.primary, textTransform: 'uppercase' }}>
              Tableside Digital Menu
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.colors.textLight, lineHeight: 1.4 }}>
              Scan QR code on table to share menu with friends or order directly.
            </p>
          </div>
          <div
            style={{
              padding: '6px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <QRCodeSVG value={restaurant.socials.website || 'https://savor.studio'} size={50} level="M" />
          </div>
        </div>

        {/* Section Filters Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px',
            overflowX: 'auto',
            borderBottom: `1px solid ${theme.colors.border}`,
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap'
          }}
          className="hide-scrollbar"
        >
          <button
            onClick={() => setActiveSection('all')}
            style={{
              backgroundColor: activeSection === 'all' ? theme.colors.primary : 'transparent',
              color: activeSection === 'all' 
                ? (theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff') 
                : theme.colors.textDark,
              border: `1px solid ${activeSection === 'all' ? theme.colors.primary : theme.colors.border}`,
              borderRadius: theme.borders.buttonRadius,
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: theme.fontFamilyTitle,
              transition: 'all 0.2s ease'
            }}
          >
            All Courses
          </button>
          
          {restaurant.menuSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{
                backgroundColor: activeSection === sec.id ? theme.colors.primary : 'transparent',
                color: activeSection === sec.id 
                  ? (theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff') 
                  : theme.colors.textDark,
                border: `1px solid ${activeSection === sec.id ? theme.colors.primary : theme.colors.border}`,
                borderRadius: theme.borders.buttonRadius,
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: theme.fontFamilyTitle,
                transition: 'all 0.2s ease'
              }}
            >
              {sec.name}
            </button>
          ))}
        </div>

        {/* Menu Listings Container */}
        <div style={{ padding: '20px 16px', flex: 1 }}>
          {filteredSections.map((section) => (
            <MenuSection key={section.id} section={section} theme={theme} />
          ))}
        </div>

        {/* Reservation Quick Button */}
        <div style={{ padding: '0 16px 20px 16px', textAlign: 'center' }}>
          <a
            href={`tel:${restaurant.contact.phone}`}
            style={{
              display: 'block',
              backgroundColor: theme.colors.primary,
              color: theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff',
              padding: '14px',
              borderRadius: theme.borders.buttonRadius,
              fontFamily: theme.fontFamilyTitle,
              fontWeight: 'bold',
              fontSize: '15px',
              textAlign: 'center',
              textDecoration: 'none',
              boxShadow: theme.shadows.buttonShadow,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            📞 Book Table: {restaurant.contact.phone}
          </a>
        </div>

        {/* Studio Footer */}
        <Footer restaurant={restaurant} theme={theme} />
      </div>
    </div>
  );
};
