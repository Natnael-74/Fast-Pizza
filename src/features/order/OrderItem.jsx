import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[var(--color-text-strong)] sm:text-base">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="text-sm font-semibold text-[var(--color-accent-deep)] sm:text-base">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="mt-1 text-xs capitalize italic sm:text-sm">
        {isLoadingIngredients
          ? "Loading ingredients..."
          : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
