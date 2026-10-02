export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#db2777" />
      <path d="M12 9v13a8 8 0 0 0 16 0V9" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 20l4 4.5 7-9" fill="none" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
