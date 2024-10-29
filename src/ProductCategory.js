import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from './firebaseConfig';


const ProductCategory = ({ categoryName }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', categoryName));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div>
      <h2>{categoryName}</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price} TL</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategory;
