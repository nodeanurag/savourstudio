import React from 'react';
import type { RestaurantTheme, MenuItem as MenuItemType, MenuSection as MenuSectionType, EventPromo, RestaurantData } from '../types';

// Helper to determine badge colors dynamically based on theme/allergen
const getAllergenStyle = (allergen: string, theme: RestaurantTheme) => {
  const norm = allergen.toLowerCase();
  let bg = 'rgba(255, 255, 255, 0.05)';
  let color = theme.colors.textDark;
  
  if (norm.includes('vegan')) {
    bg = theme.id === 'lounge' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(62, 92, 56, 0.15)';
    color = theme.id === 'lounge' ? '#00F0FF' : theme.colors.secondary;
  } else if (norm.includes('gluten')) {
    bg = 'rgba(212, 175, 55, 0.15)';
    color = '#D4AF37';
  } else if (norm.includes('nut')) {
    bg = 'rgba(140, 45, 25, 0.15)';
    color = '#8C2D19';
  } else if (norm.includes('dairy')) {
    bg = 'rgba(129, 140, 248, 0.15)';
    color = '#818cf8';
  }
  
  return { bg, color };
};

// 1. PriceTag component
export const PriceTag: React.FC<{ price: number; theme: RestaurantTheme }> = ({ price, theme }) => {
  return (
    <span
      style={{
        fontFamily: theme.fontFamilyTitle,
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '0.05em',
        marginLeft: '10px'
      }}
    >
      ${price.toFixed(2)}
    </span>
  );
};

