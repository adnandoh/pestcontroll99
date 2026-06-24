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

const AVATAR_COLORS = [
  '#1E7E34',
  '#1B2A6B',
  '#0284C7',
  '#7C3AED',
  '#C2410C',
  '#0D9488',
  '#BE185D',
  '#B45309',
  '#4F46E5',
  '#059669',
];

function colorForIndex(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

/** Real Google reviews — customer posts only (owner replies excluded). */
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'annu-shah',
    name: 'Annu Shah',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Pest Control 99 did a great job at my place. They took care of my cockroach issue quickly. The technician was friendly and explained everything well.',
    avatarColor: colorForIndex(1),
  },
  {
    id: 'toral-mayani',
    name: 'Toral Mayani',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Loved the service. Thank you so much for your prompt and immediate action — we had gone through a nightmare due to bed bugs but now had a peaceful sleep.',
    avatarColor: colorForIndex(2),
  },
  {
    id: 'arsalaan-shaikh',
    name: 'Arsalaan Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'I had a rat problem in my office, and Pest Control 99 came to the rescue. They were professional and did a thorough job. No more sightings after their visit.',
    avatarColor: colorForIndex(3),
  },
  {
    id: 'arsh-shaikh',
    name: 'Arsh Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 week ago',
    text: 'Best termite treatment service in Mumbai. Very knowledgeable staff and long-lasting results. Highly recommended.',
    avatarColor: colorForIndex(4),
  },
  {
    id: 'priya-gogia',
    name: 'Priya Gogia',
    location: 'Mumbai',
    rating: 5,
    date: '1 week ago',
    text: 'Excellent service. We highly recommend Pest Control 99 to everyone. It really solved pest infestation at our office. Thanks a lot!',
    avatarColor: colorForIndex(5),
  },
  {
    id: 'imran-shaikh',
    name: 'Imran Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'I had a good experience with Pest Control 99. Their termite control service was really effective. They worked in great detail, and I liked the result.',
    avatarColor: colorForIndex(6),
  },
  {
    id: 'kasim-shaikh-mosquito',
    name: 'Kasim Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: "Pest Control 99's service was thorough, and the work done was very good. Their method for mosquito control seemed quite effective.",
    avatarColor: colorForIndex(7),
  },
  {
    id: 'kasim-shaikh-termite',
    name: 'Kasim Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Pest Control 99 really helped me with my termite issue. They were prompt and did a thorough job. The team explained everything clearly, which I appreciated.',
    avatarColor: colorForIndex(8),
  },
  {
    id: 'rehana-khan',
    name: 'Rehana Khan',
    location: 'Bandra, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Great experience with Pest Control 99 in Bandra. Service was fast and the chemicals felt safe. A safe option for the family.',
    avatarColor: colorForIndex(9),
  },
  {
    id: 'bushra-khan',
    name: 'Bushra Khan',
    location: 'Bandra, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Fast and efficient pest control service in Bandra. The technician was friendly and gave proper guidance.',
    avatarColor: colorForIndex(0),
  },
  {
    id: 'aaro-singh',
    name: 'Aaro Singh',
    location: 'Borivali, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Got very good service in Borivali. The technician was experienced and did the work cleanly.',
    avatarColor: colorForIndex(1),
  },
  {
    id: 'sunil-shinde',
    name: 'Sunil Shinde',
    location: 'Dadar, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Reliable pest control company in Dadar. Staff was polite and service quality was excellent.',
    avatarColor: colorForIndex(2),
  },
  {
    id: 'nafis-shaikh',
    name: 'Nafis Ali Shaikh',
    location: 'Malad, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Professional pest control service in Malad.',
    avatarColor: colorForIndex(3),
  },
  {
    id: 'ayan-sayyed',
    name: 'Ayan Sayyed',
    location: 'Powai, Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Reliable pest control service in Powai. Got same-day booking and the treatment result was good.',
    avatarColor: colorForIndex(4),
  },
  {
    id: 'simran-baig',
    name: 'Simran Baig',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Top pest control company in Mumbai. Affordable pricing and professional approach. Highly reliable.',
    avatarColor: colorForIndex(5),
  },
  {
    id: 'sana-khan',
    name: 'Sana Khan',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: "It's a very good service provided by them — thanks for the cockroach pest control done.",
    avatarColor: colorForIndex(6),
  },
  {
    id: 'zetsuu',
    name: 'Zetsuu',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'I needed help with mosquito control for my house in Mumbai. The team was quite efficient and got rid of the problem quickly.',
    avatarColor: colorForIndex(7),
  },
  {
    id: 'nawaz-shaikh',
    name: 'Nawaz Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Pest Control 99 did excellent work at my home in Mumbai. The technician was knowledgeable and explained everything clearly. I started seeing results within a few days.',
    avatarColor: colorForIndex(8),
  },
  {
    id: 'jibachh-das',
    name: 'Jibachh Das',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Highly reliable service. The family feels safe now. If you have a pest problem, definitely try Pest Control 99!',
    avatarColor: colorForIndex(9),
  },
  {
    id: 'mohd-iqbal-shaikh',
    name: 'Mohd Iqbal Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '8 hours ago',
    text: 'Cockroaches made life tough due to their infestation. Everyone in the family was ill. We booked Pest Control 99 without delay. Happy with the service.',
    avatarColor: colorForIndex(0),
  },
  {
    id: 'govind-kokate',
    name: 'Govind Kokate',
    location: 'Mumbai',
    rating: 5,
    date: '9 hours ago',
    text: 'Trust me, this is the best pest control service in Mumbai. Quick service and expert team. We got the desired results. Thank you Pest Control 99.',
    avatarColor: colorForIndex(1),
  },
  {
    id: 'arun-yadav',
    name: 'Arun Yadav',
    location: 'Mumbai',
    rating: 5,
    date: '9 hours ago',
    text: 'I delayed pest control because I was looking for an odourless and harmless service. It was one of the best services I have ever had. Thank you.',
    avatarColor: colorForIndex(2),
  },
  {
    id: 'arjun-das',
    name: 'Arjun Das',
    location: 'Mumbai',
    rating: 5,
    date: '10 hours ago',
    text: 'Mosquitoes are very dangerous insects. Our children were unhappy because of mosquito bites. Sprays did not solve the problem. Thanks to Pest Control 99 — problem solved.',
    avatarColor: colorForIndex(3),
  },
  {
    id: 'govind-lal',
    name: 'Govind Lal',
    location: 'Mumbai',
    rating: 5,
    date: '1 day ago',
    text: 'Termites damaged my costly furniture. I booked emergency service with Pest Control 99 and stopped further damage. Best service.',
    avatarColor: colorForIndex(4),
  },
  {
    id: 'umar-khan',
    name: 'Umar Khan',
    location: 'Mumbai',
    rating: 5,
    date: '1 day ago',
    text: 'We were facing issues with pests like ants and spiders. After the Pest Control 99 service, there are no more pests on our premises. Very thankful!',
    avatarColor: colorForIndex(5),
  },
  {
    id: 'kamlesh-pal',
    name: 'Kamlesh Rupchand Pal',
    location: 'Mumbai',
    rating: 5,
    date: '1 day ago',
    text: 'Even a small cockroach can be deadly. Pest control is a necessity nowadays. I booked Pest Control 99 for my office as well as my house. Good service.',
    avatarColor: colorForIndex(6),
  },
  {
    id: 'arthur-mccoy',
    name: 'Arthur McCoy',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'Quick service, polite staff, and the treatment worked well. Overall, a convenient and satisfactory experience.',
    avatarColor: colorForIndex(7),
  },
  {
    id: 'nandu-malandkar',
    name: 'Nandu Malandkar',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'We tried almost all sprays, but they did not work. Cockroaches came back again. Finally, they are completely out of my house. Thanks to Pest Control 99.',
    avatarColor: colorForIndex(8),
  },
  {
    id: 'mahesh-raut',
    name: 'Mahesh Raut',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'Very good service. No more bed bugs on my bed. Now I can sleep happily. Thank you for your good service.',
    avatarColor: colorForIndex(9),
  },
  {
    id: 'pradeep-tiwari',
    name: 'Pradeep Tiwari',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'Cockroaches cannot be handled by home remedies and local sprays. We booked an expert service from Pest Control 99. They gave us the best service.',
    avatarColor: colorForIndex(0),
  },
  {
    id: 'gagan-kushwaha',
    name: 'Gagan Kushwaha',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'Rodents damaged everything in my office — files, wires and furniture. We immediately booked Pest Control 99. We saved our office from rodents. Best service.',
    avatarColor: colorForIndex(1),
  },
  {
    id: 'vikash-thakur',
    name: 'Vikash Thakur',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'Bed bugs had taken over my bed until I realised their presence. I booked a pest control service, and now I am free from bed bugs. Thank you for the best service.',
    avatarColor: colorForIndex(2),
  },
  {
    id: 'mehboob-shaikh',
    name: 'Mehboob Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '3 days ago',
    text: 'I felt embarrassed in front of my guests when I saw my kitchen full of cockroaches. I called the Pest Control 99 team immediately. Thankful for their quick, best service.',
    avatarColor: colorForIndex(3),
  },
  {
    id: 'kamlashankar-yadav',
    name: 'Kamlashankar Yadav',
    location: 'Mumbai',
    rating: 5,
    date: '4 days ago',
    text: 'Pest control completed — fully satisfied. It is child-friendly and eco-friendly, safe and secure for all. Thank you, Pest Control 99.',
    avatarColor: colorForIndex(4),
  },
  {
    id: 'suraj-parkar',
    name: 'Suraj Parkar',
    location: 'Mumbai',
    rating: 5,
    date: '4 days ago',
    text: 'We had a bed bug issue and found out much later. We had skin rashes and infections. The Pest Control 99 team examined the problem first — next day we were free from bed bugs.',
    avatarColor: colorForIndex(5),
  },
  {
    id: 'saira-shaikh',
    name: 'Saira Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '5 days ago',
    text: 'The Pest Control 99 team arrived on time. They are very cooperative and expert in complete pest management. Satisfied with their service and professionalism.',
    avatarColor: colorForIndex(6),
  },
  {
    id: 'sudam-jadhav',
    name: 'Sudam Jadhav',
    location: 'Mumbai',
    rating: 5,
    date: '5 days ago',
    text: 'I am very happy with the professional service of Pest Control 99. They actually controlled the pests effectively.',
    avatarColor: colorForIndex(7),
  },
  {
    id: 'tahir-hashmi',
    name: 'Tahir Hashmi',
    location: 'Mumbai',
    rating: 5,
    date: '1 week ago',
    text: 'Very good service. No more bed bugs on my bed. Now I can sleep happily.',
    avatarColor: colorForIndex(8),
  },
  {
    id: 'pinky-singh',
    name: 'Pinky Singh',
    location: 'Mumbai',
    rating: 5,
    date: '8 months ago',
    text: 'Very professional company. Very effective pest control services.',
    avatarColor: colorForIndex(9),
  },
  {
    id: 'ravindra-naidu',
    name: 'Ravindra Naidu',
    location: 'Mumbai',
    rating: 5,
    date: '8 months ago',
    text: 'Quality of service is appreciated.',
    avatarColor: colorForIndex(0),
  },
  {
    id: 'sardar-khan',
    name: 'Sardar Khan',
    location: 'Mumbai',
    rating: 5,
    date: '8 months ago',
    text: 'Very excellent services.',
    avatarColor: colorForIndex(1),
  },
  {
    id: 'adnan-shaikh',
    name: 'Adnan Shaikh',
    location: 'Mumbai',
    rating: 5,
    date: '1 month ago',
    text: 'Best pest service in Mumbai.',
    avatarColor: colorForIndex(2),
  },
];

