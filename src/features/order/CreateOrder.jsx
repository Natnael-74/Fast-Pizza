import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { clearCart } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "./../user/userSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="py-4 sm:py-6">
      <section className="surface-panel px-5 py-7 sm:px-8 sm:py-9">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to order?
        </h2>
        <p className="mt-2 text-sm sm:text-base">
          Complete the details below and we will prepare everything right away.
        </p>

        <Form method="POST" className="mt-8 space-y-6">
          <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-4">
            <label className="pt-3 text-xs font-semibold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              First name
            </label>
            <input
              className="input"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-4">
            <label className="pt-3 text-xs font-semibold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              Phone number
            </label>
            <div>
              <input className="input" type="tel" name="phone" required />
              {formErrors?.phone && (
                <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-4">
            <label className="pt-3 text-xs font-semibold tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              Address
            </label>
            <div>
              <input
                className="input"
                type="text"
                name="address"
                required
                disabled={isLoadingAddress}
                defaultValue={address}
              />
              {addressStatus === "error" && (
                <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>
            {!position.latitude && !position.longitude && (
              <div className="sm:pt-1">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={() => dispatch(fetchAddress())}
                >
                  {isLoadingAddress ? "Loading..." : "Get location"}
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-4 sm:px-5">
            <input
              className="mt-0.5 h-5 w-5 accent-[var(--color-accent)] focus-visible:outline-none"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="text-sm font-medium text-[var(--color-text-strong)] sm:text-base">
              Give my order priority (+20%) for faster delivery.
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <p className="text-sm sm:text-base">
              Total due on delivery:{" "}
              <span className="font-semibold text-[var(--color-text-strong)]">
                {formatCurrency(totalPrice)}
              </span>
            </p>
            <Button disabled={isSubmitting} type="primary">
              {isSubmitting && !isLoadingAddress
                ? "Placing order..."
                : "Place order"}
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  //  If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart()); //DO NOT OVERUSE THIS. ONLY IN CASES LIKE THIS, WHERE WE NEED TO UPDATE THE STATE OUTSIDE OF A COMPONENT. OTHERWISE, ALWAYS USE DISPATCH HOOK INSIDE COMPONENTS.
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
