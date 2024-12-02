import React from "react";
import { Card, Typography, Rate, Row, Col, Progress } from "antd";

const { Text } = Typography;

const ReviewAnalysis = ({ reviews }) => {
  // Calculate review statistics
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  // Count reviews for each rating (1-5 stars)
  const ratingCounts = [1, 2, 3, 4, 5].reduce((counts, rating) => {
    counts[rating] = reviews.filter(
      (review) => review.rating === rating
    ).length;
    return counts;
  }, {});

  // Calculate percentages
  const ratingPercentages = [1, 2, 3, 4, 5].reduce((percentages, rating) => {
    percentages[rating] = totalReviews
      ? Math.round((ratingCounts[rating] / totalReviews) * 100)
      : 0;
    return percentages;
  }, {});

  return (
    <Card
      style={{
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {/* Header */}
      <Typography.Title level={3} style={{ marginBottom: "16px" }}>
        Review Overview
      </Typography.Title>

      {/* Average Rating */}
      <Row align="middle">
        <Col>
          <Rate disabled allowHalf value={averageRating} />
        </Col>
        <Col style={{ marginLeft: "12px" }}>
          <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
            {averageRating.toFixed(1)}/5
          </Text>
        </Col>
      </Row>

      {/* Total Reviews */}
      <Text style={{ fontSize: "14px", color: "#888" }}>
        {totalReviews.toLocaleString()} global reviews
      </Text>

      {/* Rating Distribution */}
      {[5, 4, 3, 2, 1].map((star) => (
        <Row
          key={star}
          align="middle"
          style={{ marginTop: "24px", marginBottom: "8px", fontSize: "14px" }}
        >
          <Col span={4}>
            <Text>{star} Star</Text>
          </Col>
          <Col span={16}>
            <Progress
              percent={ratingPercentages[star]}
              strokeColor="#ffa41c"
              showInfo={false}
            />
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            <Text>{ratingPercentages[star]}%</Text>
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default ReviewAnalysis;
