import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelectPest from '@/components/MultiSelectPest';
import { submitHomeQuoteForm } from '@/services/formSubmit';

export default function SimpleQuotePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    propertyType: '1bhk',
    propertySize: '',
    pestTypes: [] as string[],
    additionalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.pestTypes.length === 0) {
      newErrors.pestTypes = 'Please select at least one pest type';
    }

    if (!formData.propertySize) {
      newErrors.propertySize = 'Property size is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await submitHomeQuoteForm({
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        email: formData.email,
        pestTypes: formData.pestTypes,
        streetAddress: formData.address,
        premiseType: ['office', 'restaurant', 'warehouse'].includes(formData.propertyType)
          ? 'commercial'
          : 'residential',
        premiseSize: formData.propertyType,
        serviceType: 'one-time',
        estimatedPrice: 0,
        message: formData.additionalDetails,
      });

      if (result.ok) {
        navigate('/thank-you/', { replace: true });
        return;
      }

      setSubmitError(result.error || 'Failed to send quote request. Please try again.');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handlePestTypesChange = (pestTypes: string[]) => {
    setFormData((prev) => ({ ...prev, pestTypes }));
    if (errors.pestTypes) {
      setErrors((prev) => ({ ...prev, pestTypes: '' }));
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get a Free Quote
            </h1>
            <p className="text-lg text-gray-600">
              Submit your details and our team will contact you shortly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {submitError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData((prev) => ({ ...prev, phone: value }));
                    }}
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="1rk">1 RK</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="2bhk">2 BHK</option>
                    <option value="3bhk">3 BHK</option>
                    <option value="4bhk">4 BHK</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Size *
                  </label>
                  <select
                    id="propertySize"
                    name="propertySize"
                    required
                    value={formData.propertySize}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.propertySize ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select property size</option>
                    <option value="500">Up to 500 sq.ft</option>
                    <option value="1000">500 - 1000 sq.ft</option>
                    <option value="1500">1000 - 1500 sq.ft</option>
                    <option value="2000">1500 - 2000 sq.ft</option>
                    <option value="3000">2000 - 3000 sq.ft</option>
                    <option value="3000+">3000+ sq.ft</option>
                  </select>
                  {errors.propertySize && (
                    <p className="mt-1 text-sm text-red-600">{errors.propertySize}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <MultiSelectPest selectedPests={formData.pestTypes} onChange={handlePestTypesChange} />
                {errors.pestTypes && (
                  <p className="mt-1 text-sm text-red-600">{errors.pestTypes}</p>
                )}
              </div>

              <div>
                <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  rows={4}
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full md:w-auto text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[200px]"
                >
                  {isSubmitting ? 'Sending Request...' : 'Get My Free Quote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
