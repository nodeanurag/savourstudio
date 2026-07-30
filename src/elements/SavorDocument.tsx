import React, { useState } from 'react';
import type { RestaurantData, RestaurantTheme } from '../types';
import { MenuSection } from './blocks';

export interface SavorDocumentProps {
  restaurant: RestaurantData;
  theme: RestaurantTheme;
}

export const SavorDocument: React.FC<SavorDocumentProps> = ({ restaurant, theme }) => {
  const [layoutMode, setLayoutMode] = useState<'dining' | 'recipe'>('dining');
  const isDarkTheme = theme.id === 'steakhouse' || theme.id === 'lounge';

  return (
    <div
      style={{
        backgroundColor: isDarkTheme ? '#1e1e24' : '#f3f4f6',
        padding: '24px 10px',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      {/* Mini Toggle inside Preview */}
      <div
        style={{
          display: 'inline-flex',
          backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          padding: '4px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: `1px solid ${theme.colors.border}`,
          zIndex: 10
        }}
      >
        <button
          onClick={() => setLayoutMode('dining')}
          style={{
            backgroundColor: layoutMode === 'dining' ? theme.colors.primary : 'transparent',
            color: layoutMode === 'dining' 
              ? (theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff') 
              : theme.colors.textDark,
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: theme.fontFamilyTitle,
            transition: 'all 0.2s ease'
          }}
        >
          Print Dining Menu
        </button>
        <button
          onClick={() => setLayoutMode('recipe')}
          style={{
            backgroundColor: layoutMode === 'recipe' ? theme.colors.primary : 'transparent',
            color: layoutMode === 'recipe' 
              ? (theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff') 
              : theme.colors.textDark,
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: theme.fontFamilyTitle,
            transition: 'all 0.2s ease'
          }}
        >
          Kitchen Recipe Cards
        </button>
      </div>

      {layoutMode === 'dining' ? (
        /* A4 / Letter Styled Print Page */
        <div
          style={{
            width: '100%',
            maxWidth: '650px',
            minHeight: '840px',
            backgroundColor: theme.colors.background,
            color: theme.colors.textDark,
            fontFamily: theme.fontFamilyBody,
            padding: '50px 40px',
            boxSizing: 'border-box',
            border: `2px solid ${theme.colors.primary}`,
            outline: `1px solid ${theme.colors.primary}44`,
            outlineOffset: '-6px',
            position: 'relative',
            boxShadow: theme.shadows.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Top Decorative Border Corner elements for luxury theme */}
          {theme.accents.dividerStyle === 'ornate' && (
            <>
              <div style={{ position: 'absolute', top: '15px', left: '15px', color: theme.colors.primary, fontSize: '16px' }}>✦</div>
              <div style={{ position: 'absolute', top: '15px', right: '15px', color: theme.colors.primary, fontSize: '16px' }}>✦</div>
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', color: theme.colors.primary, fontSize: '16px' }}>✦</div>
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', color: theme.colors.primary, fontSize: '16px' }}>✦</div>
            </>
          )}

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1
              style={{
                fontFamily: theme.fontFamilyTitle,
                color: theme.colors.primary,
                fontSize: '2.5rem',
                fontWeight: 700,
                margin: '0 0 4px 0',
                textTransform: theme.id === 'steakhouse' || theme.id === 'sushi' ? 'uppercase' : 'none',
                letterSpacing: '0.08em'
              }}
            >
              {restaurant.name}
            </h1>
            <p
              style={{
                fontFamily: theme.fontFamilyTitle,
                color: theme.colors.textLight,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                margin: 0
              }}
            >
              {restaurant.tagline}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px', fontSize: '11px', color: theme.colors.textLight }}>
              <span>{restaurant.contact.address}</span>
              <span>•</span>
              <span>{restaurant.contact.phone}</span>
            </div>
          </div>

          {/* Menu Sections (Layout optimized for print) */}
          <div style={{ flex: 1 }}>
            {restaurant.menuSections.map((sec) => (
              <MenuSection key={sec.id} section={sec} theme={theme} />
            ))}
          </div>

          {/* Mini Footnote */}
          <div
            style={{
              textAlign: 'center',
              borderTop: `1px solid ${theme.colors.border}`,
              paddingTop: '20px',
              fontSize: '10px',
              color: theme.colors.textLight,
              lineHeight: 1.5
            }}
          >
            <p style={{ fontStyle: 'italic', margin: '0 0 6px 0' }}>
              Please inform your server of any dietary allergies before placing your order.
            </p>
            <p style={{ margin: 0, opacity: 0.8 }}>
              © {new Date().getFullYear()} {restaurant.name} • Private Dining Menu
            </p>
          </div>
        </div>
      ) : (
        /* Kitchen Recipe / Prep Cards Grid */
        <div style={{ width: '100%', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {restaurant.menuSections
            .flatMap((s) => s.items)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.textDark,
                  fontFamily: theme.fontFamilyBody,
                  padding: '24px',
                  borderRadius: theme.borders.cardRadius,
                  border: `2px solid ${theme.colors.border}`,
                  boxShadow: theme.shadows.cardShadow,
                  boxSizing: 'border-box',
                  position: 'relative'
                }}
              >
                {/* Header Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: theme.colors.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Prep Card • ${item.price.toFixed(2)}
                </div>

                {/* Recipe Title */}
                <h3
                  style={{
                    fontFamily: theme.fontFamilyTitle,
                    fontSize: '1.4rem',
                    margin: '0 0 6px 0',
                    color: theme.colors.textDark
                  }}
                >
                  {item.name}
                </h3>
                
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                  {item.isChefRecommended && (
                    <span style={{ fontSize: '9px', fontWeight: 700, backgroundColor: theme.colors.primary, color: isDarkTheme ? '#0b0b0c' : '#fff', padding: '2px 6px', borderRadius: '4px' }}>
                      SIGNATURE DISH
                    </span>
                  )}
                  {item.dietary.map((d, idx) => (
                    <span key={idx} style={{ fontSize: '9px', fontWeight: 600, backgroundColor: theme.colors.border, color: theme.colors.textLight, padding: '2px 6px', borderRadius: '4px' }}>
                      {d.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Simulated Recipe Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: `1px solid ${theme.colors.border}`, paddingTop: '12px' }}>
                  <div>
                    <h5 style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: theme.colors.textDark }}>
                      Description
                    </h5>
                    <p style={{ margin: 0, fontSize: '12px', color: theme.colors.textLight, lineHeight: 1.4 }}>
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: theme.colors.textDark }}>
                      Plating & Quality Specs
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: theme.colors.textLight, lineHeight: 1.4 }}>
                      {item.recipeSpecs ? (
                        item.recipeSpecs.split('\n').filter(line => line.trim().length > 0).map((line, idx) => (
                          <li key={idx} style={{ marginBottom: '2px' }}>{line}</li>
                        ))
                      ) : (
                        <>
                          <li>Ensure portion weights match guidelines.</li>
                          <li>Serve hot at 145°F within 8 minutes.</li>
                          <li>Garnish according to brand board standards.</li>
                          <li>Double check allergy request tags.</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
