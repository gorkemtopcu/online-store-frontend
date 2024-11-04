import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import NotFoundPage from './pages/not_found_page';
import CreateProductForm from './pages/create_product_page';
import ProductList from './product/ProductList';
import { productMockService } from './services/product_mock_service';
import InventoryManagementPage from './pages/inventory_management_page';



>>>>>>> b6092c06ae4e5d30effeb9f402dee59827ec1aa9
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const generatedProducts = productMockService.generateProducts(10);
    setProducts(generatedProducts);
    console.log('Generated Products:', generatedProducts);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
          <Route path="product" element={<ProductList products={products} />} />
=======
>>>>>>> b6092c06ae4e5d30effeb9f402dee59827ec1aa9
          <Route path="product/create" element={<CreateProductForm />} />
          <Route path="product/edit" element={<InventoryManagementPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
