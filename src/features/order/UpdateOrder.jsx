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

export async function action({ request }) {
  const formData = await request.formData();
  const orderId = formData.get("orderId");
  const order = { orderId, priority: true };
  await updateOrder(order);
  return null;
}
