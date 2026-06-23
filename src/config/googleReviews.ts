import { BUSINESS } from '@/config/business';

export type GoogleReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  avatarColor: string;
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: '1',
    name: 'Sunita R.',
    location: 'Andheri West, Mumbai',
    rating: 5,
    date: '2 months ago',
    text: 'Excellent cockroach treatment. No smell, kids were home the same day. Technicians were polite and explained everything clearly. Highly recommend Pest Control 99.',
    avatarColor: '#1E7E34',
  },
  {
    id: '2',
    name: 'Rahul M.',
    location: 'Thane',
    rating: 5,
    date: '3 weeks ago',
    text: 'Same-day mosquito fogging for our society terrace. Fair pricing, no hidden charges, and the team arrived on time. Mosquitoes reduced within a day.',
    avatarColor: '#1B2A6B',
  },
  {
    id: '3',
    name: 'Amit K.',
    location: 'Bandra, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Professional termite treatment for our flat. Clean drilling work, neat finish, and they shared a written warranty. Very satisfied with the service.',
    avatarColor: '#0284C7',
  },
  {
    id: '4',
    name: 'Priya S.',
    location: 'Powai, Mumbai',
    rating: 5,
    date: '5 weeks ago',
    text: 'Booked through WhatsApp and got a quote within hours. General pest control for 3 BHK — effective results and friendly staff. Will use again.',
    avatarColor: '#7C3AED',
  },
  {
    id: '5',
    name: 'Rajesh K.',
    location: 'Vashi, Navi Mumbai',
    rating: 4,
    date: '2 weeks ago',
    text: 'Rodent issue in our restaurant kitchen was handled quickly. Entry points sealed properly and follow-up visit included. Good commercial service.',
    avatarColor: '#C2410C',
  },
  {
    id: '6',
    name: 'Meera P.',
    location: 'Lonavala',
    rating: 5,
    date: '1 month ago',
    text: 'Monsoon pest control for our villa — cockroach and ant treatment before guests arrived. Team travelled to Lonavala and did a thorough job.',
    avatarColor: '#0D9488',
  },
];

export const GOOGLE_RATING_SUMMARY = {
  rating: BUSINESS.aggregateRating.ratingValue,
  reviewCount: BUSINESS.aggregateRating.reviewCount,
};