export const GOOGLE_RATING_SUMMARY = {
  rating: BUSINESS.aggregateRating.ratingValue,
  reviewCount: BUSINESS.aggregateRating.reviewCount,
};

export type ServiceReviewFilter =
  | 'cockroach'
  | 'mosquito'
  | 'termite'
  | 'rodent'
  | 'bed-bug'
  | 'wood-borer'
  | 'honey-bee';

const SERVICE_REVIEW_KEYWORDS: Record<ServiceReviewFilter, string[]> = {
  cockroach: ['cockroach', 'roach', 'kitchen'],
  mosquito: ['mosquito'],
  termite: ['termite'],
  rodent: ['rodent', 'rat', 'rodents'],
  'bed-bug': ['bed bug', 'sleep happily', 'peaceful sleep'],
  'wood-borer': ['wood borer', 'borer', 'furniture'],
  'honey-bee': ['bee', 'hive'],
};

/** Pick real Google reviews relevant to a service page; fills with other reviews if needed. */
export function getReviewsForService(service: ServiceReviewFilter, limit = 3): GoogleReview[] {
  const keywords = SERVICE_REVIEW_KEYWORDS[service];
  const matched = GOOGLE_REVIEWS.filter((review) =>
    keywords.some((keyword) => review.text.toLowerCase().includes(keyword)),
  );

  if (matched.length >= limit) {
    return matched.slice(0, limit);
  }

  const usedIds = new Set(matched.map((review) => review.id));
  const fallback = GOOGLE_REVIEWS.filter((review) => !usedIds.has(review.id));
  return [...matched, ...fallback].slice(0, limit);
}
