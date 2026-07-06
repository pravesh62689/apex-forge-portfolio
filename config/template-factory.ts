export type IndustryConfig = {
  id: string;
  industry: string;
  heroHeadline: string;
  heroSubheadline: string;
  requiredSections: string[];
  primaryFeatures: string[];
  themeColor: string;
};

export const templateFactory: Record<string, IndustryConfig> = {
  pg_accommodation: {
    id: 'pg',
    industry: 'PG & Hostels',
    heroHeadline: 'Premium Living Spaces in Noida',
    heroSubheadline: 'Fully furnished, safe, and hygienic PGs with high-speed WiFi and home-cooked meals.',
    requiredSections: ['Hero', 'Amenities', 'Room Types', 'Gallery', 'LocationMap', 'WhatsAppCTA'],
    primaryFeatures: ['24/7 Security', 'AC Rooms', 'Power Backup'],
    themeColor: 'emerald',
  },
  salon: {
    id: 'salon',
    industry: 'Unisex Salon & Spa',
    heroHeadline: 'Elevate Your Everyday Style',
    heroSubheadline: 'Expert styling, premium products, and a relaxing atmosphere.',
    requiredSections: ['Hero', 'ServicesList', 'StylistProfiles', 'Testimonials', 'BookingForm'],
    primaryFeatures: ['Hair Styling', 'Bridal Makeup', 'Spa Therapies'],
    themeColor: 'rose',
  },
  dentist: {
    id: 'dentist',
    industry: 'Dental Clinic',
    heroHeadline: 'Advanced Dental Care You Can Trust',
    heroSubheadline: 'Painless treatments, modern technology, and expert specialists.',
    requiredSections: ['Hero', 'Treatments', 'DoctorProfile', 'BeforeAfter', 'EmergencyContact'],
    primaryFeatures: ['Root Canals', 'Implants', 'Teeth Whitening'],
    themeColor: 'cyan',
  },
  gym: {
    id: 'gym',
    industry: 'Fitness Center',
    heroHeadline: 'Transform Your Body, Transform Your Life',
    heroSubheadline: 'State-of-the-art equipment, certified trainers, and dynamic group classes.',
    requiredSections: ['Hero', 'EquipmentGallery', 'TrainerProfiles', 'PricingPlans', 'FreeTrialForm'],
    primaryFeatures: ['Strength Training', 'Cardio Zone', 'CrossFit'],
    themeColor: 'amber',
  },
  // Expanded niches for scaling:
  coaching: {
    id: 'coaching',
    industry: 'Institute & Coaching',
    heroHeadline: 'Unlock Your Academic Potential',
    heroSubheadline: 'Expert guidance, exhaustive study materials, and mock test series to clear your exams.',
    requiredSections: ['Hero', 'Courses', 'Faculty', 'Results', 'AdmissionForm'],
    primaryFeatures: ['Interactive Batches', 'Doubt Solving', 'Regular Performance Updates'],
    themeColor: 'indigo',
  },
  restaurant: {
    id: 'restaurant',
    industry: 'Fine Dining & Cafe',
    heroHeadline: 'Savor Every Moment and Flavor',
    heroSubheadline: 'Exquisite culinary delights, curated ingredients, and a warm family-friendly ambiance.',
    requiredSections: ['Hero', 'SpecialMenu', 'ChefProfile', 'ReservationForm', 'Gallery'],
    primaryFeatures: ['Table Reservation', 'Home Delivery', 'Outdoor Seating'],
    themeColor: 'orange',
  }
};
