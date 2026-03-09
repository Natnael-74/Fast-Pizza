import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-[var(--color-text-strong)] sm:text-base">
        {quantity}&times; {name}
      </p>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <p className="text-sm font-semibold text-[var(--color-accent-deep)] sm:text-base">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
