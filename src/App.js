import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/MainLayout';
import NotFoundPage from './pages/not_found_page';
import ProductList from './product/ProductList';
import { productMockService } from './services/product_mock_service';
import InventoryManagementPage from './pages/inventory_management_page';
import CreateProductForm from './pages/create_product_page';
import UserLayout from 'pages/user_layout';



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
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="product/create" element={<CreateProductForm />} />
        <Route path="product/edit" element={<InventoryManagementPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      
      {/* User routes */}
      <Route path="/" element={<UserLayout />}>
        <Route path="/collection" element={<ProductList products={products} />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
