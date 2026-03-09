import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <section className="space-y-6 py-4 sm:space-y-8 sm:py-6">
      <div className="surface-panel p-5 sm:p-7">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent-deep)] uppercase">
          Our Selection
        </p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Stone-baked favorites
        </h2>
        <p className="mt-3 text-sm sm:text-base">
          Each recipe is prepared to order with premium ingredients and a crisp
          artisan finish.
        </p>
      </div>
      <ul className="surface-panel divide-y divide-[var(--color-border)] overflow-hidden">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </section>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
