import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import NotFoundPage from '@/app/not-found';

const HomePage = lazy(() => import('@/app/page'));
const AboutPage = lazy(() => import('@/app/about/page'));
const BlogPage = lazy(() => import('@/app/blog/page'));
const BlogPostPage = lazy(() => import('@/app/blog/[slug]/page'));
const BlogCategoryPage = lazy(() => import('@/app/blog/category/[slug]/page'));
const BlogTagPage = lazy(() => import('@/app/blog/tag/[slug]/page'));
const ContactPage = lazy(() => import('@/app/contact/page'));
const DataDeletionPage = lazy(() => import('@/app/data-deletion/page'));
const FeedbackPage = lazy(() => import('@/app/feedback/page'));
const FeedbackDetailPage = lazy(() => import('@/app/feedback/[id]/page'));
const LegalPage = lazy(() => import('@/app/legal/page'));
const PrivacyPolicyPage = lazy(() => import('@/app/privacy-policy/page'));
const QuotePage = lazy(() => import('@/app/quote/page'));
const QuoteSimplePage = lazy(() => import('@/app/quote-simple/page'));
const ServicesPage = lazy(() => import('@/app/services/page'));
const CockroachPage = lazy(() => import('@/app/services/cockroach-pest-control/page'));
const HoneyBeePage = lazy(() => import('@/app/services/honey-bee-pest-control/page'));
const MosquitoPage = lazy(() => import('@/app/services/mosquito-pest-control/page'));
const RodentPage = lazy(() => import('@/app/services/rodent-pest-control/page'));
const TermitePage = lazy(() => import('@/app/services/termite-pest-control/page'));
const WoodBorerPage = lazy(() => import('@/app/services/wood-borer-control/page'));
const TermsPage = lazy(() => import('@/app/terms-and-conditions/page'));
const RefundPolicyPage = lazy(() => import('@/app/refund-policy/page'));
const DeleteAccountPage = lazy(() => import('@/app/delete-account/page'));
const TestPage = lazy(() => import('@/app/test/page'));
const ThankYouPage = lazy(() => import('@/app/thank-you/page'));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
    </div>
  );
}

function TrailingSlashRedirect() {
  const { pathname, search, hash } = useLocation();
  if (
    pathname !== '/' &&
    !pathname.endsWith('/') &&
    !pathname.includes('.') &&
    !pathname.startsWith('/api')
  ) {
    return <Navigate to={`${pathname}/${search}${hash}`} replace />;
  }
  return null;
}

export default function App() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col">
      <TrailingSlashRedirect />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/category/:slug" element={<BlogCategoryPage />} />
            <Route path="blog/tag/:slug" element={<BlogTagPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="contact-us" element={<Navigate to="/contact/" replace />} />
            <Route path="delete-account" element={<DeleteAccountPage />} />
            <Route path="data-deletion" element={<DataDeletionPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="feedback/:id" element={<FeedbackDetailPage />} />
            <Route path="legal" element={<LegalPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="quote" element={<QuotePage />} />
            <Route path="quote-simple" element={<QuoteSimplePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/cockroach-pest-control" element={<CockroachPage />} />
            <Route path="services/honey-bee-pest-control" element={<HoneyBeePage />} />
            <Route path="services/mosquito-pest-control" element={<MosquitoPage />} />
            <Route path="services/rodent-pest-control" element={<RodentPage />} />
            <Route path="services/termite-pest-control" element={<TermitePage />} />
            <Route path="services/wood-borer-control" element={<WoodBorerPage />} />
            <Route path="terms-and-conditions" element={<TermsPage />} />
            <Route path="terms" element={<Navigate to="/terms-and-conditions/" replace />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            <Route path="test" element={<TestPage />} />
            <Route path="thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
