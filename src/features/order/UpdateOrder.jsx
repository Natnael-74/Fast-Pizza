import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="mt-4 text-right">
      <Button type="primary">Make Order Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const orderId = params.orderId;
  const order = { priority: true };
  await updateOrder(orderId, order);
  return null;
}
