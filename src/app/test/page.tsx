import TestComponents from '@/components/TestComponents';
import PageMeta from '@/components/PageMeta';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageMeta title="Test | Pest Control 99" noindex />
      <TestComponents />
    </div>
  );
}
