import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.1em] text-[var(--color-text-strong)] uppercase md:block">
      {username}
    </div>
  );
}

export default Username;
