import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import Categories from "constants/ProductCategories";
import { FilterOutlined } from "@ant-design/icons";
import CategoryService from "services/CategoryService";

const FilterMenu = ({ onFilterChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        const backendCategories = response.data;

        // Map frontend categories with backend categories
        const mappedCategories = Categories.map((frontendCategory) => {
          const matchedCategory =
            backendCategories.find(
              (backendCategory) =>
                backendCategory.id === frontendCategory || 
                backendCategory.name === frontendCategory
            ) || { id: frontendCategory, name: frontendCategory }; // Fallback to frontend category if no match
          return matchedCategory;
        });

        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleCheckboxChange = (categoryId, isChecked) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [categoryId]: isChecked,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
    toggleDrawer();
  };

  return (
    <>
      <Button
        icon={<FilterOutlined />}
        type="text"
        onClick={toggleDrawer}
        style={{ width: "48px" }}
      />
      <Drawer
        title="Filters"
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        width={300}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {categories.map((category, index) => (
            <div
              key={category.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                id={`category-${index}`}
                checked={!!selectedFilters[category.id]}
                onChange={(e) =>
                  handleCheckboxChange(category.id, e.target.checked)
                }
              />
              <label
                htmlFor={`category-${index}`}
                style={{
                  fontSize: "14px",
                  margin: 0,
                  cursor: "pointer",
                }}
              >
                {category.name}
              </label>
            </div>
          ))}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button onClick={clearFilters} style={{ flex: 1 }}>
              Clear Filters
            </Button>
            <Button
              type="primary"
              style={{ flex: 1 }}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterMenu;
