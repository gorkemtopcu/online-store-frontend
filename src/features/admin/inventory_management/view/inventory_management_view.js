import React, { useState, useEffect } from "react";
import { Table, Button, Card, message } from "antd";
import EditProductModal from "./components/EditProductModal";
import ProductService from "services/ProductService";
import SearchInput from "components/input/SearchInput";

const InventoryManagementView = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedFields, setEditedFields] = useState({
    productId: "",
    quantityInStock: "",
  });
  const [searchValue, setSearchValue] = useState(""); // Store the search value

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    };
    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); // Ensure searchValue is a string
  };

  // Filter products based on the search term
  const handleSearch = (value) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Delete product by id
  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
      setFilteredProducts(
        filteredProducts.filter((product) => product.productId !== productId)
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
      setFilteredProducts(
        filteredProducts.map((product) =>
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
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      width: 150, // Set width for the column
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 200, // Set width for the column
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300, // Set width for the column
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150, // Set width for the column
    },
    {
      title: "Stock",
      dataIndex: "quantityInStock",
      key: "quantityInStock",
      width: 150, // Set width for the column
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      width: 150, // Set width for the column
    },
    {
      title: "Number of Wishlists",
      dataIndex: "numOfWishlists",
      key: "numOfWishlists",
      width: 200, // Set width for the column
    },
    {
      title: "Distributor",
      dataIndex: "distributorInformation",
      key: "distributorInformation",
      width: 200, // Set width for the column
    },
    {
      title: "Warranty Status",
      dataIndex: "warrantyStatus",
      key: "warrantyStatus",
      width: 200, // Set width for the column
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 200, // Set width for the column
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
      width: 200, // Set width for the column
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
      {/* Remove the ProductHeader */}

      {/* Add Search Input component */}
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        placeholder="Search products..." // Optional placeholder
      />

      {/* Add some spacing between the search bar and table */}
      <div style={{ marginBottom: "20px" }}></div>

      <Card style={{ overflowX: "auto" }}>
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey="productId"
          scroll={{ x: "max-content" }} // Add horizontal scrolling
        />
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
