import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import FilterMenu from "features/customer/collection/view/components/FilterMenu";
import ProductSearchFilter from "features/customer/collection/view/components/ProductSearchFilter";
import CollectionProducts from "features/customer/collection/view/components/collection_products";
import ProductService from "services/ProductService";
import "./collection_view.css";

const CollectionView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll();
        if (response && response.data) {
          setCollectionProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryFilter = ({ mainCategory, subCategory }) => {
    const filtered = collectionProducts.filter((product) => {
      const matchesMainCategory = mainCategory
        ? product.category === mainCategory
        : true;
      const matchesSubCategory = subCategory
        ? product.subcategory === subCategory
        : true;
      return matchesMainCategory && matchesSubCategory;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="collection-view-container">
      <Button type="primary" onClick={toggleDrawer}>
        Filters
      </Button>

      <Drawer
        title="Filters"
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        width={300}
      >
        <FilterMenu onCategoryFilter={handleCategoryFilter} />
      </Drawer>

      <div className="products-container">
        <ProductSearchFilter
          onSearch={undefined}
          onSort={undefined}
          onCategoryFilter={undefined}
        />
        <CollectionProducts products={filteredProducts} />
      </div>
    </div>
  );
};

export default CollectionView;
