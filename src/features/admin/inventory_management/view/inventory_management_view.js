import React, { useState, useEffect } from "react";
import { Table, Button, Card, message } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import EditProductModal from "./components/EditProductModal";
import ProductService from "services/ProductService";
import { Title } from "chart.js";

const InventoryManagementView = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedFields, setEditedFields] = useState({
    productId: "",
    quantityInStock: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getAll();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Delete product by id
  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
      message.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Error deleting product");
    }
  };

  // Handle input change in the modal
  const handleFieldChange = (field, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  // Save edited product fields
  const handleSaveEdit = async () => {
    const { productId, quantityInStock } = editedFields;
    console.log("editedFields", editedFields);
    try {
      await ProductService.updateStock(productId, quantityInStock);
      setProducts(
        products.map((product) =>
          product.productId === editingProduct.productId
            ? { ...product, ...editedFields }
            : product
        )
      );
      setIsEditModalVisible(false);
      setEditingProduct(null);
      message.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Error updating product");
    }
  };

  const columns = [
    {
      itle: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
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
      dataIndex: "quantityInStock",
      key: "quantityInStock",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Number of Wishlists",
      dataIndex: "numOfWishlists",
      key: "numOfWishlists",
    },
    {
      title: "Distributor",
      dataIndex: "distributorInformation",
      key: "distributorInformation",
    },
    {
      title: "Warranty Status",
      dataIndex: "warrantyStatus",
      key: "warrantyStatus",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button.Group style={{ display: "flex", gap: "5px" }}>
          <Button
            type="primary"
            style={{ width: "100px" }}
            onClick={() => {
              setIsEditModalVisible(true);
              setEditingProduct(record);
              setEditedFields(record);
            }}
          >
            Change Stock
          </Button>
          <Button
            type="primary"
            danger
            style={{ width: "100px" }}
            onClick={() => handleDelete(record.productId)}
          >
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
        <Table dataSource={products} columns={columns} rowKey="productId" />
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
