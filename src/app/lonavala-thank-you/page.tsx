import ThankYouContent from '@/components/ThankYouContent';
import { GOOGLE_ADS_LEAD_CONVERSION_SEND_TO } from '@/utils/googleAdsConversion';

/** Dedicated thank-you URL for Lonavala Google Ads conversion tracking */
export default function LonavalaThankYouPage() {
  return (
    <ThankYouContent
      pageTitle="Thank You | Lonavala Pest Control Quote | Pest Control 99"
      metaDescription="Your Lonavala pest control quote request was received. Our team will contact you shortly."
      conversionSendTo={GOOGLE_ADS_LEAD_CONVERSION_SEND_TO}
      analyticsEventName="lonavala_quote_submit"
      backLink="/pest-control-in-lonavala/"
      backLabel="Back to Lonavala Page"
    />
  );
}
