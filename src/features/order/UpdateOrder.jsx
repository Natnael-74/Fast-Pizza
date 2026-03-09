import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  const Form = fetcher.Form;

  return (
    <Form method="PATCH" className="text-right">
      <Button type="primary">Make Order Priority</Button>
    </Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  const orderId = params.orderId;
  const order = { priority: true };
  await updateOrder(orderId, order);
  return null;
}
