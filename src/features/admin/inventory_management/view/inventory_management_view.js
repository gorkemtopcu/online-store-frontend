import React, { useState, useEffect } from "react";
import { Table, Button, Card, message } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import EditProductModal from "./components/EditProductModal";
import ProductService from "services/ProductService";

const InventoryManagementView = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedFields, setEditedFields] = useState({
    productId: "",
    name: "",
    description: "",
    imageURL: [],
    price: "",
    quantityInStock: "",
    categoryId: "",
    numOfWishlists: 0,
    serialNumber: "",
    distributorInformation: "",
    warrantyStatus: "",
    author: "",
    publisher: "",
    isbn: "",
    language: "",
    numberOfPages: "",
    publicationDate: "",
    edition: "",
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
      setProducts(products.filter((product) => product.productId !== productId));
      message.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Error deleting product");
    }
  };

  // Open edit modal and set product to be edited
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedFields({
      ...product,
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
        product.productId === editingProduct.productId
          ? { ...product, ...editedFields }
          : product
      )
    );
    setIsEditModalVisible(false);
    setEditingProduct(null);
    message.success("Product updated successfully");
  };

  const columns = [
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
        <Button.Group>
          <Button
            type="primary"
            danger
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
