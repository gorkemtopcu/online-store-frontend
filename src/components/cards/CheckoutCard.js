import React from 'react';
import { Card, Typography } from 'antd';

const CheckoutCard = ({ product }) => {
  const { name, price, imageURL } = product;

  const cardStyle = {
    maxWidth: '800px',
    margin: '20px auto',
    padding: 0,
    overflow: 'hidden',
  };

  const imgStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  };

  return (
    <Card hoverable style={cardStyle} size='small'>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Image Section */}
        <img
          alt={name}
          src={Array.isArray(imageURL) ? imageURL[0] : imageURL} // Handle array of images
          style={imgStyle}
        />

        {/* Text Section */}
        <div style={{ padding: 10, flex: 1 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {name}
          </Typography.Title>
          <Typography.Text style={{ fontSize: '18px', fontWeight: 'normal' }}>
            ${price.toFixed(2)}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default CheckoutCard;