// 2. AllergyBadge component
export const AllergyBadge: React.FC<{ name: string; theme: RestaurantTheme }> = ({ name, theme }) => {
  const styles = getAllergenStyle(name, theme);
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '10px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '3px 8px',
        borderRadius: theme.borders.cardRadius === '0px' ? '0px' : '9999px',
        backgroundColor: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.color}22`,
        marginRight: '6px',
        marginBottom: '4px'
      }}
    >
      {name}
    </span>
  );
};

// 3. ChefRecommendation component
export const ChefRecommendation: React.FC<{ theme: RestaurantTheme }> = ({ theme }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '3px 8px',
        borderRadius: theme.borders.cardRadius === '0px' ? '0px' : '4px',
        backgroundColor: theme.colors.primary,
        color: theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff',
        boxShadow: theme.shadows.buttonShadow,
        marginRight: '6px',
        marginBottom: '4px'
      }}
    >
      ★ Chef's Special
    </span>
  );
};

export const MenuItem: React.FC<{ item: MenuItemType; theme: RestaurantTheme }> = ({ item, theme }) => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: theme.colors.surface,
        border: theme.borders.borderStyle === 'none' ? 'none' : `${theme.borders.borderStyle} ${theme.colors.border}`,
        borderRadius: theme.borders.cardRadius,
        boxShadow: theme.shadows.cardShadow,
        marginBottom: '16px',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ flex: 1, paddingRight: '12px' }}>
          <h4
            style={{
              fontFamily: theme.fontFamilyTitle,
              fontSize: '1.25rem',
              fontWeight: 600,
              color: theme.colors.textDark,
              margin: '0 0 4px 0',
              lineHeight: 1.2
            }}
          >
            {item.name}
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '6px', marginBottom: '2px' }}>
            {item.isChefRecommended && <ChefRecommendation theme={theme} />}
            {item.dietary.map((diet, idx) => (
              <AllergyBadge key={idx} name={diet} theme={theme} />
            ))}
          </div>
        </div>
        <PriceTag price={item.price} theme={theme} />
      </div>
      
      <p
        style={{
          fontFamily: theme.fontFamilyBody,
          fontSize: '0.9rem',
          color: theme.colors.textLight,
          margin: '8px 0 0 0',
          lineHeight: 1.5,
          fontWeight: 400
        }}
      >
        {item.description}
      </p>
    </div>
  );
};

// 5. MenuSection component
export const MenuSection: React.FC<{ section: MenuSectionType; theme: RestaurantTheme }> = ({ section, theme }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3
          style={{
            fontFamily: theme.fontFamilyTitle,
            fontSize: '1.8rem',
            fontWeight: 700,
            color: theme.colors.textDark,
            margin: '0 0 6px 0',
            textTransform: theme.id === 'steakhouse' || theme.id === 'sushi' ? 'uppercase' : 'none',
            letterSpacing: theme.id === 'steakhouse' || theme.id === 'sushi' ? '0.1em' : 'normal'
          }}
        >
          {section.name}
        </h3>
        
        {section.description && (
          <p
            style={{
              fontFamily: theme.fontFamilyBody,
              fontSize: '0.95rem',
              color: theme.colors.textLight,
              fontStyle: 'italic',
              margin: '0 auto',
              maxWidth: '480px',
              lineHeight: 1.4
            }}
          >
            {section.description}
          </p>
        )}
        
        {/* Custom Divider Style */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '14px' }}>
          {theme.accents.dividerStyle === 'dashed' && (
            <div style={{ width: '60px', borderBottom: `2px dashed ${theme.colors.accent}`, opacity: 0.6 }} />
          )}
          {theme.accents.dividerStyle === 'double' && (
            <div style={{ width: '80px', height: '4px', borderTop: `1px solid ${theme.colors.accent}`, borderBottom: `1px solid ${theme.colors.accent}`, opacity: 0.8 }} />
          )}
          {theme.accents.dividerStyle === 'ornate' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: theme.colors.primary, opacity: 0.5 }} />
              <span style={{ color: theme.colors.primary, fontSize: '10px' }}>◆</span>
              <div style={{ width: '40px', height: '1px', backgroundColor: theme.colors.primary, opacity: 0.5 }} />
            </div>
          )}
          {theme.accents.dividerStyle === 'solid' && (
            <div style={{ width: '80px', height: '2px', backgroundColor: theme.colors.primary }} />
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} theme={theme} />
        ))}
      </div>
    </div>
  );
};

// 6. EventHero component
export const EventHero: React.FC<{ event: EventPromo; theme: RestaurantTheme }> = ({ event, theme }) => {
  return (
    <div
      style={{
        borderRadius: theme.borders.cardRadius,
        overflow: 'hidden',
        backgroundColor: theme.colors.surface,
        border: theme.borders.borderStyle === 'none' ? 'none' : `${theme.borders.borderStyle} ${theme.colors.border}`,
        boxShadow: theme.shadows.cardShadow,
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={event.imageUrl}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: theme.colors.primary,
            color: theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff',
            padding: '4px 10px',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            borderRadius: theme.borders.cardRadius === '0px' ? '0px' : '4px'
          }}
        >
          {event.badge}
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <h4
            style={{
              fontFamily: theme.fontFamilyTitle,
              fontSize: '1.3rem',
              fontWeight: 700,
              color: theme.colors.textDark,
              margin: 0
            }}
          >
            {event.title}
          </h4>
          {event.price && (
            <span
              style={{
                fontFamily: theme.fontFamilyTitle,
                fontWeight: 'bold',
                color: theme.colors.primary,
                fontSize: '1.25rem'
              }}
            >
              ${event.price}
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: theme.fontFamilyBody,
            fontSize: '0.85rem',
            color: theme.colors.primary,
            fontWeight: 600,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          📅 {event.date}
        </div>
        <p
          style={{
            fontFamily: theme.fontFamilyBody,
            fontSize: '0.9rem',
            color: theme.colors.textLight,
            lineHeight: 1.5,
            margin: '0 0 16px 0'
          }}
        >
          {event.description}
        </p>
        {event.ctaText && (
          <button
            style={{
              width: '100%',
              backgroundColor: theme.colors.primary,
              color: theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff',
              border: 'none',
              borderRadius: theme.borders.buttonRadius,
              padding: '10px',
              fontFamily: theme.fontFamilyTitle,
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: theme.shadows.buttonShadow,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {event.ctaText}
          </button>
        )}
      </div>
    </div>
  );
};

// 7. PromotionBanner component
export const PromotionBanner: React.FC<{
  title: string;
  description: string;
  theme: RestaurantTheme;
}> = ({ title, description, theme }) => {
  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: theme.colors.primary + '11', // 10% opacity primary
        border: `1px dashed ${theme.colors.primary}`,
        borderRadius: theme.borders.cardRadius,
        textAlign: 'center',
        marginBottom: '30px',
        boxSizing: 'border-box'
      }}
    >
      <span
        style={{
          display: 'inline-block',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: theme.colors.primary,
          marginBottom: '6px'
        }}
      >
        ★ Exclusive Promotion ★
      </span>
      <h4
        style={{
          fontFamily: theme.fontFamilyTitle,
          fontSize: '1.4rem',
          fontWeight: 700,
          color: theme.colors.textDark,
          margin: '0 0 8px 0'
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontFamily: theme.fontFamilyBody,
          fontSize: '0.9rem',
          color: theme.colors.textLight,
          lineHeight: 1.5,
          margin: 0
        }}
      >
        {description}
      </p>
    </div>
  );
};

// 8. ReservationCTA component
export const ReservationCTA: React.FC<{
  restaurantName: string;
  phone: string;
  theme: RestaurantTheme;
}> = ({ restaurantName, phone, theme }) => {
  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center',
        backgroundColor: theme.colors.surface,
        border: theme.borders.borderStyle === 'none' ? 'none' : `${theme.borders.borderStyle} ${theme.colors.border}`,
        borderRadius: theme.borders.cardRadius,
        boxShadow: theme.shadows.cardShadow,
        marginBottom: '40px',
        boxSizing: 'border-box'
      }}
    >
      <h3
        style={{
          fontFamily: theme.fontFamilyTitle,
          fontSize: '1.6rem',
          fontWeight: 600,
          color: theme.colors.textDark,
          margin: '0 0 8px 0'
        }}
      >
        Experience {restaurantName}
      </h3>
      <p
        style={{
          fontFamily: theme.fontFamilyBody,
          fontSize: '0.95rem',
          color: theme.colors.textLight,
          margin: '0 0 20px 0',
          lineHeight: 1.5
        }}
      >
        Join us for an unforgettable dining experience. Table reservations are highly recommended.
      </p>
      <a
        href={`tel:${phone}`}
        style={{
          display: 'inline-block',
          backgroundColor: theme.colors.primary,
          color: theme.id === 'steakhouse' || theme.id === 'lounge' ? '#0b0b0c' : '#ffffff',
          fontFamily: theme.fontFamilyTitle,
          fontWeight: 'bold',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '12px 30px',
          borderRadius: theme.borders.buttonRadius,
          textDecoration: 'none',
          boxShadow: theme.shadows.buttonShadow,
          transition: 'all 0.2s ease'
        }}
      >
        Book Table: {phone}
      </a>
    </div>
  );
};

// 9. Footer component
export const Footer: React.FC<{
  restaurant: RestaurantData;
  theme: RestaurantTheme;
}> = ({ restaurant, theme }) => {
  return (
    <div
      style={{
        padding: '40px 20px',
        borderTop: `1px solid ${theme.colors.border}`,
        textAlign: 'center',
        marginTop: '20px',
        boxSizing: 'border-box'
      }}
    >
      <h4
        style={{
          fontFamily: theme.fontFamilyTitle,
          fontSize: '1.25rem',
          fontWeight: 600,
          color: theme.colors.textDark,
          margin: '0 0 10px 0'
        }}
      >
        {restaurant.name}
      </h4>
      <p
        style={{
          fontFamily: theme.fontFamilyBody,
          fontSize: '0.85rem',
          color: theme.colors.textLight,
          margin: '0 0 20px 0',
          lineHeight: 1.6
        }}
      >
        📍 {restaurant.contact.address}<br />
        📞 {restaurant.contact.phone} | ✉️ {restaurant.contact.email}
      </p>
      
      {/* Opening Hours list */}
      <div style={{ display: 'inline-block', textAlign: 'left', marginBottom: '24px' }}>
        <h5
          style={{
            fontFamily: theme.fontFamilyTitle,
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: theme.colors.textDark,
            textAlign: 'center',
            margin: '0 0 8px 0'
          }}
        >
          Hours of Operation
        </h5>
        {restaurant.openingHours.map((hours, idx) => (
          <div
            key={idx}
            style={{
              fontFamily: theme.fontFamilyBody,
              fontSize: '0.8rem',
              color: theme.colors.textLight,
              display: 'flex',
              justifyContent: 'space-between',
              gap: '24px',
              lineHeight: 1.5
            }}
          >
            <strong>{hours.days}:</strong>
            <span>{hours.hours}</span>
          </div>
        ))}
      </div>
      
      {/* Social Links */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
        {Object.entries(restaurant.socials).map(([key, _val]) => (
          <a
            key={key}
            href="#"
            style={{
              fontFamily: theme.fontFamilyBody,
              fontSize: '0.8rem',
              color: theme.colors.primary,
              textDecoration: 'none',
              fontWeight: 500,
              textTransform: 'capitalize'
            }}
          >
            {key}
          </a>
        ))}
      </div>
      
      <p style={{ fontFamily: theme.fontFamilyBody, fontSize: '0.75rem', color: theme.colors.textLight, opacity: 0.6, margin: 0 }}>
        © {new Date().getFullYear()} {restaurant.name}. Crafted with Savor Studio. All rights reserved.
      </p>
    </div>
  );
};
