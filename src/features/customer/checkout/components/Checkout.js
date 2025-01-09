import React from "react";
import { Card, Typography, Row, Col } from "antd";
import useCartStore from "context/CartStore";

const { Text, Title } = Typography;

const Checkout = () => {
  const { getCartObjects, getTotalPrice } = useCartStore((state) => state); // Destructure the functions from the store
  const products = getCartObjects(); // Get the cart items as an array
  const totalPrice = getTotalPrice(); // Get the total price using the built-in function

  return (
    <div>
      {products.map((item) => {
        const discountedPrice =
          item.product.price * (1 - (item.product.discount || 0) / 100); // Apply discount to the price
        return (
          <Card key={item.product.productId} style={{ marginBottom: "20px" }}>
            <Row gutter={16}>
              <Col span={4}>
                <img
                  src={item.product.imageURL[0]}
                  alt={item.product.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    marginRight: 16,
                    objectFit: "contain",
                  }}
                />
              </Col>
              <Col span={16}>
                <Text strong>{item.product.name}</Text>
                <br />
                <Text>
                  Price: ${discountedPrice.toFixed(2)}{" "}
                  {item.product.discount > 0 && (
                    <Text
                      type="secondary"
                      style={{ textDecoration: "line-through", marginLeft: 8 }}
                    >
                      ${item.product.price.toFixed(2)}
                    </Text>
                  )}
                </Text>
                <br />
                <Text>Quantity: {item.quantity}</Text>
              </Col>
            </Row>
          </Card>
        );
      })}

      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={4}>Total Price: ${totalPrice.toFixed(2)}</Title>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
