import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import NotFoundPage from './pages/not_found_page';
<<<<<<< HEAD
import ProductList from './product/ProductList';
import { productMockService } from './services/product_mock_service';

=======
import { productMockService } from './services/product_mock_service';



>>>>>>> b6092c06ae4e5d30effeb9f402dee59827ec1aa9
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    const generatedProducts = productMockService.generateProducts(10);
    setProducts(generatedProducts);
    console.log('Generated Products:', generatedProducts);
  }, []);

=======
    // Generate and set products to state
    const generatedProducts = productMockService.generateProducts(10);
    setProducts(generatedProducts);
    
    // Print products to the console
    console.log('Generated Products:', generatedProducts);
  }, []);


>>>>>>> b6092c06ae4e5d30effeb9f402dee59827ec1aa9
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
          <Route path="product" element={<ProductList products={products} />} />
=======
>>>>>>> b6092c06ae4e5d30effeb9f402dee59827ec1aa9
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
