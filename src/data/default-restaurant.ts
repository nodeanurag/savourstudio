import type { RestaurantData } from '../types';

export const DEFAULT_RESTAURANT_DATA: RestaurantData = {
  name: "L'Ambroisie",
  tagline: "Artisanal Cuisine & Botanical Spirits",
  description: "A modern culinary retreat where local seasonal harvest meets classic French preparation techniques. Every dish is a dialogue of flavors, curated by Executive Chef Marc Laurent.",
  logoUrl: "/logo-placeholder.jpg", // stylized leaf/cup
  heroImageUrl: "/hero-placeholder.jpg", // warm premium interior
  contact: {
    phone: "+1 (555) 234-8900",
    email: "reservations@lambroisie.com",
    address: "482 Botanical Blvd, Suite 100, San Francisco, CA"
  },
  socials: {
    instagram: "@lambroisie.sf",
    facebook: "lambroisie.restaurant",
    twitter: "@lambroisie_sf",
    website: "https://lambroisie-restaurant.com"
  },
  openingHours: [
    { days: "Mon - Thu", hours: "5:00 PM - 10:00 PM" },
    { days: "Fri - Sat", hours: "5:00 PM - 11:00 PM" },
    { days: "Sunday", hours: "Closed" }
  ],
  menuSections: [
    {
      id: "appetizers",
      name: "Appetizers",
      description: "Light starters to awaken your palate",
      items: [
        {
          id: "app-1",
          name: "Truffle Mushroom Arancini",
          description: "Crisp arborio rice croquettes, wild chanterelle mushrooms, black truffle paste, house-made lemon herb aioli.",
          price: 18,
          dietary: ["Vegetarian"],
          isChefRecommended: true
        },
        {
          id: "app-2",
          name: "Citrus Cured Salmon",
          description: "Atlantic salmon cured in blood orange and dill, served with pickled heirloom radishes, avocado mousse, and toasted rye crisp.",
          price: 22,
          dietary: ["Gluten-Free"],
          isChefRecommended: false
        },
        {
          id: "app-3",
          name: "Whipped Goat Cheese Crostini",
          description: "Artisan sourdough, whipped chèvre, local lavender honey, fresh figs, toasted pistachios.",
          price: 16,
          dietary: ["Vegetarian", 'Nut-Free'],
          isChefRecommended: false
        }
      ]
    },
    {
      id: "mains",
      name: "Mains",
      description: "Substantial plates highlighting seasonal bounty",
      items: [
        {
          id: "main-1",
          name: "Pan-Seared Wagyu Ribeye",
          description: "A5 Japanese Wagyu ribeye, roasted fingerling potatoes, butter-glazed baby heirloom carrots, rosemary red wine reduction.",
          price: 68,
          dietary: ["Gluten-Free"],
          isChefRecommended: true
        },
        {
          id: "main-2",
          name: "Pan-Roasted Halibut",
          description: "Wild-caught halibut filet, smooth parsnip purée, sautéed samphire greens, saffron champagne cream sauce.",
          price: 42,
          dietary: ["Gluten-Free"],
          isChefRecommended: false
        },
        {
          id: "main-3",
          name: "Wild Forest Mushroom Risotto",
          description: "Arborio rice simmered in vegetable stock, wild chanterelles, porcini, roasted chestnuts, parmesan foam.",
          price: 34,
          dietary: ["Vegetarian", "Gluten-Free"],
          isChefRecommended: true
        }
      ]
    },
    {
      id: "desserts",
      name: "Desserts & Spirits",
      description: "Sweet endings and after-dinner delicacies",
      items: [
        {
          id: "dessert-1",
          name: "Valrhona Chocolate Soufflé",
          description: "Warm dark chocolate soufflé, Tahitian vanilla bean ice cream, gold leaf finish.",
          price: 16,
          dietary: ["Vegetarian"],
          isChefRecommended: true
        },
        {
          id: "dessert-2",
          name: "Botanical Lemon Tart",
          description: "Meyer lemon curd, lavender meringue, almond sable crust, fresh organic raspberries.",
          price: 14,
          dietary: ["Vegetarian"],
          isChefRecommended: false
        }
      ]
    }
  ],
  events: [
    {
      id: "event-1",
      title: "Chef's Tasting Journey",
      description: "A 7-course seasonal exploration curated by Chef Marc Laurent, paired with rare biological and biodynamic wines.",
      date: "Every Thursday from 7:00 PM",
      price: 145,
      imageUrl: "/event-tasting.jpg",
      badge: "Tasting Night",
      ctaText: "Reserve Seat"
    },
    {
      id: "event-2",
      title: "Acoustic Jazz & Botanical Cocktails",
      description: "Enjoy live acoustic jazz while sipping our signature house-infused gin botanicals and hand-crafted botanical cocktails.",
      date: "Saturdays from 8:00 PM",
      imageUrl: "/event-jazz.jpg",
      badge: "Live Music",
      ctaText: "Book Table"
    }
  ]
};
