import React from "react";
import { Row, Col } from "antd";
import WishllistCard from "components/cards/WishlistCard";

const WishlistCardList = ({ products, onRemove }) => {
  return (
    <Row gutter={[12, 16]} justify="center">
      {products.map((item) => (
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          xxl={6}
          key={item.id || item.name}
        >
          <WishllistCard product={item} onRemove={onRemove} />
        </Col>
      ))}
    </Row>
  );
};

export default WishlistCardList;