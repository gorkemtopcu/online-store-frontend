import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import ProductService from "services/ProductService";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details" style={{ padding: "20px" }}>
      <Card style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Row gutter={[16, 16]}>
          {/* Left column for image */}
          <Col xs={24} md={10}>
            <img
              alt={product.name}
              src={product.imageURL[0]} // Display the first image in the array
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Col>

          {/* Right column for product details */}
          <Col xs={24} md={14}>
            <h1 className="text-2xl font-bold text-center">{product.name}</h1>
            <p className="text-center">
              {product.brand}
              <br />
              <br />
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>

            <p>
              <strong>Warranty Status:</strong> {product.warrantyStatus} <br />
              <br />
            </p>
            <p>
              <strong>Stock:</strong> {product.quantityInStock} available
            </p>

            <p className="text-xl">
              <strong>${product.price}</strong>{" "}
            </p>

            <div className="flex space-x-4 mt-4">
              <Button type="primary">Add to Cart</Button>
              <Button type="default">Add to Wishlist</Button>
            </div>

            {/* TODO: Implement comment, rating, stock, size etc. */}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetails;
