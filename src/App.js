import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin_layout";
import CreateProductForm from "./pages/admin/create_product_page";
import { productMockService } from "./services/product_mock_service";
import InventoryManagementPage from "./pages/admin/inventory_management_page";
import ProductList from "./product/ProductList";
import UserLayout from "layouts/user_layout";
import { AdminRoutePaths, CustomerRoutePaths } from "constants/route_paths";
import NotFoundPage from "pages/common/not_found_page";
import Home from "pages/customer/home";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Generate and set products to state
    const generatedProducts = productMockService.generateProducts(10);
    setProducts(generatedProducts);

    // Print products to the console
    console.log("Generated Products:", generatedProducts);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path={AdminRoutePaths.ADMIN} element={<AdminLayout />}>
          <Route
            path={AdminRoutePaths.CREATE_PRODUCT}
            element={<CreateProductForm />}
          />
          <Route
            path={AdminRoutePaths.EDIT_PRODUCT}
            element={<InventoryManagementPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* User routes */}
        <Route path={CustomerRoutePaths.HOME} element={<UserLayout />}>
          <Route path={CustomerRoutePaths.HOME} element={<Home />} />
          <Route
            path={CustomerRoutePaths.COLLECTION}
            element={<ProductList products={products} />}
          />
          <Route path={CustomerRoutePaths.ABOUT} element={<h1>About</h1>} />
          <Route path={CustomerRoutePaths.CONTACT} element={<h1>Contact</h1>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
