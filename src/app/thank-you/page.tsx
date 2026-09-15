import ThankYouContent from '@/components/ThankYouContent';

export default function ThankYouPage() {
  return (
    <ThankYouContent
      analyticsEventName="home_booking_submit"
      backLink="/"
      backLabel="Back to Home"
    />
  );
}
