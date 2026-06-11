/**
 * Rich SEO content for specific area pages (overrides placeholders).
 */

export type AreaRichContent = {
  pageTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  introParagraphs: string[];
  servicesOffered: string[];
  commitmentParagraph: string;
  closingParagraph: string;
  phoneCta: string;
  keywords: string;
  faq: { id: string; question: string; answer: string }[];
};

export const LONAVALA_AREA_CONTENT: AreaRichContent = {
  pageTitle: 'Reliable Monsoon Pest Control Services in Lonavala | Pest Control 99',
  metaDescription:
    'Professional monsoon pest control in Lonavala for villas, resorts, hotels & homestays. Cockroach, mosquito, termite & rodent treatment. Same-day service. Call 8080748282 for a free quote.',
  heroTitle: 'Reliable Monsoon Pest Control Services in Lonavala',
  heroSubtitle: 'Professional pest management for villas, resorts, hotels & homestays across Lonavala',
  heroImage: '/images/pest-control-lonavala.png',
  heroImageAlt: 'Professional monsoon pest control service in Lonavala by Pest Control 99',
  introParagraphs: [
    'Lonavala, a leading tourist destination in Maharashtra, attracts thousands of visitors during the monsoon for its scenic villas, resorts, and natural beauty. Increased rainfall and humidity during this season raise the risk of pest infestations in residential and commercial properties.',
    'Lonavala’s damp monsoon climate encourages pests such as cockroaches, mosquitoes, termites, ants, and rodents. Villas, resorts, hotels, and restaurants are especially vulnerable due to moisture buildup, water accumulation, and features like gardens or wooden interiors. Without effective pest management, infestations can damage property, compromise hygiene, and disrupt guest comfort.',
    'Pest Control 99 provides professional and reliable monsoon pest control services in Lonavala for villas, resorts, hotels, homestays, apartments, offices, restaurants, and commercial spaces. The expert team delivers safe, effective, and long-lasting pest treatment solutions tailored for monsoon conditions.',
    'Whether it is cockroach control in resort kitchens, mosquito control near swimming pools, termite treatment for wooden furniture, or rodent control in villas and hotels, Pest Control 99 offers complete protection for your property. These professional treatments help maintain cleanliness, hygiene, and guest comfort throughout the rainy season.',
    'Hospitality businesses in Lonavala depend heavily on customer satisfaction and positive reviews. Even a small pest issue can negatively impact the image of a resort, villa, or hotel. Pest Control 99 helps property owners maintain a pest-free environment so guests can enjoy a safe, comfortable, and hygienic stay.',
  ],
  servicesOffered: [
    'Cockroach Control',
    'Mosquito Control & Fogging',
    'Termite Treatment',
    'Rodent Control',
    'Ant Control',
    'Bed Bug Treatment',
    'General Pest Management',
    'Preventive Monsoon Pest Protection',
  ],
  commitmentParagraph:
    'Pest Control 99 is committed to providing the best pest control services with professional treatment, quick response, and long-lasting protection. Whether it is villas, resorts, hotels, restaurants, offices, or residential properties, the expert team ensures safe and effective pest management solutions for every customer. From cockroach control and termite treatment to mosquito and rodent control, every service is performed using modern techniques and quality products.',
  closingParagraph:
    'Pest Control 99 provides the best pest control services in Lonavala for urgent pest problems in hotels, villas, resorts, and homestays. The trained professionals use modern equipment and safe treatment methods suitable for residential as well as commercial properties. This monsoon, protect your property from unwanted pests with trusted pest control services in Lonavala by Pest Control 99.',
  phoneCta: '8080748282',
  keywords:
    'pest control services in Lonavala, monsoon pest control in Lonavala, best pest control service in Lonavala, villa pest control in Lonavala, resort pest control in Lonavala, hotel pest control in Lonavala, cockroach control in Lonavala, mosquito control service in Lonavala, termite treatment in Lonavala, emergency pest control in Lonavala',
  faq: [
    {
      id: 'monsoon',
      question: 'Why is monsoon pest control important in Lonavala?',
      answer:
        'Lonavala’s monsoon humidity increases cockroach, mosquito, termite, ant, and rodent activity. Villas, resorts, and hotels with gardens or wooden interiors are especially at risk without professional treatment.',
    },
    {
      id: 'properties',
      question: 'Which properties do you serve in Lonavala?',
      answer:
        'We provide pest control for villas, resorts, hotels, homestays, apartments, offices, restaurants, and commercial spaces across Lonavala.',
    },
    {
      id: 'same-day',
      question: 'Do you offer same-day pest control in Lonavala?',
      answer:
        'Yes. Pest Control 99 offers same-day service, 24/7 emergency support, and quick response for urgent pest problems in Lonavala.',
    },
    {
      id: 'services',
      question: 'What pest control services are available in Lonavala?',
      answer:
        'Cockroach control, mosquito control & fogging, termite treatment, rodent control, ant control, bed bug treatment, general pest management, and preventive monsoon pest protection.',
    },
    {
      id: 'quote',
      question: 'How can I get a free quote for pest control in Lonavala?',
      answer:
        'Fill in the free quote form on this page or call 8080748282. Our team responds the same day with an accurate quote for your property.',
    },
  ],
};

const AREA_CONTENT_REGISTRY: Record<string, AreaRichContent> = {
  lonavala: LONAVALA_AREA_CONTENT,
};

export function getAreaRichContent(slug: string): AreaRichContent | undefined {
  return AREA_CONTENT_REGISTRY[slug.toLowerCase()];
}
