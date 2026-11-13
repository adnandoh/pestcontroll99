import type { HomeFormData } from '@/utils/formStorage';
import IndiaFlagIcon from './icons/IndiaFlagIcon';
import { sanitizePersonNameInput } from '@/utils/personName';

const FREE_SOCIETY_SERVICES = [
  {
    value: 'cockroach-ants',
    label: 'Cockroach & Ants',
    image: '/images/booking-pests/cockroach.jpg',
  },
  {
    value: 'rodent',
    label: 'Rodent Control',
    image: '/images/booking-pests/rodent.jpg',
  },
] as const;

export const SOCIETY_PAID_PESTS = [
  { value: 'termite', label: 'Termite', image: '/images/booking-pests/termite.jpg' },
  { value: 'mosquito', label: 'Mosquito', image: '/images/booking-pests/mosquito.jpg' },
  { value: 'bedbugs', label: 'Bed Bugs', image: '/images/booking-pests/bedbug.jpg' },
  { value: 'wood-borer', label: 'Wood Borer', image: '/images/booking-pests/woodborer.jpg' },
] as const;

export const COMMERCIAL_PROPERTY_TYPES = [
  { value: 'restaurant-cafe', label: 'Restaurant / Cafe' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'office', label: 'Office' },
  { value: 'shop', label: 'Shop' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'other', label: 'Other' },
] as const;

export const COMMERCIAL_PESTS = [
  { value: 'cockroach-ants', label: 'Cockroach & Ants', image: '/images/booking-pests/cockroach.jpg' },
  { value: 'bedbugs', label: 'Bed Bugs', image: '/images/booking-pests/bedbug.jpg' },
  { value: 'termite', label: 'Termite', image: '/images/booking-pests/termite.jpg' },
  { value: 'rodent', label: 'Rodent', image: '/images/booking-pests/rodent.jpg' },
  { value: 'mosquito', label: 'Mosquito', image: '/images/booking-pests/mosquito.jpg' },
  { value: 'wood-borer', label: 'Wood Borer', image: '/images/booking-pests/woodborer.jpg' },
] as const;

function Tick() {
  return <i className="pc-tick" aria-hidden="true" />;
}

type SharedProps = {
  formData: HomeFormData;
  errors: Record<string, string>;
  onChange: (field: keyof HomeFormData, value: unknown) => void;
  onQueueInquiry?: () => void;
};

export function SocietyBookingPanel({
  formData,
  errors,
  onChange,
  onQueueInquiry,
  onSwitchToPaid,
}: SharedProps & { onSwitchToPaid: () => void }) {
  const isFree = formData.societyProgram !== 'paid';

  return (
    <div className="pc-society">
      <div className="pc-pair pc-society-prog" role="radiogroup" aria-label="Society programme">
        <button
          type="button"
          className={`pc-pair-btn${isFree ? ' is-on' : ''}`}
          role="radio"
          aria-checked={isFree}
          onClick={() => onChange('societyProgram', 'free')}
        >
          FREE Programme ₹0
          {isFree ? <Tick /> : null}
        </button>
        <button
          type="button"
          className={`pc-pair-btn${!isFree ? ' is-on' : ''}`}
          role="radio"
          aria-checked={!isFree}
          onClick={() => onChange('societyProgram', 'paid')}
        >
          Paid Services
          {!isFree ? <Tick /> : null}
        </button>
      </div>

      {isFree ? (
        <>
          <div className="pc-society-banner">
            <strong>FREE Society Pest Control For Approved Common Areas</strong>
            <p>4 SERVICES | 12 MONTHS | ₹0 SOCIETY COST</p>
          </div>

          <p className="pc-label">Free services included</p>
          <div className="pc-society-free-grid" role="list">
            {FREE_SOCIETY_SERVICES.map((svc) => (
              <div key={svc.value} className="pc-pest is-on" role="listitem">
                <span className="pc-pest-photo">
                  <img src={svc.image} alt="" />
                </span>
                <span className="pc-pest-name">{svc.label}</span>
                <Tick />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="pc-label">
            Paid / specialised services <span className="pc-req">*</span>
          </p>
          <div className="pc-pest-grid pc-pest-grid-tall" role="group" aria-label="Paid pest services">
            {SOCIETY_PAID_PESTS.map((pest) => {
              const on = formData.pestTypes.includes(pest.value);
              return (
                <button
                  key={pest.value}
                  type="button"
                  className={`pc-pest${on ? ' is-on' : ''}`}
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => {
                    const current = formData.pestTypes.filter(Boolean);
                    const next = current.includes(pest.value)
                      ? current.filter((p) => p !== pest.value)
                      : [...current, pest.value];
                    onChange('pestTypes', next);
                  }}
                >
                  <span className="pc-pest-photo">
                    <img src={pest.image} alt="" />
                  </span>
                  <span className="pc-pest-name">{pest.label}</span>
                  {on ? <Tick /> : null}
                </button>
              );
            })}
          </div>
          {errors.pestTypes ? <p className="pc-error">{errors.pestTypes}</p> : null}
        </>
      )}

      <p className="pc-label">
        {isFree ? 'Book Your Free Inspection' : 'Request Paid Inspection'}
      </p>
      <InspectionContactFields
        formData={formData}
        errors={errors}
        onChange={onChange}
        onQueueInquiry={onQueueInquiry}
        propertyLabel="Society Name"
        propertyPlaceholder="Society / building name"
      />

      {isFree ? (
        <div className="pc-society-paid-cta">
          <strong>Need Other Pest Control Services?</strong>
          <p>Termite, Mosquito, Bed Bugs, Wood Borer</p>
          <button type="button" className="pc-outline-btn" onClick={onSwitchToPaid}>
            Request Paid Inspection →
          </button>
        </div>
      ) : null}

      <p className="pc-society-note">
        Free programme covers general pest and rodent control in approved society common areas.
        Other specialised services are chargeable. Individual-flat paid booking remains under
        Residential.
      </p>
    </div>
  );
}

export function CommercialBookingPanel({
  formData,
  errors,
  onChange,
  onQueueInquiry,
}: SharedProps) {
  return (
    <div className="pc-commercial">
      <p className="pc-label">
        Select Your Property Type <span className="pc-req">*</span>
      </p>
      <div className="pc-prop-grid" role="radiogroup" aria-label="Commercial property type">
        {COMMERCIAL_PROPERTY_TYPES.map((opt) => {
          const on = formData.commercialPropertyType === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`pc-prop-btn${on ? ' is-on' : ''}`}
              role="radio"
              aria-checked={on}
              onClick={() => onChange('commercialPropertyType', opt.value)}
            >
              <span>{opt.label}</span>
              {on ? <Tick /> : null}
            </button>
          );
        })}
      </div>
      {errors.commercialPropertyType ? (
        <p className="pc-error">{errors.commercialPropertyType}</p>
      ) : null}

      <p className="pc-label">
        What pest problem? <span className="pc-req">*</span>
      </p>
      <div className="pc-pest-grid pc-pest-grid-tall" role="group" aria-label="What pest problem?">
        {COMMERCIAL_PESTS.map((pest) => {
          const on = formData.pestTypes.includes(pest.value);
          return (
            <button
              key={pest.value}
              type="button"
              className={`pc-pest${on ? ' is-on' : ''}`}
              role="checkbox"
              aria-checked={on}
              onClick={() => {
                const current = formData.pestTypes.filter(Boolean);
                const next = current.includes(pest.value)
                  ? current.filter((p) => p !== pest.value)
                  : [...current, pest.value];
                onChange('pestTypes', next);
              }}
            >
              <span className="pc-pest-photo">
                <img src={pest.image} alt="" />
              </span>
              <span className="pc-pest-name">{pest.label}</span>
              {on ? <Tick /> : null}
            </button>
          );
        })}
      </div>
      {errors.pestTypes ? <p className="pc-error">{errors.pestTypes}</p> : null}

      <p className="pc-label">Request Free Inspection & Quotation</p>
      <InspectionContactFields
        formData={formData}
        errors={errors}
        onChange={onChange}
        onQueueInquiry={onQueueInquiry}
        propertyLabel="Business / Property Name"
        propertyPlaceholder="Business or property name"
        showApproxSqFt
      />
      <p className="pc-society-note">
        Commercial service pricing is provided after property inspection and service assessment.
      </p>
    </div>
  );
}

