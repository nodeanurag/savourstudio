import React from 'react';
import type { RestaurantData, RestaurantTheme } from '../types';

export interface SavorEmailProps {
  restaurant: RestaurantData;
  theme: RestaurantTheme;
}

export const SavorEmail: React.FC<SavorEmailProps> = ({ restaurant, theme }) => {
  const isDarkTheme = theme.id === 'steakhouse' || theme.id === 'lounge';

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.textDark,
        fontFamily: theme.fontFamilyBody,
        padding: '30px 10px',
        margin: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borders.cardRadius,
          border: theme.borders.borderStyle === 'none' ? 'none' : `1px solid ${theme.colors.border}`,
          boxShadow: theme.shadows.cardShadow,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Email Header */}
        <div
          style={{
            padding: '30px 20px',
            textAlign: 'center',
            borderBottom: `1px solid ${theme.colors.border}`
          }}
        >
          <h1
            style={{
              fontFamily: theme.fontFamilyTitle,
              color: theme.colors.primary,
              margin: '0 0 5px 0',
              fontSize: '28px',
              fontWeight: 700,
              textTransform: theme.id === 'steakhouse' || theme.id === 'sushi' ? 'uppercase' : 'none',
              letterSpacing: '0.05em'
            }}
          >
            {restaurant.name}
          </h1>
          <p
            style={{
              fontFamily: theme.fontFamilyBody,
              color: theme.colors.textLight,
              margin: 0,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}
          >
            {restaurant.tagline}
          </p>
        </div>

        {/* Hero Banner */}
        <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={restaurant.heroImageUrl}
            alt={restaurant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))',
              padding: '20px',
              color: '#ffffff'
            }}
          >
            <h2
              style={{
                fontFamily: theme.fontFamilyTitle,
                margin: 0,
                fontSize: '22px',
                fontWeight: 600
              }}
            >
              This Week's Specials
            </h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '13px', opacity: 0.85 }}>
              Curated seasonal recipes from Chef Marc Laurent
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div style={{ padding: '24px 20px 10px 20px' }}>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: theme.colors.textLight,
              margin: 0
            }}
          >
            {restaurant.description}
          </p>
        </div>

        {/* featured section divider */}
        <div style={{ padding: '10px 20px', textAlign: 'center' }}>
          <div style={{ height: '1px', backgroundColor: theme.colors.border, width: '100%' }} />
        </div>

        {/* Chef Specials Block */}
        <div style={{ padding: '15px 20px' }}>
          <h3
            style={{
              fontFamily: theme.fontFamilyTitle,
              color: theme.colors.textDark,
              fontSize: '18px',
              fontWeight: 700,
              margin: '0 0 15px 0',
              textTransform: theme.id === 'steakhouse' || theme.id === 'sushi' ? 'uppercase' : 'none',
              letterSpacing: '0.05em'
            }}
          >
            ⭐ Featured Highlights
          </h3>

          {/* List Chef Recommended dishes */}
          {restaurant.menuSections
            .flatMap((s) => s.items)
            .filter((i) => i.isChefRecommended)
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '16px',
                  backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                  borderRadius: theme.borders.cardRadius,
                  border: `1px solid ${theme.colors.border}`,
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4
                    style={{
                      fontFamily: theme.fontFamilyTitle,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: theme.colors.textDark,
                      margin: 0
                    }}
                  >
                    {item.name}
                  </h4>
                  <span
                    style={{
                      fontFamily: theme.fontFamilyTitle,
                      color: theme.colors.primary,
                      fontWeight: 'bold',
                      fontSize: '15px'
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: theme.colors.textLight,
                    lineHeight: 1.5,
                    margin: '6px 0 0 0'
                  }}
                >
                  {item.description}
                </p>
                <div style={{ marginTop: '8px' }}>
                  {item.dietary.map((d, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        fontSize: '9px',
                        fontWeight: 600,
                        backgroundColor: theme.colors.primary + '11',
                        color: theme.colors.primary,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginRight: '5px'
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Event Promo Section */}
        {restaurant.events.length > 0 && (
          <div style={{ padding: '15px 20px', backgroundColor: theme.colors.primary + '0a' }}>
            <h3
              style={{
                fontFamily: theme.fontFamilyTitle,
                color: theme.colors.textDark,
                fontSize: '18px',
                fontWeight: 700,
                margin: '0 0 15px 0'
              }}
            >
              📅 Upcoming Experiences
            </h3>

            {restaurant.events.slice(0, 1).map((event) => (
              <div key={event.id}>
                <div style={{ borderRadius: theme.borders.cardRadius, overflow: 'hidden', height: '140px' }}>
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '12px 0 0 0' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: theme.colors.textDark }}>
                    {event.title} ({event.badge})
                  </h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: theme.colors.primary, fontWeight: 600 }}>
                    {event.date} {event.price ? `• $${event.price}` : ''}
                  </p>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: theme.colors.textLight, lineHeight: 1.5 }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking CTA */}
        <div style={{ padding: '30px 20px', textAlign: 'center' }}>
          <a
            href={`tel:${restaurant.contact.phone}`}
            style={{
              display: 'inline-block',
              backgroundColor: theme.colors.primary,
              color: isDarkTheme ? '#0b0b0c' : '#ffffff',
              padding: '12px 28px',
              fontFamily: theme.fontFamilyTitle,
              fontWeight: 'bold',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: theme.borders.buttonRadius,
              textDecoration: 'none',
              boxShadow: theme.shadows.buttonShadow
            }}
          >
            Secure Your Table
          </a>
          <p style={{ fontSize: '11px', color: theme.colors.textLight, marginTop: '10px' }}>
            Or call us directly at {restaurant.contact.phone}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '24px 20px',
            backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
            borderTop: `1px solid ${theme.colors.border}`,
            textAlign: 'center',
            fontSize: '11px',
            color: theme.colors.textLight,
            lineHeight: 1.6
          }}
        >
          <strong style={{ color: theme.colors.textDark }}>{restaurant.name}</strong><br />
          {restaurant.contact.address}<br />
          {restaurant.contact.email} • {restaurant.contact.phone}<br /><br />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
            {Object.keys(restaurant.socials).map((k) => (
              <span key={k} style={{ color: theme.colors.primary, textTransform: 'capitalize' }}>{k}</span>
            ))}
          </div>
          © {new Date().getFullYear()} {restaurant.name}. Crafted with Savor Studio. All rights reserved.
        </div>
      </div>
    </div>
  );
};
