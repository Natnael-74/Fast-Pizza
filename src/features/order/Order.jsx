import OrderItem from "./OrderItem";

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-6 py-4 sm:space-y-8 sm:py-6">
      <section className="surface-panel space-y-6 p-5 sm:space-y-8 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold sm:text-4xl">Order #{id}</h2>

          <div className="flex flex-wrap gap-2">
            <span className="status-pill status-pill--success">{status}</span>
            {priority && (
              <span className="status-pill status-pill--priority">
                Priority
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-5 py-4 sm:px-6">
          <p className="text-sm font-semibold tracking-wide text-[var(--color-text-strong)] uppercase">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left`
              : "Order should have arrived"}
          </p>
          <p className="mt-1 text-xs sm:text-sm">
            Estimated delivery: {formatDate(estimatedDelivery)}
          </p>
        </div>

        <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.id}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={
                fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ||
                []
              }
            />
          ))}
        </ul>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-5 py-4 sm:px-6">
          <p className="text-sm font-medium">
            Pizza price: {formatCurrency(orderPrice)}
          </p>
          {priority && (
            <p className="mt-1 text-sm font-medium">
              Priority price: {formatCurrency(priorityPrice)}
            </p>
          )}
          <p className="mt-3 text-base font-semibold text-[var(--color-text-strong)]">
            Total due on delivery:{" "}
            {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
      </section>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
