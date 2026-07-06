export type Tier = 'basic' | 'moderate' | 'premium';

export const domainThemes = {
  restaurant: {
    name: 'Fine Dining & Cafe',
    colors: { primary: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600' },
    heroImage: '/images/restaurant-hero.jpg',
  },
  dentist: {
    name: 'Dental & Clinic',
    colors: { primary: 'bg-teal-500', text: 'text-teal-500', border: 'border-teal-500' },
    heroImage: '/images/dentist-hero.jpg',
  },
  gym: {
    name: 'Fitness & Gym',
    colors: { primary: 'bg-lime-500', text: 'text-lime-500', border: 'border-lime-500' },
    heroImage: '/images/gym-hero.jpg',
  },
  salon: {
    name: 'Salon & Spa',
    colors: { primary: 'bg-rose-500', text: 'text-rose-500', border: 'border-rose-500' },
    heroImage: '/images/salon-hero.jpg',
  },
  coaching: {
    name: 'Institute & Coaching',
    colors: { primary: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600' },
    heroImage: '/images/coaching-hero.jpg',
  },
  developer: {
    name: 'Tech & Agency',
    colors: { primary: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
    heroImage: '/images/dev-research.jpg',
  }
};

export const tierConfig = {
  basic: {
    name: 'Basic',
    price: '₹6,000 - ₹8,000',
    sections: ['Hero (Standard)', 'About', 'Services (Grid)', 'WhatsApp CTA'],
    description: 'Perfect for small local businesses needing a fast, professional online presence.'
  },
  moderate: {
    name: 'Moderate',
    price: '₹12,000 - ₹15,000',
    sections: ['Hero (Animated)', 'About', 'Services (Interactive)', 'Testimonials', 'Contact Form', 'WhatsApp CTA'],
    description: 'Ideal for growing businesses requiring lead generation and social proof.'
  },
  premium: {
    name: 'Premium 10X',
    price: '₹20,000+',
    sections: ['Hero (Video/Advanced)', 'About', 'Services (Hover Effects)', 'Dynamic Testimonials', 'API Integrations', 'Custom Analytics', 'Advanced Skeletons'],
    description: 'The ultimate conversion engine. Custom branding, flawless performance, and monumental design.'
  }
};
