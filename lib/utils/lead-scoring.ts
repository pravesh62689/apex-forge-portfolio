export interface LeadData {
  websitePresent: boolean;
  websiteIsMobileOptimized?: boolean;
  googleRating: number;
  reviewsCount: number;
  category: string;
  hasPhone: boolean;
  hasEmail: boolean;
}

const HIGH_PRIORITY_NICHES = ['Dentist', 'Clinic', 'Salon', 'Gym', 'Coaching', 'Restaurant'];

export function calculateLeadScore(lead: LeadData): number {
  let score = 0;

  // Highest points for NO website or a broken one
  if (!lead.websitePresent) score += 30;
  if (lead.websitePresent && !lead.websiteIsMobileOptimized) score += 20;

  // Good reputation means they care about their business, making them better buyers
  if (lead.googleRating >= 4.0 && lead.reviewsCount >= 20) score += 15;

  // Niche priority
  if (HIGH_PRIORITY_NICHES.includes(lead.category)) score += 20;

  // Contactability
  if (lead.hasPhone) score += 10;
  if (lead.hasEmail) score += 5;

  return score; // Max possible: 100
}

export function getLeadPriority(score: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (score >= 70) return 'HIGH'; // Call immediately
  if (score >= 50) return 'MEDIUM'; // WhatsApp / Email
  return 'LOW'; // Keep in backup database
}
