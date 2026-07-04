export type Demo = {
  slug: string
  industry: string
  business: string
  tagline: string
  // Per-industry theme (CSS color values)
  accent: string
  accentSoft: string
  hero: string
  card: string
  gallery: { src: string; alt: string }[]
  offerings: { name: string; desc: string; price: string }[]
  reviews: { name: string; text: string }[]
  premiumFeatures: string[]
}

export const demos: Demo[] = [
  {
    slug: 'restaurant',
    industry: 'Restaurant & Cafe',
    business: 'Bistro 62 Noida',
    tagline: 'Artisan coffees, hand-stretched pizzas and bakery classics in Sector 62.',
    accent: '#e8590c',
    accentSoft: 'rgba(232,89,12,0.12)',
    hero: '/images/restaurant-hero.jpg',
    card: '/images/portfolio-restaurant.png',
    gallery: [
      { src: '/images/restaurant-dishes.png', alt: 'Signature dishes at Bistro 62' },
      { src: '/images/restaurant-interior.png', alt: 'Warm cafe interior' },
      { src: '/images/restaurant-chef.png', alt: 'Head chef plating a dish' },
      { src: '/images/restaurant-event.png', alt: 'Private event dining' },
    ],
    offerings: [
      { name: 'Artisan Cappuccino', desc: 'Freshly roasted organic beans, silky microfoam.', price: '₹220' },
      { name: 'Truffle Pizza', desc: 'Hand-stretched crust, wild mushrooms, truffle oil.', price: '₹650' },
      { name: 'Avocado Toast', desc: 'Feta and cherry tomatoes on sourdough.', price: '₹380' },
      { name: 'Belgian Waffle Stack', desc: 'Fresh berries, maple syrup, whipped cream.', price: '₹350' },
    ],
    reviews: [
      { name: 'Rohit S.', text: 'Best cappuccino in Sector 62. The truffle pizza is unreal.' },
      { name: 'Megha K.', text: 'Booked a birthday dinner via WhatsApp in 2 minutes. Great staff.' },
    ],
    premiumFeatures: ['Live table reservation system', 'Multi-branch locator', 'Event & private dining bookings'],
  },
  {
    slug: 'dental',
    industry: 'Dental Clinic',
    business: 'Smile Craft Dental',
    tagline: 'Painless, modern dentistry with transparent pricing in Noida.',
    accent: '#0ea5e9',
    accentSoft: 'rgba(14,165,233,0.12)',
    hero: '/images/dentist-hero.jpg',
    card: '/images/portfolio-dentist.png',
    gallery: [
      { src: '/images/dentist-clinic.png', alt: 'Modern dental clinic interior' },
      { src: '/images/dentist-doctor.png', alt: 'Lead dentist with patient' },
      { src: '/images/dentist-treatment.png', alt: 'Advanced dental treatment room' },
    ],
    offerings: [
      { name: 'Consultation + X-Ray', desc: 'Full check-up with digital X-ray.', price: '₹500' },
      { name: 'Teeth Whitening', desc: 'In-clinic laser whitening, single sitting.', price: '₹6,000' },
      { name: 'Root Canal (RCT)', desc: 'Painless, single-visit rotary RCT.', price: '₹4,500' },
      { name: 'Dental Implant', desc: 'Titanium implant with crown.', price: '₹25,000' },
    ],
    reviews: [
      { name: 'Anita V.', text: 'Booked online, zero waiting. Completely painless RCT.' },
      { name: 'Farhan A.', text: 'Doctor explained everything with photos. Very transparent.' },
    ],
    premiumFeatures: ['Online appointment scheduling', 'Treatment cost calculator', 'Patient record portal'],
  },
  {
    slug: 'salon',
    industry: 'Salon & Spa',
    business: 'Luxe Locks Studio',
    tagline: 'Premium hair, beauty and nail artistry — walk in, glow out.',
    accent: '#d6336c',
    accentSoft: 'rgba(214,51,108,0.12)',
    hero: '/images/salon-hero.jpg',
    card: '/images/portfolio-salon.png',
    gallery: [
      { src: '/images/salon-interior.png', alt: 'Luxury salon interior' },
      { src: '/images/salon-styling.png', alt: 'Stylist at work' },
      { src: '/images/salon-nailart.png', alt: 'Detailed nail art' },
    ],
    offerings: [
      { name: 'Hair Cut & Style', desc: 'Consultation, cut, wash and blow-dry.', price: '₹800' },
      { name: 'Global Hair Colour', desc: 'Ammonia-free colour with treatment.', price: '₹3,500' },
      { name: 'Bridal Makeup', desc: 'HD makeup with trial session.', price: '₹15,000' },
      { name: 'Gel Nail Art', desc: 'Custom designs, 3-week wear.', price: '₹1,200' },
    ],
    reviews: [
      { name: 'Shreya M.', text: 'Booked my bridal trial through the site. Flawless experience.' },
      { name: 'Kavya R.', text: 'Loved the gallery — I picked my exact hairstyle before visiting.' },
    ],
    premiumFeatures: ['Slot-based online booking', 'Stylist selection', 'Membership & packages'],
  },
  {
    slug: 'coaching',
    industry: 'Coaching Institute',
    business: 'Ascent Academy',
    tagline: 'Result-focused JEE / NEET coaching with small batches.',
    accent: '#7048e8',
    accentSoft: 'rgba(112,72,232,0.12)',
    hero: '/images/coaching-hero.jpg',
    card: '/images/portfolio-coaching.png',
    gallery: [
      { src: '/images/coaching-classroom.png', alt: 'Smart classroom session' },
      { src: '/images/coaching-faculty.png', alt: 'Experienced faculty team' },
    ],
    offerings: [
      { name: 'JEE Foundation (XI)', desc: 'Physics, Chemistry, Maths — 6 days/week.', price: '₹45,000/yr' },
      { name: 'NEET Crash Course', desc: '90-day intensive with daily tests.', price: '₹30,000' },
      { name: 'Class X Boards', desc: 'Science + Maths, weekend batches.', price: '₹18,000/yr' },
      { name: 'Doubt-Clearing Pass', desc: 'Unlimited 1-on-1 doubt sessions.', price: '₹5,000/mo' },
    ],
    reviews: [
      { name: 'Parent of Aarav', text: 'Weekly test reports on WhatsApp keep us fully informed.' },
      { name: 'Ishita (NEET 2025)', text: 'Small batches meant real attention. Cleared in first attempt.' },
    ],
    premiumFeatures: ['Online admission & fee payment', 'Student test dashboards', 'Batch timetable portal'],
  },
  {
    slug: 'gym',
    industry: 'Gym & Fitness',
    business: 'Iron Pulse Fitness',
    tagline: 'Train harder with certified coaches and 24/7 access.',
    accent: '#f08c00',
    accentSoft: 'rgba(240,140,0,0.12)',
    hero: '/images/gym-hero.jpg',
    card: '/images/portfolio-gym.png',
    gallery: [
      { src: '/images/gym-floor.png', alt: 'Fully equipped gym floor' },
      { src: '/images/gym-trainer.png', alt: 'Personal training session' },
      { src: '/images/gym-groupclass.png', alt: 'High-energy group class' },
    ],
    offerings: [
      { name: 'Monthly Membership', desc: 'Full floor + cardio access.', price: '₹1,500' },
      { name: 'Annual Membership', desc: 'Best value — 2 months free.', price: '₹15,000' },
      { name: 'Personal Training', desc: '12 sessions with certified coach.', price: '₹8,000' },
      { name: 'Group Classes', desc: 'HIIT, yoga, Zumba — unlimited.', price: '₹2,000/mo' },
    ],
    reviews: [
      { name: 'Vikram T.', text: 'Joined after seeing the class schedule online. Zero hassle.' },
      { name: 'Neha P.', text: 'Paid my annual fee through the website in one tap.' },
    ],
    premiumFeatures: ['Class schedule & slot booking', 'Online membership payments', 'Trainer profiles & plans'],
  },
]

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug)
}
