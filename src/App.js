import ProtectedRoute from "components/routes/ProtectedRoute";
import { AdminRoutePaths, CustomerRoutePaths } from "constants/route_paths";
import InventoryManagementView from "features/admin/inventory_management/view/inventory_management_view";
import NotFoundView from "features/common/not_found/view/not_found_view";
import CollectionView from "features/customer/collection/view/collection_view";
import CreateProductView from "features/admin/create_product/view/create_product_view";
import HomeView from "features/customer/home/view/home_view";
import AdminLayout from "layouts/admin_layout";
import UserLayout from "layouts/user_layout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WishlistView from "features/customer/wishlist/wishlist_view";
import ProductDetailsView from "features/customer/product/view/ProductDetailsView";
import CartView from "features/customer/cart/view/CartView";
import useUserStore from "context/UserStore";
import UserRoles from "constants/UserRoles";
import PaymentView from "features/customer/checkout/CheckoutView";

function App() {
  const { currentUser } = useUserStore();
  const userRole = currentUser?.role;

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route
          path={AdminRoutePaths.ADMIN}
          element={
            <ProtectedRoute
              element={<AdminLayout />}
              isAllowed={userRole === UserRoles.ADMIN}
              redirectTo={CustomerRoutePaths.HOME}
            />
          }
        >
          <Route
            path={AdminRoutePaths.CREATE_PRODUCT}
            element={<CreateProductView />}
          />
          <Route
            path={AdminRoutePaths.EDIT_PRODUCT}
            element={<InventoryManagementView />}
          />
          <Route path="*" element={<NotFoundView />} />
        </Route>

        {/* Customer routes */}
        <Route
          path={CustomerRoutePaths.HOME}
          element={
            <ProtectedRoute
              element={<UserLayout />}
              isAllowed={userRole === UserRoles.CUSTOMER || userRole == null}
              redirectTo={AdminRoutePaths.ADMIN}
            />
          }
        >
          <Route path={CustomerRoutePaths.HOME} element={<HomeView />} />
          <Route
            path={CustomerRoutePaths.COLLECTION}
            element={<CollectionView />}
          />
          <Route path={CustomerRoutePaths.ABOUT} element={<h1>About</h1>} />
          <Route path={CustomerRoutePaths.CONTACT} element={<h1>Contact</h1>} />
          <Route
            path={CustomerRoutePaths.WISHLIST}
            element={<WishlistView />}
          />
          <Route
            path={CustomerRoutePaths.DETAILS}
            element={<ProductDetailsView />}
          />
          <Route path={CustomerRoutePaths.CART} element={<CartView />} />
          <Route
            path={CustomerRoutePaths.PAYMENT}
            element={
              <ProtectedRoute
                element={<PaymentView />}
                isAllowed={userRole === UserRoles.CUSTOMER}
                redirectTo={CustomerRoutePaths.HOME}
              />
            }
          />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
