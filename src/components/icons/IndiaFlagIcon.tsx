export default function IndiaFlagIcon({ className = 'h-4 w-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      <circle cx="12" cy="8" r="2.2" fill="none" stroke="#000080" strokeWidth="0.45" />
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 12 + Math.cos(angle) * 0.55;
        const y1 = 8 + Math.sin(angle) * 0.55;
        const x2 = 12 + Math.cos(angle) * 2.2;
        const y2 = 8 + Math.sin(angle) * 2.2;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth="0.22"
          />
        );
      })}
    </svg>
  );
}
