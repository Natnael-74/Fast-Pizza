import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mt-6 px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-5 text-xl font-semibold text-stone-600">
        Your cart is still empty. Start adding some pizzas !!
      </p>
    </div>
  );
}

export default EmptyCart;
