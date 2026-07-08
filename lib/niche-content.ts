import type { Niche, NicheContent } from './niche-config'

// Pexels/Unsplash direct URLs per niche
export const nicheContent: Record<Niche, NicheContent> = {
  dentist: {
    headline: 'Painless, modern dentistry\nyou can actually smile about.',
    subhead: 'Digital X-rays, single-visit RCTs and transparent pricing — right here in Noida.',
    business: 'Smile Craft Dental',
    location: 'Sector 18, Noida',
    heroImage: 'https://images.pexels.com/photos/4269276/pexels-photo-4269276.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/7800666/pexels-photo-7800666.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Modern dental clinic' },
      { src: 'https://images.pexels.com/photos/6528856/pexels-photo-6528856.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Dental treatment room' },
      { src: 'https://images.pexels.com/photos/4269354/pexels-photo-4269354.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Dentist with patient' },
    ],
    services: [
      { name: 'Consultation + X-Ray', desc: 'Full check-up with digital X-ray.', price: '₹500' },
      { name: 'Teeth Whitening', desc: 'In-clinic laser whitening in one sitting.', price: '₹6,000' },
      { name: 'Root Canal (RCT)', desc: 'Painless, single-visit rotary RCT.', price: '₹4,500' },
      { name: 'Dental Implant', desc: 'Titanium implant with ceramic crown.', price: '₹25,000' },
      { name: 'Braces & Aligners', desc: 'Metal, ceramic and clear-aligner options.', price: 'from ₹35,000' },
      { name: 'Kids Dentistry', desc: 'Gentle, cavity-focused care for children.', price: '₹800' },
    ],
    testimonials: [
      { name: 'Anita V.', role: 'Patient, Sector 15', text: 'Booked online, zero waiting. Completely painless RCT.' },
      { name: 'Farhan A.', role: 'Patient, Noida Extn', text: 'Doctor explained everything with photos. Very transparent.' },
      { name: 'Ritika S.', role: 'Bride, 2024', text: 'Got my smile whitening done a week before my wedding. Perfect.' },
      { name: 'Karan M.', role: 'Patient', text: 'The clinic looks and feels premium without pretending to be expensive.' },
    ],
    stats: [
      { label: 'Happy patients', value: 4200, suffix: '+' },
      { label: 'Google rating', value: 4.9, suffix: '/5' },
      { label: 'Years practicing', value: 12, suffix: '+' },
      { label: 'Painless procedures', value: 100, suffix: '%' },
    ],
    beforeAfter: [
      { label: 'Full smile makeover', before: 'https://images.pexels.com/photos/6812554/pexels-photo-6812554.jpeg?auto=compress&cs=tinysrgb&w=900', after: 'https://images.pexels.com/photos/6528858/pexels-photo-6528858.jpeg?auto=compress&cs=tinysrgb&w=900' },
    ],
  },
  gym: {
    headline: 'Train harder.\nRecover smarter.\nBecome iron.',
    subhead: 'Certified coaches, 24/7 access, group HIIT and a floor that never sleeps.',
    business: 'Iron Pulse Fitness',
    location: 'Sector 62, Noida',
    heroImage: 'https://images.pexels.com/photos/33360899/pexels-photo-33360899.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/33832204/pexels-photo-33832204.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Gym floor' },
      { src: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Personal training' },
      { src: 'https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'HIIT class' },
      { src: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Weight rack' },
    ],
    services: [
      { name: 'Strength Floor', desc: 'Free weights, Olympic platforms, rigs.', price: 'included' },
      { name: 'HIIT & Group', desc: 'Bootcamp, HRX, spin, yoga — unlimited.', price: '₹2,000/mo' },
      { name: 'Personal Training', desc: '12 sessions with certified coach.', price: '₹8,000' },
      { name: 'Nutrition Plan', desc: 'Custom macros + monthly check-ins.', price: '₹3,500' },
    ],
    testimonials: [
      { name: 'Vikram T.', role: 'Member since 2023', text: 'Joined after seeing the class schedule online. Zero hassle, real results.' },
      { name: 'Neha P.', text: 'Paid my annual fee through the website in one tap. Coaches actually care.' },
      { name: 'Aditya R.', role: 'Lost 18kg', text: 'The coach programmed everything. I just had to show up.' },
    ],
    stats: [
      { label: 'Active members', value: 1800, suffix: '+' },
      { label: 'Certified coaches', value: 14 },
      { label: 'Group classes / week', value: 42 },
      { label: 'Open hours', value: 24, suffix: '/7' },
    ],
    classes: [
      { day: 'Mon', slots: [{ time: '6:00', name: 'HRX', coach: 'Rohit' }, { time: '7:30', name: 'HIIT', coach: 'Priya' }, { time: '19:00', name: 'Spin', coach: 'Aman' }] },
      { day: 'Tue', slots: [{ time: '6:00', name: 'Yoga', coach: 'Nisha' }, { time: '8:00', name: 'Strength', coach: 'Rohit' }, { time: '19:30', name: 'HIIT', coach: 'Priya' }] },
      { day: 'Wed', slots: [{ time: '6:00', name: 'HRX', coach: 'Rohit' }, { time: '18:00', name: 'Bootcamp', coach: 'Aman' }, { time: '20:00', name: 'Yoga', coach: 'Nisha' }] },
      { day: 'Thu', slots: [{ time: '6:00', name: 'Spin', coach: 'Aman' }, { time: '7:30', name: 'HIIT', coach: 'Priya' }, { time: '19:00', name: 'Strength', coach: 'Rohit' }] },
      { day: 'Fri', slots: [{ time: '6:00', name: 'HRX', coach: 'Rohit' }, { time: '18:00', name: 'Zumba', coach: 'Sonia' }, { time: '20:00', name: 'Yoga', coach: 'Nisha' }] },
      { day: 'Sat', slots: [{ time: '7:00', name: 'Bootcamp', coach: 'Aman' }, { time: '9:00', name: 'HIIT', coach: 'Priya' }] },
      { day: 'Sun', slots: [{ time: '8:00', name: 'Long-Run Club', coach: 'Rohit' }] },
    ],
    packages: [
      { name: 'Monthly', price: '₹1,500', features: ['Full floor access', 'Locker + shower', 'Free WiFi'] },
      { name: 'Quarterly', price: '₹4,000', features: ['Everything in Monthly', '1 group class type', '1 free InBody scan'], recommended: false },
      { name: 'Annual', price: '₹15,000', features: ['Everything in Quarterly', 'Unlimited group classes', 'Nutrition plan', '2 months free'], recommended: true },
    ],
  },
  salon: {
    headline: 'Walk in.\nGlow out.',
    subhead: 'A private lounge for premium hair, beauty and nail artistry.',
    business: 'Luxe Locks Studio',
    location: 'DLF Mall, Sector 18',
    heroImage: 'https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/7195809/pexels-photo-7195809.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Stylist at work' },
      { src: 'https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Salon interior' },
      { src: 'https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Bridal makeup' },
      { src: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Nail art' },
    ],
    services: [
      { name: 'Hair Cut & Style', desc: 'Consultation, cut, wash and blow-dry.', price: '₹800' },
      { name: 'Global Hair Colour', desc: 'Ammonia-free colour with treatment.', price: '₹3,500' },
      { name: 'Bridal Makeup', desc: 'HD makeup with trial session included.', price: '₹15,000' },
      { name: 'Gel Nail Art', desc: 'Custom designs, 3-week wear guarantee.', price: '₹1,200' },
      { name: 'Balayage', desc: 'Hand-painted highlights, foilyage finish.', price: '₹5,500' },
      { name: 'Signature Facial', desc: '60-min glow facial + LED therapy.', price: '₹2,400' },
    ],
    testimonials: [
      { name: 'Shreya M.', role: 'Bride, 2024', text: 'Booked my bridal trial through the site. Flawless experience.' },
      { name: 'Kavya R.', text: 'Loved the gallery — I picked my exact hairstyle before visiting.' },
      { name: 'Isha K.', text: 'The private-lounge vibe is real. Quiet, plush, unhurried.' },
    ],
    stats: [
      { label: 'Happy clients', value: 3400, suffix: '+' },
      { label: 'Repeat rate', value: 78, suffix: '%' },
      { label: 'Master stylists', value: 8 },
    ],
    beforeAfter: [
      { label: 'Balayage transformation', before: 'https://images.pexels.com/photos/3993323/pexels-photo-3993323.jpeg?auto=compress&cs=tinysrgb&w=900', after: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900' },
    ],
  },
  coaching: {
    headline: 'Where India\'s\nnext toppers train.',
    subhead: 'JEE / NEET / Boards — small batches, real teachers, honest reporting.',
    business: 'Ascent Academy',
    location: 'Sector 15, Noida',
    heroImage: 'https://images.unsplash.com/photo-1643386581833-6ca5e552255c?auto=format&fit=crop&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Smart classroom' },
      { src: 'https://images.pexels.com/photos/8617543/pexels-photo-8617543.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Faculty' },
    ],
    services: [
      { name: 'JEE Foundation', desc: 'PCM — 6 days/week, XI + XII.', price: '₹45,000/yr' },
      { name: 'NEET Crash', desc: '90-day intensive with daily tests.', price: '₹30,000' },
      { name: 'Class X Boards', desc: 'Science + Maths, weekend batches.', price: '₹18,000/yr' },
      { name: 'Doubt-Clearing Pass', desc: 'Unlimited 1-on-1 doubt sessions.', price: '₹5,000/mo' },
    ],
    courses: [
      { name: 'JEE Advanced 2026', desc: 'Two-year full track with monthly tests', duration: '24 months', seatsLeft: 6, price: '₹85,000' },
      { name: 'NEET Rapid Revision', desc: 'Focused 90-day final push', duration: '3 months', seatsLeft: 12, price: '₹30,000' },
      { name: 'JEE Mains 2026', desc: 'Class XII focused fast-track', duration: '10 months', seatsLeft: 4, price: '₹42,000' },
      { name: 'Class X Boards', desc: 'Science + Maths weekend batches', duration: '10 months', seatsLeft: 18, price: '₹18,000' },
    ],
    testimonials: [
      { name: 'Ishita (NEET 2025)', role: 'Ranked 4,821', text: 'Small batches meant real attention. Cleared in first attempt.' },
      { name: 'Parent of Aarav', text: 'Weekly test reports on WhatsApp keep us fully informed.' },
      { name: 'Rahul K.', role: 'JEE 2024', text: 'The doubt-clearing pass paid for itself in one week.' },
    ],
    stats: [
      { label: 'Selections in top 100', value: 42 },
      { label: 'Student-to-faculty', value: 12, suffix: ':1' },
      { label: 'Years teaching', value: 15, suffix: '+' },
      { label: 'Avg. attendance', value: 96, suffix: '%' },
    ],
    packages: [
      { name: 'Weekend Boards', price: '₹18,000', features: ['Science + Maths', 'Weekend batches', 'Monthly tests'] },
      { name: 'JEE Foundation', price: '₹45,000', features: ['PCM daily', 'Weekly tests', 'Doubt sessions', 'Study material'], recommended: true },
      { name: 'JEE Advanced Track', price: '₹85,000', features: ['Everything in Foundation', '2-year full track', '1-on-1 mentor', 'Parent dashboard'] },
    ],
  },
  restaurant: {
    headline: 'A quiet corner of Noida\nfor loud, honest flavour.',
    subhead: 'Wood-fired pizzas, artisan coffee and slow Sunday brunches at Bistro 62.',
    business: 'Bistro 62',
    location: 'Sector 62, Noida',
    heroImage: 'https://images.pexels.com/photos/10633476/pexels-photo-10633476.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/29962487/pexels-photo-29962487.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Signature dish' },
      { src: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Warm interior' },
      { src: 'https://images.pexels.com/photos/1878346/pexels-photo-1878346.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Chef plating' },
      { src: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Private event' },
    ],
    services: [
      { name: 'À la carte dining', desc: 'Chef-led seasonal menu, 7 days a week.' },
      { name: 'Private events', desc: 'Sit-down for up to 40, buffet for 80.' },
      { name: 'Catering', desc: 'Delivered to your door across Noida-NCR.' },
    ],
    testimonials: [
      { name: 'Rohit S.', text: 'Best cappuccino in Sector 62. The truffle pizza is unreal.' },
      { name: 'Megha K.', text: 'Booked a birthday dinner via WhatsApp in 2 minutes.' },
      { name: 'Team @ Paytm', text: 'Best off-site venue we\'ve found in NCR.' },
    ],
    stats: [
      { label: 'Zomato rating', value: 4.6, suffix: '/5' },
      { label: 'Signature dishes', value: 42 },
      { label: 'Repeat guests', value: 71, suffix: '%' },
    ],
    menuCategories: [
      { name: 'Signatures', items: [
        { name: 'Truffle Mushroom Pizza', desc: 'Hand-stretched crust, wild mushrooms, truffle oil.', price: '₹650' },
        { name: 'Slow-Braised Lamb Shank', desc: '6-hour braise, root-veg mash, jus.', price: '₹890' },
        { name: 'Miso Cod', desc: 'Sake-marinated cod, dashi broth, greens.', price: '₹950' },
      ] },
      { name: 'Small Plates', items: [
        { name: 'Burrata & Peach', desc: 'Fresh burrata, grilled peach, basil oil.', price: '₹480' },
        { name: 'Tuna Tartare', desc: 'Sushi-grade tuna, avocado, chilli-lime.', price: '₹620' },
        { name: 'Charred Broccolini', desc: 'Miso butter, sesame, chilli crisp.', price: '₹380' },
      ] },
      { name: 'Bakery', items: [
        { name: 'Sourdough Loaf', desc: '48-hour ferment, cultured butter.', price: '₹280' },
        { name: 'Chocolate Croissant', desc: 'Laminated 27 layers, dark 70%.', price: '₹180' },
        { name: 'Belgian Waffle Stack', desc: 'Berries, maple, whipped cream.', price: '₹350' },
      ] },
      { name: 'Bar', items: [
        { name: 'Espresso Martini', desc: 'Cold-brew, vanilla vodka, kahlua.', price: '₹480' },
        { name: 'Yuzu Highball', desc: 'Suntory whisky, yuzu, soda.', price: '₹520' },
        { name: 'Cappuccino', desc: 'Freshly roasted single-origin.', price: '₹220' },
      ] },
    ],
  },
  tech: {
    headline: 'Zero-trust perimeters.\nHigh-signal engineering.',
    subhead: 'We ship secure, fast, boring-in-a-good-way infrastructure for teams that can\'t afford drama.',
    business: 'Perimeter.dev',
    location: 'Bengaluru + Remote',
    heroImage: '/images/tech-hero.jpg',
    galleryImages: [
      { src: '/images/tech-engineer.png', alt: 'Engineer at work' },
      { src: '/images/tech-servers.png', alt: 'Server rack' },
    ],
    services: [
      { name: 'Zero-Trust Migration', desc: 'BeyondCorp-style rollout, phased over 6 weeks.' },
      { name: 'Platform Engineering', desc: 'IDPs, CI/CD, K8s baselines, golden paths.' },
      { name: 'SRE On-Call', desc: 'PagerDuty-integrated, real humans, SLO-driven.' },
      { name: 'Security Audits', desc: 'SOC-2 & ISO-27001 readiness sprints.' },
    ],
    testimonials: [
      { name: 'CTO, Series-B Fintech', text: 'Cut our mean-time-to-recovery from 42 minutes to under 5.' },
      { name: 'VP Eng, HealthTech', text: 'The team ships. And they document. Both, in one contract.' },
      { name: 'Founder, Devtool Startup', text: 'Best security review I\'ve ever paid for. Actionable, not academic.' },
    ],
    stats: [
      { label: 'Uptime SLA', value: 99.99, suffix: '%' },
      { label: 'Projects shipped', value: 87 },
      { label: 'Avg response time', value: 4, suffix: ' min' },
    ],
    packages: [
      { name: 'Advisory', price: '$4,000/mo', features: ['Weekly office hours', 'Architecture reviews', 'On-call escalation path'] },
      { name: 'Platform Sprint', price: '$18,000', features: ['6-week sprint', 'IDP + CI/CD setup', 'Team enablement', 'Runbooks'], recommended: true },
      { name: 'Full SRE Retainer', price: '$28,000/mo', features: ['24/7 on-call', 'Incident response', 'Quarterly audits', 'Named engineer'] },
    ],
  },
}