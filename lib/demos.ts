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
  about: string
  highlights: { label: string; desc: string }[]
  stats: { value: string; label: string }[]
  hours: { days: string; time: string }[]
  address: string
  gallery: { src: string; alt: string }[]
  offerings: { name: string; desc: string; price: string; tag?: string }[]
  offeringsTitle: string
  reviews: { name: string; text: string }[]
  team: { name: string; role: string }[]
  faqs: { q: string; a: string }[]
  offer: string
  booking: {
    title: string
    subtitle: string
    slotLabel: string
    slots: string[]
    optionLabel: string
    options: string[]
  }
  premiumFeatures: { name: string; desc: string }[]
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
    about:
      'Since 2019, Bistro 62 has served Sector 62 with wood-fired pizzas, single-origin coffee and an all-day bakery. Everything is made in-house, every morning.',
    highlights: [
      { label: 'Wood-fired oven', desc: 'Pizzas at 450°C, ready in 90 seconds' },
      { label: 'Single-origin coffee', desc: 'Roasted fresh every week' },
      { label: 'All-day bakery', desc: 'Croissants, sourdough and cakes daily' },
      { label: 'Family friendly', desc: 'Kids menu and high chairs available' },
    ],
    stats: [
      { value: '4.8★', label: 'Google rating' },
      { value: '120+', label: 'Seats across 2 floors' },
      { value: '6 yrs', label: 'Serving Noida' },
      { value: '40+', label: 'Menu items' },
    ],
    hours: [
      { days: 'Mon – Fri', time: '8:00 AM – 11:00 PM' },
      { days: 'Sat – Sun', time: '8:00 AM – 12:30 AM' },
    ],
    address: 'C-27, Sector 62, Noida, Uttar Pradesh 201301',
    gallery: [
      { src: '/images/restaurant-dishes.png', alt: 'Signature dishes at Bistro 62' },
      { src: '/images/restaurant-interior.png', alt: 'Warm cafe interior' },
      { src: '/images/restaurant-chef.png', alt: 'Head chef plating a dish' },
      { src: '/images/restaurant-event.png', alt: 'Private event dining' },
    ],
    offeringsTitle: 'Our Menu',
    offerings: [
      { name: 'Artisan Cappuccino', desc: 'Freshly roasted organic beans, silky microfoam.', price: '₹220' },
      { name: 'Truffle Pizza', desc: 'Hand-stretched crust, wild mushrooms, truffle oil.', price: '₹650', tag: 'Bestseller' },
      { name: 'Avocado Toast', desc: 'Feta and cherry tomatoes on sourdough.', price: '₹380' },
      { name: 'Belgian Waffle Stack', desc: 'Fresh berries, maple syrup, whipped cream.', price: '₹350' },
      { name: 'Smoked Chicken Pasta', desc: 'Creamy alfredo, house-smoked chicken.', price: '₹520' },
      { name: 'Basque Cheesecake', desc: 'Burnt-top, silky centre — baked daily.', price: '₹320', tag: 'New' },
    ],
    reviews: [
      { name: 'Rohit S.', text: 'Best cappuccino in Sector 62. The truffle pizza is unreal.' },
      { name: 'Megha K.', text: 'Booked a birthday dinner via WhatsApp in 2 minutes. Great staff.' },
      { name: 'Dhruv A.', text: 'Reserved a window table online for our anniversary — flawless evening.' },
    ],
    team: [
      { name: 'Chef Arjun Mehta', role: 'Head Chef — ex Taj Hotels' },
      { name: 'Sana Kapoor', role: 'Pastry Chef' },
      { name: 'Vivek Rana', role: 'Restaurant Manager' },
    ],
    faqs: [
      { q: 'Do you take table reservations?', a: 'Yes — book any table online up to 14 days ahead. Instant confirmation on WhatsApp.' },
      { q: 'Do you host private events?', a: 'Our second floor hosts up to 60 guests for birthdays, corporate dinners and kitty parties.' },
      { q: 'Is home delivery available?', a: 'We deliver within 6 km via our own riders — order directly from the website menu.' },
    ],
    offer: 'Weekday lunch offer: flat 20% off on all pizzas, 12–4 PM',
    booking: {
      title: 'Reserve your table',
      subtitle: 'Pick a time and party size — instant confirmation on WhatsApp.',
      slotLabel: 'Preferred time',
      slots: ['12:30 PM', '1:30 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
      optionLabel: 'Party size',
      options: ['2 guests', '4 guests', '6 guests', '10+ / Event'],
    },
    premiumFeatures: [
      { name: 'Live table reservations', desc: 'Real-time table availability with instant WhatsApp confirmations.' },
      { name: 'Online ordering & delivery', desc: 'Full menu ordering with UPI payments and delivery tracking.' },
      { name: 'Event & private dining bookings', desc: 'Enquiry-to-quote flow for parties and corporate events.' },
      { name: 'Multi-branch locator', desc: 'Auto-detects the nearest outlet with directions and branch menus.' },
      { name: 'Loyalty & offers engine', desc: 'Repeat-customer coupons and festival campaign pages.' },
      { name: 'Live menu manager', desc: 'Owner dashboard to update dishes, prices and photos in seconds.' },
    ],
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
    about:
      'Smile Craft combines 15+ years of clinical experience with digital X-rays, rotary endodontics and strict sterilisation — so every visit is painless, fast and transparent.',
    highlights: [
      { label: 'Painless dentistry', desc: 'Modern anaesthesia and rotary tools' },
      { label: 'Transparent pricing', desc: 'Fixed price list — no surprise bills' },
      { label: 'Digital X-rays', desc: '90% less radiation, instant results' },
      { label: 'Strict sterilisation', desc: 'Autoclaved instruments, sealed kits' },
    ],
    stats: [
      { value: '15+', label: 'Years of practice' },
      { value: '12k+', label: 'Patients treated' },
      { value: '4.9★', label: 'Google rating' },
      { value: '0', label: 'Hidden charges' },
    ],
    hours: [
      { days: 'Mon – Sat', time: '10:00 AM – 8:00 PM' },
      { days: 'Sunday', time: '10:00 AM – 2:00 PM' },
    ],
    address: 'B-14, Sector 41, Noida, Uttar Pradesh 201303',
    gallery: [
      { src: '/images/dentist-clinic.png', alt: 'Modern dental clinic interior' },
      { src: '/images/dentist-doctor.png', alt: 'Lead dentist with patient' },
      { src: '/images/dentist-treatment.png', alt: 'Advanced dental treatment room' },
    ],
    offeringsTitle: 'Treatments & Pricing',
    offerings: [
      { name: 'Consultation + X-Ray', desc: 'Full check-up with digital X-ray.', price: '₹500' },
      { name: 'Scaling & Polishing', desc: 'Ultrasonic cleaning, stain removal.', price: '₹1,200' },
      { name: 'Teeth Whitening', desc: 'In-clinic laser whitening, single sitting.', price: '₹6,000', tag: 'Popular' },
      { name: 'Root Canal (RCT)', desc: 'Painless, single-visit rotary RCT.', price: '₹4,500' },
      { name: 'Dental Implant', desc: 'Titanium implant with crown.', price: '₹25,000' },
      { name: 'Invisible Aligners', desc: 'Clear aligners with 3D smile preview.', price: '₹65,000+', tag: 'New' },
    ],
    reviews: [
      { name: 'Anita V.', text: 'Booked online, zero waiting. Completely painless RCT.' },
      { name: 'Farhan A.', text: 'Doctor explained everything with photos. Very transparent.' },
      { name: 'Seema R.', text: 'The cost calculator told me the exact implant price before I even visited.' },
    ],
    team: [
      { name: 'Dr. Nidhi Sharma', role: 'MDS — Endodontist, 15 yrs' },
      { name: 'Dr. Kunal Verma', role: 'Implantologist' },
      { name: 'Dr. Priya Nair', role: 'Orthodontist — Aligners' },
    ],
    faqs: [
      { q: 'Is root canal treatment painful?', a: 'No — we use rotary endodontics with modern anaesthesia. Most RCTs finish in a single painless sitting.' },
      { q: 'Do you support EMI for implants?', a: 'Yes, treatments above ₹15,000 can be paid in 3–9 month zero-cost EMIs.' },
      { q: 'How do online appointments work?', a: 'Pick a doctor and slot on the website — you get instant confirmation and a reminder before your visit.' },
    ],
    offer: 'Free consultation + X-ray for online bookings this month',
    booking: {
      title: 'Book your appointment',
      subtitle: 'Choose a doctor and slot — instant confirmation, zero waiting room time.',
      slotLabel: 'Preferred slot',
      slots: ['10:30 AM', '12:00 PM', '3:00 PM', '5:30 PM', '7:00 PM'],
      optionLabel: 'Treatment',
      options: ['Consultation', 'Cleaning', 'RCT', 'Implant', 'Aligners'],
    },
    premiumFeatures: [
      { name: 'Doctor-wise appointment scheduling', desc: 'Patients pick doctor, date and slot with automated reminders.' },
      { name: 'Treatment cost calculator', desc: 'Instant estimates for implants, aligners and full-mouth work.' },
      { name: 'Patient record portal', desc: 'Secure login for prescriptions, X-rays and treatment history.' },
      { name: 'Online payments & EMI', desc: 'UPI/card advances and zero-cost EMI options at checkout.' },
      { name: 'Smile gallery (before/after)', desc: 'Interactive before-and-after case slider that builds trust.' },
      { name: 'Automated review collection', desc: 'Post-visit WhatsApp flow that grows your Google reviews.' },
    ],
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
    about:
      'Luxe Locks is a premium unisex studio with L\u2019Oréal-certified stylists, dedicated bridal suites and a nail bar — trusted by 8,000+ clients across Noida.',
    highlights: [
      { label: 'Certified stylists', desc: 'L\u2019Oréal & Wella trained team' },
      { label: 'Bridal suites', desc: 'Private rooms for bridal packages' },
      { label: 'Premium products', desc: 'Only ammonia-free, cruelty-free lines' },
      { label: 'Hygiene first', desc: 'Sanitised stations, fresh linen every client' },
    ],
    stats: [
      { value: '8k+', label: 'Happy clients' },
      { value: '4.9★', label: 'Google rating' },
      { value: '12', label: 'Expert stylists' },
      { value: '200+', label: 'Brides styled' },
    ],
    hours: [
      { days: 'Tue – Sun', time: '10:00 AM – 9:00 PM' },
      { days: 'Monday', time: 'Closed' },
    ],
    address: 'Shop 8, Sector 18 Market, Noida, Uttar Pradesh 201301',
    gallery: [
      { src: '/images/salon-interior.png', alt: 'Luxury salon interior' },
      { src: '/images/salon-styling.png', alt: 'Stylist at work' },
      { src: '/images/salon-nailart.png', alt: 'Detailed nail art' },
    ],
    offeringsTitle: 'Services & Pricing',
    offerings: [
      { name: 'Hair Cut & Style', desc: 'Consultation, cut, wash and blow-dry.', price: '₹800' },
      { name: 'Global Hair Colour', desc: 'Ammonia-free colour with treatment.', price: '₹3,500', tag: 'Popular' },
      { name: 'Keratin Treatment', desc: 'Frizz-free, salon-smooth for 4 months.', price: '₹5,500' },
      { name: 'Bridal Makeup', desc: 'HD makeup with trial session.', price: '₹15,000', tag: 'Signature' },
      { name: 'Gel Nail Art', desc: 'Custom designs, 3-week wear.', price: '₹1,200' },
      { name: 'Luxury Spa Facial', desc: '90-minute deep-cleanse ritual.', price: '₹2,800' },
    ],
    reviews: [
      { name: 'Shreya M.', text: 'Booked my bridal trial through the site. Flawless experience.' },
      { name: 'Kavya R.', text: 'Loved the gallery — I picked my exact hairstyle before visiting.' },
      { name: 'Tanvi J.', text: 'Chose my favourite stylist online and walked in with zero wait.' },
    ],
    team: [
      { name: 'Aisha Khan', role: 'Creative Director — Hair' },
      { name: 'Ritu Malhotra', role: 'Bridal Makeup Lead' },
      { name: 'Nikhil Soni', role: 'Senior Colourist' },
    ],
    faqs: [
      { q: 'Can I choose my stylist?', a: 'Yes — every stylist has a profile with their work. Pick your favourite while booking a slot.' },
      { q: 'How do bridal packages work?', a: 'Book a paid trial first; the trial fee is fully adjusted in your final bridal package.' },
      { q: 'Do you offer memberships?', a: 'Gold and Platinum memberships give 15–25% off all services plus priority slots.' },
    ],
    offer: 'First visit: flat 25% off any hair service booked online',
    booking: {
      title: 'Book your slot',
      subtitle: 'Choose a service, stylist and time — no calls, no waiting.',
      slotLabel: 'Preferred time',
      slots: ['11:00 AM', '1:00 PM', '3:30 PM', '5:00 PM', '7:30 PM'],
      optionLabel: 'Service',
      options: ['Hair cut', 'Colour', 'Bridal trial', 'Nails', 'Spa facial'],
    },
    premiumFeatures: [
      { name: 'Slot-based online booking', desc: 'Live calendar with per-stylist availability and reminders.' },
      { name: 'Stylist profiles & selection', desc: 'Portfolio pages so clients pick the right expert.' },
      { name: 'Memberships & packages', desc: 'Sell prepaid packages and renewals online with UPI.' },
      { name: 'Bridal enquiry pipeline', desc: 'Trial booking, quotes and date-blocking in one flow.' },
      { name: 'Lookbook gallery', desc: 'Filterable style gallery clients browse before visiting.' },
      { name: 'Automated rebooking nudges', desc: 'WhatsApp reminders when a client is due for a touch-up.' },
    ],
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
    about:
      'Ascent Academy runs small 25-student batches taught by IIT/AIIMS alumni, with weekly tests, printed reports to parents and a doubt-desk that never closes.',
    highlights: [
      { label: 'Small batches', desc: 'Max 25 students per batch' },
      { label: 'IIT/AIIMS faculty', desc: 'Taught by alumni, not juniors' },
      { label: 'Weekly test reports', desc: 'Sent to parents on WhatsApp' },
      { label: 'Daily doubt desk', desc: '1-on-1 doubt clearing, 7 days a week' },
    ],
    stats: [
      { value: '92%', label: 'Selection rate 2025' },
      { value: '25', label: 'Max batch size' },
      { value: '340+', label: 'IIT/NEET selections' },
      { value: '11 yrs', label: 'Track record' },
    ],
    hours: [
      { days: 'Mon – Sat', time: '7:00 AM – 8:30 PM' },
      { days: 'Sunday', time: 'Test series only' },
    ],
    address: 'Tower A, Sector 15, Noida, Uttar Pradesh 201301',
    gallery: [
      { src: '/images/coaching-classroom.png', alt: 'Smart classroom session' },
      { src: '/images/coaching-faculty.png', alt: 'Experienced faculty team' },
    ],
    offeringsTitle: 'Courses & Fees',
    offerings: [
      { name: 'JEE Foundation (XI)', desc: 'Physics, Chemistry, Maths — 6 days/week.', price: '₹45,000/yr', tag: 'Flagship' },
      { name: 'JEE Advanced (XII)', desc: 'Full syllabus + 40 mock tests.', price: '₹55,000/yr' },
      { name: 'NEET Crash Course', desc: '90-day intensive with daily tests.', price: '₹30,000', tag: 'Filling fast' },
      { name: 'Class X Boards', desc: 'Science + Maths, weekend batches.', price: '₹18,000/yr' },
      { name: 'Doubt-Clearing Pass', desc: 'Unlimited 1-on-1 doubt sessions.', price: '₹5,000/mo' },
      { name: 'Test Series Only', desc: '30 full-length JEE/NEET mocks with analysis.', price: '₹8,000' },
    ],
    reviews: [
      { name: 'Parent of Aarav', text: 'Weekly test reports on WhatsApp keep us fully informed.' },
      { name: 'Ishita (NEET 2025)', text: 'Small batches meant real attention. Cleared in first attempt.' },
      { name: 'Parent of Riya', text: 'Paid the full year fee online and got the receipt instantly.' },
    ],
    team: [
      { name: 'Ankur Bhatia', role: 'Physics — IIT Delhi' },
      { name: 'Dr. Meenal Gupta', role: 'Biology — AIIMS' },
      { name: 'Rahul Saxena', role: 'Maths — 14 yrs experience' },
    ],
    faqs: [
      { q: 'How are batches allotted?', a: 'A free scholarship-cum-entrance test decides your batch. Toppers get up to 40% fee waivers.' },
      { q: 'Can parents track progress?', a: 'Yes — the parent dashboard shows attendance, test scores and rank trends after every weekly test.' },
      { q: 'Do you offer fee instalments?', a: 'Annual fees can be paid in 3 instalments online, with automatic receipts.' },
    ],
    offer: 'Scholarship test this Sunday — up to 40% fee waiver',
    booking: {
      title: 'Book a free demo class',
      subtitle: 'Attend one real class before you decide. Seats confirmed on WhatsApp.',
      slotLabel: 'Batch timing',
      slots: ['7:00 AM', '10:00 AM', '4:30 PM', '6:30 PM'],
      optionLabel: 'Course',
      options: ['JEE (XI)', 'JEE (XII)', 'NEET Crash', 'Class X'],
    },
    premiumFeatures: [
      { name: 'Online admission & fee payment', desc: 'Enrol, pay instalments and download receipts online.' },
      { name: 'Student test dashboards', desc: 'Score trends, rank analysis and weak-topic reports per student.' },
      { name: 'Parent progress portal', desc: 'Attendance and weekly reports parents can check anytime.' },
      { name: 'Batch timetable portal', desc: 'Live timetables with substitution and holiday alerts.' },
      { name: 'Study material library', desc: 'Secure PDF notes and DPPs, batch-wise access control.' },
      { name: 'Scholarship test registration', desc: 'Online registration, hall tickets and result publishing.' },
    ],
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
    about:
      'Iron Pulse is a 12,000 sq ft strength and conditioning facility with 24/7 biometric access, certified coaches and 30+ weekly group classes.',
    highlights: [
      { label: '24/7 access', desc: 'Biometric entry, train anytime' },
      { label: 'Certified coaches', desc: 'ACE & K11 certified trainers' },
      { label: '30+ weekly classes', desc: 'HIIT, yoga, Zumba, strength' },
      { label: 'Recovery zone', desc: 'Sauna, foam rolling and stretching area' },
    ],
    stats: [
      { value: '12k', label: 'Sq ft facility' },
      { value: '1,400+', label: 'Active members' },
      { value: '30+', label: 'Classes / week' },
      { value: '24/7', label: 'Open access' },
    ],
    hours: [
      { days: 'Members', time: 'Open 24/7 (biometric)' },
      { days: 'Staffed hours', time: '6:00 AM – 10:00 PM' },
    ],
    address: 'Plot 5, Sector 63, Noida, Uttar Pradesh 201301',
    gallery: [
      { src: '/images/gym-floor.png', alt: 'Fully equipped gym floor' },
      { src: '/images/gym-trainer.png', alt: 'Personal training session' },
      { src: '/images/gym-groupclass.png', alt: 'High-energy group class' },
    ],
    offeringsTitle: 'Memberships & Training',
    offerings: [
      { name: 'Monthly Membership', desc: 'Full floor + cardio access.', price: '₹1,500' },
      { name: 'Quarterly Membership', desc: 'Floor + 8 group classes/month.', price: '₹4,000' },
      { name: 'Annual Membership', desc: 'Best value — 2 months free.', price: '₹15,000', tag: 'Best value' },
      { name: 'Personal Training', desc: '12 sessions with certified coach.', price: '₹8,000' },
      { name: 'Group Classes', desc: 'HIIT, yoga, Zumba — unlimited.', price: '₹2,000/mo' },
      { name: 'Transformation Program', desc: '12-week coached plan with diet.', price: '₹18,000', tag: 'Popular' },
    ],
    reviews: [
      { name: 'Vikram T.', text: 'Joined after seeing the class schedule online. Zero hassle.' },
      { name: 'Neha P.', text: 'Paid my annual fee through the website in one tap.' },
      { name: 'Arjun D.', text: 'Booked a free trial workout online — signed up the same day.' },
    ],
    team: [
      { name: 'Sandeep Yadav', role: 'Head Coach — Strength' },
      { name: 'Pooja Rathi', role: 'Yoga & Mobility Lead' },
      { name: 'Kabir Anand', role: 'Transformation Coach' },
    ],
    faqs: [
      { q: 'Is there a free trial?', a: 'Yes — book one free workout + facility tour online. No card required.' },
      { q: 'Can I freeze my membership?', a: 'Annual members can freeze up to 30 days a year from the member portal.' },
      { q: 'Are diet plans included?', a: 'Personal training and transformation programs include coach-built diet plans.' },
    ],
    offer: 'Free trial workout + body composition scan for online sign-ups',
    booking: {
      title: 'Book a free trial workout',
      subtitle: 'One free session with a coach — see the floor before you join.',
      slotLabel: 'Preferred time',
      slots: ['6:30 AM', '9:00 AM', '5:00 PM', '7:00 PM', '9:00 PM'],
      optionLabel: 'Goal',
      options: ['Fat loss', 'Muscle gain', 'General fitness', 'Group classes'],
    },
    premiumFeatures: [
      { name: 'Class schedule & slot booking', desc: 'Live weekly timetable with per-class seat booking.' },
      { name: 'Online membership payments', desc: 'Join, renew and upgrade with UPI/cards — auto receipts.' },
      { name: 'Trainer profiles & PT plans', desc: 'Coach bios, specialisations and package purchase.' },
      { name: 'Member portal', desc: 'Attendance, plan expiry, freeze requests and renewals.' },
      { name: 'Transformation showcase', desc: 'Before/after member stories that sell memberships.' },
      { name: 'Corporate & referral programs', desc: 'B2B tie-up pages and referral reward tracking.' },
    ],
  },
]

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug)
}
