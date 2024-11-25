import React, { useState } from "react";
import { Card, Typography, Row, Col } from 'antd';
import useCartStore from 'context/CartStore';

const { Text, Title } = Typography;

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const { getCartObjects, getTotalPrice } = useCartStore((state) => state); // Destructure the functions from the store
  const products = getCartObjects(); // Get the cart items as an array
  const totalPrice = getTotalPrice(); // Get the total price using the built-in function

  return (
    <div>
      {products.map((item) => (
        <Card key={item.product.productId} style={{ marginBottom: '20px' }}>
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
              onLoad={() => setLoading(false)}
            />
            </Col>
            <Col span={16}>
              <Text strong>{item.product.name}</Text>
              <br />
              <Text>Price: ${item.product.price}</Text>
              <br />
              <Text>Quantity: {item.quantity}</Text>
            </Col>
          </Row>
        </Card>
      ))}

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Title level={4}>Total Price: ${totalPrice.toFixed(2)}</Title>
          </Col>
        </Row>

    </div>
  );
};

export default Checkout;
