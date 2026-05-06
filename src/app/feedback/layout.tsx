import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Feedback | PestControl99',
  description: 'Share your experience with PestControl99. Rate our services and technician behavior to help us improve.',
  openGraph: {
    title: 'Customer Feedback | PestControl99',
    description: 'Share your experience with PestControl99. Rate our services and technician behavior to help us improve.',
    url: 'https://www.pestcontrol99.com/feedback',
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
