import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Table, message } from 'antd';
import ProductHeader from 'components/headers/ProductHeader';
import CategoryService from 'services/CategoryService';
import StringConstants from 'constants/StringConstants';

// Refactored EditCategoryView component
const EditCategoryView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories with useCallback for potential reuse
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (record) => {
    console.log("Edit record:", record);
    message.info(`Edit functionality for "${record.name}" is under development.`);
  };

  const handleDelete = async (id) => {
    try {
      await CategoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      message.success("Category deleted successfully.");
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category. Please try again.");
    }
  };

  // todo improve column system
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button.Group>
          <Button type="primary" onClick={() => handleEdit(record)}>
             {StringConstants.EDIT}
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
             {StringConstants.DELETE}
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <div>
      <ProductHeader title="Inventory Management" />
      <Card>
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default EditCategoryView;
