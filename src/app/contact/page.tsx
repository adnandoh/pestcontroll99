import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Pest Control Services Mumbai | PestControl99',
  description: 'Contact PestControl99 for professional pest control services in Mumbai. Get free quotes, same-day service, and expert consultation. Call +91 77100 32627 or fill our contact form.',
  keywords: 'contact pest control mumbai, pest control contact, pest control quote mumbai, pest control consultation, pest control experts mumbai, pest control phone number',
  openGraph: {
    title: 'Contact Us | Pest Control Services Mumbai | PestControl99',
    description: 'Contact PestControl99 for professional pest control services in Mumbai. Get free quotes, same-day service, and expert consultation.',
    type: 'website',
    url: 'https://www.pestcontrol99.com/contact',
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/contact',
  },
};

export default function Contact() {
  return <ContactForm />;
}