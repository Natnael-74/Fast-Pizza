import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalPrice, getCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPizzas = useSelector(getCartQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (totalPizzas === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[rgba(255,253,249,0.95)] shadow-[0_-10px_30px_-24px_rgba(53,38,27,0.8)] backdrop-blur-md">
      <div className="page-shell flex items-center justify-between pb-[calc(0.85rem+env(safe-area-inset-bottom))] pt-3 sm:pt-4">
        <p className="space-x-4 text-xs font-semibold tracking-[0.12em] text-[var(--color-text-strong)] uppercase sm:space-x-6 sm:text-sm">
          <span>{totalPizzas} pizzas</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <Link
          to="/cart"
          className="text-link text-xs sm:text-sm"
        >
          Open cart &rarr;
        </Link>
      </div>
    </div>
  );
}

export default CartOverview;
