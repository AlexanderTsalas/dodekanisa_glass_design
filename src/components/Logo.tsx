export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img
      src="/DG_logo_icon.svg"
      alt="Diamond Glass Logo"
      className={className}
    />
  );
}
