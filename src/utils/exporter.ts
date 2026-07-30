import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import type { RestaurantData, RestaurantTheme } from '../types';
import { SavorEmail } from '../elements/SavorEmail';
import { SavorDocument } from '../elements/SavorDocument';

// Compile email template into stand-alone HTML string
export const generateEmailHtml = (restaurant: RestaurantData, theme: RestaurantTheme): string => {
  const markup = renderToStaticMarkup(React.createElement(SavorEmail, { restaurant, theme }));
  
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${restaurant.name} - Weekly Digest</title>
    <style>
      body { margin: 0; padding: 0; background-color: ${theme.colors.background}; }
    </style>
  </head>
  <body>
    ${markup}
  </body>
</html>`;
};

// Compile printable document template into stand-alone HTML string
export const generateDocumentHtml = (restaurant: RestaurantData, theme: RestaurantTheme): string => {
  const markup = renderToStaticMarkup(React.createElement(SavorDocument, { restaurant, theme }));
  
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${restaurant.name} - Menu Document</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600&family=Outfit:wght@400;600;700&display=swap');
      body { margin: 0; padding: 0; }
      @media print {
        body { background: none; }
        .no-print { display: none; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0;">
    ${markup}
  </body>
</html>`;
};
