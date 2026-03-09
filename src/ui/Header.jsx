import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[rgba(255,253,249,0.85)] backdrop-blur-md">
      <div className="page-shell flex flex-wrap items-center gap-4 py-4 sm:py-5">
        <Link
          to="/"
          className="text-xs font-semibold tracking-[0.34em] text-[var(--color-text-strong)] uppercase transition-colors duration-300 hover:text-[var(--color-accent-deep)] sm:text-sm"
        >
          Fast Pizza Co.
        </Link>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <SearchOrder />
          <Username />
        </div>
      </div>
    </header>
  );
}

export default Header;
