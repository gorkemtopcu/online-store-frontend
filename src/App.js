import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin_layout";
import UserLayout from "layouts/user_layout";
import { AdminRoutePaths, CustomerRoutePaths } from "constants/route_paths";
import React from "react";
import InventoryManagementView from "features/admin/inventory_management/view/inventory_management_view";
import CreateProductView from "features/admin/create_product/view/create_product_view";
import NotFoundView from "features/common/not_found/view/not_found_view";
import HomeView from "features/customer/home/view/home_view";
import CollectionView from "features/customer/collection/view/collection_view";
import WishlistView from "features/customer/wishlist/wishlist_view";
import ProductDetails from "product/ProductDetails";
import CheckoutView from "features/customer/checkout/checkout_view";


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path={AdminRoutePaths.ADMIN} element={<AdminLayout />}>
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

        {/* User routes */}
        <Route path={CustomerRoutePaths.HOME} element={<UserLayout />}>
          <Route path={CustomerRoutePaths.HOME} element={<HomeView />} />
          <Route
            path={CustomerRoutePaths.COLLECTION}
            element={<CollectionView />}
          />
          <Route path={CustomerRoutePaths.ABOUT} element={<h1>About</h1>} />
          <Route path={CustomerRoutePaths.CONTACT} element={<h1>Contact</h1>} />
          <Route path={CustomerRoutePaths.WISHLIST} element={<WishlistView />} />
          <Route path={CustomerRoutePaths.DETAILS} element={<ProductDetails />} />
          <Route path={CustomerRoutePaths.CHECKOUT} element={<CheckoutView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
