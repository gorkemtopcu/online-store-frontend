import React, { useState, useEffect } from "react";
import { productMockService } from "../../../../services/product_mock_service";
import { Table, Button, Card, message } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import EditProductModal from "./components/EditProductModal";

const InventoryManagementView = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedFields, setEditedFields] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const mockProducts = await productMockService.generateProducts(10);
      setProducts(mockProducts);
    };

    fetchProducts();
  }, []);
  // todo: discuss moving handlers into another layer
  // Delete product by ID
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success("Product deleted successfully");
  };

  // Open edit modal and set product to be edited
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedFields({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setIsEditModalVisible(true);
  };

  // Handle input change in the modal
  const handleFieldChange = (field, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  // Save edited product fields
  const handleSaveEdit = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...editedFields }
          : product
      )
    );
    setIsEditModalVisible(false);
    setEditingProduct(null);
    message.success("Product updated successfully");
  };
  // todo: dummy columns to be replaced with actual columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Product Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
        <Table dataSource={products} columns={columns} rowKey="id" />
      </Card>

      <EditProductModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSave={handleSaveEdit}
        editedFields={editedFields}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
};

export default InventoryManagementView;
