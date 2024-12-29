import React, { useEffect, useState } from "react";
import { Button, Card, Table, message, Tag, InputNumber, Modal } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import ProductService from "services/ProductService";
import ConfirmPriceChangeModal from "./components/ConfirmPriceChangeModal";

const ManagePriceView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterZeroPrices, setFilterZeroPrices] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getAll();
        setProducts(response.data);
      } catch (error) {
        message.error("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleEditPrice = (product, value) => {
    setEditingProduct(product);
    setNewPrice(value);
  };

  const confirmPriceChange = async () => {
    setLoading(true);
    try {
      await ProductService.updatePrice(editingProduct.productId, newPrice || 0);
      message.success("Price updated successfully");

      // Update the product list
      const updatedProducts = products.map((product) =>
        product.productId === editingProduct.productId ? { ...product, price: newPrice } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      message.error("Failed to update price");
    }
    setEditingProduct(null);
    setNewPrice(null);
    setLoading(false);
  };

  const cancelPriceChange = () => {
    setEditingProduct(null);
    setNewPrice(null);
  };

  const toggleFilter = () => {
    setFilterZeroPrices(!filterZeroPrices);
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Distributor Information",
      dataIndex: "distributorInformation",
      key: "distributorInformation",
    },
    {
      title: "Stock Quantity",
      dataIndex: "quantityInStock",
      key: "quantityInStock",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Warranty Status",
      dataIndex: "warrantyStatus",
      key: "warrantyStatus",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <InputNumber
          defaultValue={record.price}
          onPressEnter={() => handleEditPrice(record, newPrice)}
          onChange={(value) => setNewPrice(value)}
        />
      ),
    },
    {
      title: "Production Cost",
      dataIndex: "productionCost",
      key: "productionCost",
    },
  ];

  const filteredProducts = filterZeroPrices
    ? products.filter((product) => product.price === 0 || product.productionCost === 0)
    : products;

  return (
    <div>
      <ProductHeader title="Manage Price" />
      <Card>
        <div style={{ marginBottom: "16px" }}>
          <Button onClick={toggleFilter}>
            {filterZeroPrices ? "Show All Products" : "Show Products with Zero Values"}
          </Button>
        </div>
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey="productId"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <ConfirmPriceChangeModal
        visible={!!editingProduct}
        productName={editingProduct?.name}
        newPrice={newPrice}
        onConfirm={confirmPriceChange}
        onCancel={cancelPriceChange}
      />
    </div>
  );
};

export default ManagePriceView;
