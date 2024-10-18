import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import NotFoundPage from './pages/not_found_page';
import ProductList from './product/ProductList';
import { productMockService } from './services/product_mock_service';

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
          <Route path="product" element={<ProductList products={products} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
