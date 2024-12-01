import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import StringConstants from "constants/StringConstants";
import CategoryService from "services/CategoryService";

const { Option } = Select;

const ProductCategoryInput = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Form.Item
            label={StringConstants.PRODUCT_CATEGORY}
            name="categoryId" 
            rules={[{ required: true, message: "Please select a category!" }]}
        >
            <Select
                placeholder="Select a category"
                allowClear
                showSearch
                filterOption={(input, option) =>
                    String(option?.children).toLowerCase().includes(input.toLowerCase())
                }
            >
                {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                        {category.name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default ProductCategoryInput;
