
import { Button, Card, Table } from 'antd';
import ProductHeader from 'components/headers/ProductHeader';
import React, { useEffect, useState } from 'react';
import CategoryService from 'services/CategoryService';

// Get categories from category service
// Display categories in a table, with delete and edit buttons

const EditCategoryView = () => {

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

    
    const handleEdit = (record) => {
        // Implement edit functionality here
        console.log("Edit record:", record);
    };

    const handleDelete = (id) => {
        // Implement delete functionality here
        try {
            CategoryService.deleteCategory(id);
            setCategories(categories.filter((category) => category.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
        
    };

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
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Button.Group>
                <Button type="primary" onClick={() => handleEdit(record)}>
                  Edit
                </Button>
                <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </Button.Group>
            ),
          },
    ];

    return (
        <div>
            <ProductHeader title="Inventory Management" />
            <Card>
                <Table dataSource={categories} columns={columns} rowKey="id" />
            </Card>
        </div>
    );
};

export default EditCategoryView;