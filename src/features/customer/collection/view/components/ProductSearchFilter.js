import React, { useState } from "react";
import { Input, Button, Select, Row, Col } from "antd";
import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
import FilterMenu from "./FilterMenu";

const { Option } = Select;

const ProductSearchFilter = ({ sortOption, onSearch, onSort, setFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ padding: "10px 0" }}>
      <Row gutter={16} align="middle">
        {/* Search Input */}
        <Col flex="auto">
          <Input
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suffix={
              <Button
                type="link"
                icon={<SearchOutlined />}
                onClick={() => onSearch(searchTerm)}
              />
            }
          />
        </Col>

        {/* Filter Button */}
        <Col>
          <FilterMenu onFilterChange={setFilters} />
        </Col>

        {/* Sort Dropdown */}
        <Col>
          <Select
            value={sortOption || undefined}
            onChange={onSort}
            placeholder="Sort by"
            suffixIcon={<SortAscendingOutlined />}
            style={{ minWidth: 120 }}
            allowClear
          >
            <Option value="price">Price</Option>
            <Option value="popularity">Popularity</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default ProductSearchFilter;
