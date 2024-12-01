import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Categories from "constants/ProductCategories";
import { FilterOutlined } from "@ant-design/icons";

const FilterMenu = ({ onFilterChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleCheckboxChange = (category, isChecked) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: isChecked,
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
          {Categories.map((category, index) => (
            <div
              key={category}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                id={`category-${index}`}
                checked={!!selectedFilters[category]}
                onChange={(e) =>
                  handleCheckboxChange(category, e.target.checked)
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
                {category}
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
