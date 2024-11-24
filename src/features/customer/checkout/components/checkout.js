import React, { useState } from "react";
import { Card, Typography, Row, Col } from 'antd';
import useCartStore from 'context/CartStore';

const { Text, Title } = Typography;

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const cart = useCartStore((state) => state.cart);
  const products = Object.values(cart);

   // Calculate the total price
   const totalPrice = products.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

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