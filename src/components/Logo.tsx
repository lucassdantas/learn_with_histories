// Brand symbol (design/brand/logo.svg) inlined so it costs no extra request. Colors are fixed in both themes.
export function LogoMark({ size = 40 }: Readonly<{ size?: number }>) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" className="block flex-none">
      <circle cx="32" cy="32" r="32" fill="#1D3D5A" />
      <circle cx="32" cy="32" r="29.5" fill="none" stroke="#C8924A" strokeWidth="1.4" />
      <path d="M12 44.5C19.5 42.2 26.5 42.8 32 46.5C37.5 42.8 44.5 42.2 52 44.5V47C44.5 44.9 37.5 45.5 32 49C26.5 45.5 19.5 44.9 12 47Z" fill="#C8924A" />
      <path d="M13 25C19.5 22 26 22.5 31 26V45C26 41.8 19.5 41.5 13 43.5Z" fill="#F4EBDD" />
      <path d="M51 25C44.5 22 38 22.5 33 26V45C38 41.8 44.5 41.5 51 43.5Z" fill="#F4EBDD" />
      <g fill="none" stroke="#1D3D5A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M17 30Q22 28.6 27 30.3" />
        <path d="M17 34Q22 32.6 27 34.3" />
        <path d="M17 38Q21 36.8 25 38.1" />
        <path d="M40 36Q44 34.9 47 35.6" />
        <path d="M37 40Q42 38.6 47 39.6" />
      </g>
      <path d="M37 37C34.5 33 34 28.5 36 25" fill="none" stroke="#C8924A" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.2 2.2" />
      <polygon points="33,22 53,10.5 41,25.5" fill="#E0A65A" />
      <polygon points="41,25.5 53,10.5 43.5,32" fill="#B37A35" />
    </svg>
  );
}

export function Wordmark({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <span className={`font-story font-semibold whitespace-nowrap tracking-[-0.005em] ${className}`}>
      Learn<em className="font-[family-name:var(--font-literata-italic)] italic font-normal text-accent-ink">With</em>Histories
    </span>
  );
}
