import { useDispatch } from "react-redux";
import { removeFromCart } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(removeFromCart(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
