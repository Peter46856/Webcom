import { Code2, Route, Network, Cloud } from 'lucide-react';
export function ServiceIcon({ name, size = 23 }: { name: string; size?: number }) {
  const Icon = { code: Code2, route: Route, network: Network, cloud: Cloud }[name] || Code2;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M5 10 13 30 20 16 27 30 35 10M5 10h8m14 0h8"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="10" r="3" fill="currentColor" />
        <circle cx="20" cy="16" r="3" fill="currentColor" />
        <circle cx="35" cy="10" r="3" fill="currentColor" />
      </svg>
      {!compact && (
        <span>
          webcom<span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
