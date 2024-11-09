import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import NotFoundPage from './pages/not_found_page';
import CreateProductForm from './pages/create_product_page';
import { productMockService } from './services/product_mock_service';
import InventoryManagementPage from './pages/inventory_management_page';
import ProductList from './product/ProductList';



function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Generate and set products to state
    const generatedProducts = productMockService.generateProducts(10);
    setProducts(generatedProducts);
    
    // Print products to the console
    console.log('Generated Products:', generatedProducts);
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="product/create" element={<CreateProductForm />} />
          <Route path="product/edit" element={<InventoryManagementPage />} />
          <Route path="product" element={<ProductList products={products} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
