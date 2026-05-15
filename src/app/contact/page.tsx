import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact PestControl99 | Best Pest Control Near Me in Mumbai',
  description: 'Need immediate pest help? Contact our Andheri West office for 24/7 support across Mumbai and Thane. Call +91 77100 32627 for a free quote.',
  keywords: 'contact pest control mumbai, pest control near me, andheri pest control, pest control andheri west, pest control contact mumbai, pest control phone number',
  openGraph: {
    title: 'Contact PestControl99 | Best Pest Control Near Me in Mumbai',
    description: 'Need immediate pest help? Contact our Andheri West office for 24/7 support across Mumbai and Thane. Call +91 77100 32627 for a free quote.',
    type: 'website',
    url: 'https://www.pestcontrol99.com/contact/',
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/contact/',
  },
};

export default function Contact() {
  return <ContactForm />;
}