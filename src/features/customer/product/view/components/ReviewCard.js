import React from "react";
import { Card, Row, Col, Typography, Rate, Avatar } from "antd";
import DateFormat from "utils/DateFormat";

const { Text, Paragraph } = Typography;

const ReviewCard = ({ review }) => {
  return (
    <Card
      style={{
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Row align="middle" gutter={[16, 16]} style={{ marginBottom: "8px" }}>
        {/* Avatar */}
        <Col>
          <Avatar
            size="large"
            style={{
              backgroundColor: "#87d068",
              verticalAlign: "middle",
            }}
          >
            {review.uid.charAt(0).toUpperCase()}
          </Avatar>
        </Col>
        {/* UID */}
        <Col>
          <Text strong style={{ textTransform: "uppercase" }}>
            {review.name}
          </Text>
        </Col>
      </Row>

      {/* Rating */}
      <Rate disabled value={review.rating} />

      {/* Date */}
      <Text type="secondary" style={{ marginLeft: "8px" }}>
        {DateFormat.formatToShortDate(review.date)}
      </Text>

      {/* Comment */}
      <Paragraph style={{ marginTop: "12px" }}>{review.comment}</Paragraph>
    </Card>
  );
};

export default ReviewCard;