function InspectionContactFields({
  formData,
  errors,
  onChange,
  onQueueInquiry,
  propertyLabel,
  propertyPlaceholder,
  showApproxSqFt = false,
}: SharedProps & {
  propertyLabel: string;
  propertyPlaceholder: string;
  showApproxSqFt?: boolean;
}) {
  return (
    <div className="pc-inspect-fields">
      <label className={`pc-field${errors.propertyName ? ' is-invalid' : ''}`}>
        <span className="pc-sr">{propertyLabel}, required</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 20V7.5A1.5 1.5 0 0 1 5.5 5H14v15M14 9h4.5A1.5 1.5 0 0 1 20 10.5V20M4 20h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={formData.propertyName || ''}
          onChange={(e) => onChange('propertyName', e.target.value)}
          placeholder={propertyPlaceholder}
          autoComplete="organization"
        />
      </label>
      {errors.propertyName ? <p className="pc-error">{errors.propertyName}</p> : null}

      <label className={`pc-field${errors.name ? ' is-invalid' : ''}`}>
        <span className="pc-sr">Contact person, required</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M5.5 19.2c1.2-2.8 3.5-4.2 6.5-4.2s5.3 1.4 6.5 4.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', sanitizePersonNameInput(e.target.value))}
          onBlur={() => onQueueInquiry?.()}
          placeholder="Contact person"
          autoComplete="name"
          autoCapitalize="words"
        />
      </label>
      {errors.name ? <p className="pc-error">{errors.name}</p> : null}

      <label className={`pc-field pc-phone${errors.phone ? ' is-invalid' : ''}`}>
        <span className="pc-sr">Mobile / WhatsApp number, required</span>
        <IndiaFlagIcon className="pc-flag" />
        <span className="pc-cc">+91</span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          onBlur={() => onQueueInquiry?.()}
          placeholder="Mobile / WhatsApp number"
          maxLength={10}
        />
      </label>
      {errors.phone ? <p className="pc-error">{errors.phone}</p> : null}

      <label className={`pc-field${errors.streetAddress ? ' is-invalid' : ''}`}>
        <span className="pc-sr">Area / pincode, required</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.8 12 21 12 21Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="10.5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        <input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => onChange('streetAddress', e.target.value)}
          placeholder="Area / Pincode"
          autoComplete="postal-code"
        />
      </label>
      {errors.streetAddress ? <p className="pc-error">{errors.streetAddress}</p> : null}

      {showApproxSqFt ? (
        <>
          <label className={`pc-field${errors.approxSqFt ? ' is-invalid' : ''}`}>
            <span className="pc-sr">Approx. area in sq. ft.</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M8 12h8M12 8v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              inputMode="numeric"
              value={formData.approxSqFt || ''}
              onChange={(e) =>
                onChange('approxSqFt', e.target.value.replace(/[^\d]/g, '').slice(0, 7))
              }
              placeholder="Approx. Area (Sq. Ft.)"
            />
          </label>
          {errors.approxSqFt ? <p className="pc-error">{errors.approxSqFt}</p> : null}
        </>
      ) : null}
    </div>
  );
}
