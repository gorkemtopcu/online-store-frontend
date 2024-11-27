import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "services/ProductService";
import useCartStore from "context/CartStore";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import { CustomerRoutePaths } from "constants/route_paths";

const ProductDetailsView = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Define an asynchronous function to fetch the product
    const fetchProduct = async () => {
      try {
        const productData = await ProductService.getById(id); // Wait for the product data to be fetched
        setProduct(productData.data); // Set the product state with the resolved data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct(); // Call the async function
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    notification.success({
      key: "added-to-cart",
      message: "Added to Cart",
      description: `${product.name} has been successfully added to your cart.`,
      placement: "topRight",
      duration: 2,
      onClick: () => {
        navigate(CustomerRoutePaths.CART);
        notification.destroy("added-to-cart");
      },
    });
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details" style={{ padding: "20px" }}>
      <Card style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Row gutter={[16, 16]}>
          {/* Left column for image */}
          <Col xs={24} md={10}>
            <ProductImage imageURL={product.imageURL[0]} name={product.name} />
          </Col>

          {/* Right column for product details */}
          <Col xs={24} md={14}>
            <ProductInfo
              name={product.name}
              brand={product.brand}
              description={product.description}
              warrantyStatus={product.warrantyStatus}
              quantityInStock={product.quantityInStock}
              price={product.price}
            />
            <div className="flex space-x-4 mt-4">
              <Button type="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button type="default">Add to Wishlist</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetailsView;
