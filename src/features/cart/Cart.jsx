import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";

import { getCart } from "./cartSlice";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);

  if (cart.length < 1) return <EmptyCart />;

  return (
    <div className="space-y-5 py-4 sm:space-y-6 sm:py-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <section className="surface-panel p-5 sm:p-8">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Your cart{username ? `, ${username}` : ""}
        </h2>

        <ul className="mt-6 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>

          <Button type="secondary" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Cart;
