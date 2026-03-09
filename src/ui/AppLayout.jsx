import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useLocation, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const isLoading = navigation.state === "loading";
  const isMenuPage = pathname === "/menu";

  return (
    <div className="flex h-dvh flex-col">
      {isLoading && <Loader />}

      <Header />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <main
          className={`page-shell py-6 sm:py-10 ${
            isMenuPage ? "pb-24 sm:pb-28" : "pb-8 sm:pb-10"
          }`}
        >
          <div className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>

      {isMenuPage && <CartOverview />}
    </div>
  );
}

export default AppLayout;
