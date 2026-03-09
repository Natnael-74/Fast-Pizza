import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-flex items-center justify-center rounded-full border text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] disabled:pointer-events-none disabled:opacity-50";

  const styles = {
    primary:
      base +
      " border-[var(--color-accent-deep)] bg-[linear-gradient(140deg,var(--color-accent),var(--color-accent-deep))] px-5 py-3 text-[var(--color-on-accent)] shadow-[0_14px_28px_-18px_rgba(120,78,40,0.9)] hover:-translate-y-0.5 hover:shadow-[0_20px_30px_-18px_rgba(120,78,40,0.85)] active:translate-y-0 md:px-7 md:py-3.5",
    small:
      base +
      " border-[var(--color-accent-deep)] bg-[linear-gradient(140deg,var(--color-accent),var(--color-accent-deep))] px-4 py-2 text-[11px] text-[var(--color-on-accent)] shadow-[0_12px_22px_-20px_rgba(120,78,40,0.85)] hover:-translate-y-0.5",
    round:
      base +
      " h-8 w-8 border-[var(--color-accent-deep)] bg-[linear-gradient(140deg,var(--color-accent),var(--color-accent-deep))] p-0 text-sm text-[var(--color-on-accent)] shadow-[0_12px_20px_-18px_rgba(120,78,40,0.85)] hover:-translate-y-0.5",
    secondary:
      base +
      " border-[var(--color-border)] bg-white/55 px-4 py-2.5 text-[var(--color-text-strong)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-soft)] md:px-6 md:py-3.5",
    quiet:
      base +
      " border-[var(--color-border)] bg-white/70 px-3 py-2 text-[11px] text-[var(--color-text-strong)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-soft)]",
  };
  const variant = styles[type] ?? styles.primary;

  if (to)
    return (
      <Link to={to} className={variant}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={variant}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={variant}>
      {children}
    </button>
  );
}

export default Button;
