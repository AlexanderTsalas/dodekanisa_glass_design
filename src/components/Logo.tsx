export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="currentColor" strokeWidth="3" fill="transparent" />
      <path d="M20 10L30 20L20 30L10 20L20 10Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}
