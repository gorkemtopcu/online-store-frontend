import ProtectedRoute from "components/routes/ProtectedRoute";
import { AdminRoutePaths, CustomerRoutePaths } from "constants/route_paths";
import InventoryManagementView from "features/admin/inventory_management/view/inventory_management_view";
import NotFoundView from "features/common/not_found/view/not_found_view";
import CollectionView from "features/customer/collection/view/CollectionView";
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
import OrderView from "features/customer/orders/OrderView";
import CreateCategoryView from "features/admin/create_category/view/CreateCategoryView";
import EditCategoryView from "features/admin/edit_category/view/EditCategoryView";
import OrderManagementView from "features/admin/order_management/view/OrderManagementView";
import InvoiceDisplay from "features/customer/checkout/components/InvoiceDisplay";
import About from "features/customer/about/About";
import Contact from "features/customer/contact/contact";
import Dashboard from "features/admin/dashboard/Dashboard";
import CommentManagementView from "features/admin/comment_management/CommentManagementView";
import DisplayCommentView from "features/admin/display_comment/DisplayCommentView";

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
          <Route path={AdminRoutePaths.DASHBOARD} element={<Dashboard />} />
          <Route
            path={AdminRoutePaths.CREATE_PRODUCT}
            element={<CreateProductView />}
          />

          <Route
            path={AdminRoutePaths.EDIT_PRODUCT}
            element={<InventoryManagementView />}
          />
          <Route
            path={AdminRoutePaths.CREATE_CATEGORY}
            element={<CreateCategoryView />}
          />
          <Route
            path={AdminRoutePaths.EDIT_CATEGORY}
            element={<EditCategoryView />}
          />
          <Route
            path={AdminRoutePaths.MANAGE_ORDER}
            element={<OrderManagementView />}
          />
          <Route
            path={AdminRoutePaths.MANAGE_COMMENT}
            element={<CommentManagementView />}
          />
          <Route
            path={AdminRoutePaths.ALL_COMMENTS}
            element={<DisplayCommentView />}
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
          <Route
            path={CustomerRoutePaths.ORDERS}
            element={
              <ProtectedRoute
                element={<OrderView />}
                isAllowed={userRole === UserRoles.CUSTOMER}
                redirectTo={CustomerRoutePaths.HOME}
              />
            }
          />
          <Route path={CustomerRoutePaths.ABOUT} element={<About />} />
          <Route path={CustomerRoutePaths.CONTACT} element={<Contact />} />
          <Route
            path={CustomerRoutePaths.WISHLIST}
            element={
              <ProtectedRoute
                element={<WishlistView />}
                isAllowed={userRole === UserRoles.CUSTOMER}
                redirectTo={CustomerRoutePaths.HOME}
              />
            }
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
          <Route
            path={CustomerRoutePaths.INVOICE}
            element={
              <ProtectedRoute
                element={<InvoiceDisplay />}
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
