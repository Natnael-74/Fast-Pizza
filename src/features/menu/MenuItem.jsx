import { useDispatch, useSelector } from "react-redux";
import { getCurrentQuantityById } from "../cart/cartSlice";
import { addToCart } from "../cart/cartSlice";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentPizzaQuantity = useSelector((state) =>
    getCurrentQuantityById(state, id),
  );
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
      quantity: 1,
    };
    dispatch(addToCart(newItem));
  }

  return (
    <li className="group flex gap-4 p-4 transition-colors duration-300 hover:bg-[var(--color-surface-soft)]/55 sm:gap-6 sm:p-5">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
        <img
          src={imageUrl}
          alt={name}
          className={`h-24 w-24 object-cover transition-transform duration-500 sm:h-28 sm:w-28 ${
            soldOut ? "opacity-60 grayscale" : "group-hover:scale-105"
          }`}
        />
      </div>
      <div className="flex grow flex-col pt-0.5">
        <p className="text-base font-semibold text-[var(--color-text-strong)] sm:text-lg">
          {name}
        </p>
        <p className="mt-1 text-sm capitalize italic">{ingredients.join(", ")}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {!soldOut ? (
            <p className="text-sm font-semibold tracking-wide text-[var(--color-accent-deep)] uppercase">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase">
              Sold out
            </p>
          )}

          {currentPizzaQuantity > 0 ? (
            <div className="flex items-center gap-3 sm:gap-5">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentPizzaQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          ) : null}

          {soldOut || currentPizzaQuantity > 0 ? null : (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
