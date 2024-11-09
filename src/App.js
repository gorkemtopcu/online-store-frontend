import React, { useState } from 'react';
import './App.css';
import categories from './data/categories';
import db from './services/firebaseConfig';

function App() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory((prevCategory) => 
      prevCategory === categoryName ? null : categoryName
    );
  };

  return (
    <div className="container">
      <header className="navbar">
        
        <nav>
          {categories.map((category) => (
            <span 
              key={category.name} 
              className="nav-link"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </span>
          ))}
        </nav>
        <div className="right-section">
          <button className="search-button">SEARCH</button>
          <span>LOG IN</span>
          <span>HELP</span>
          <span>SHOPPING BAG (0)</span>
        </div>
      </header>

      <div className="sidebar">
        <h3>Categories</h3>
        {categories.map((category) => (
          <div key={category.name}>
            <div 
              className="category" 
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </div>
            {activeCategory === category.name && (
              <ul className="subcategory-list">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>{subcategory}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default App;
