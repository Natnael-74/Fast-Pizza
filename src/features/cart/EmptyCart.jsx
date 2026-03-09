import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="space-y-5 py-6 sm:py-8">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className="surface-panel p-6 sm:p-8">
        <p className="text-2xl font-semibold sm:text-3xl">
          Your cart is still empty.
        </p>
        <p className="mt-3 text-sm sm:text-base">
          Start adding your favorite pizzas and build an order.
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
