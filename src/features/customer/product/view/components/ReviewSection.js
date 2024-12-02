import React from "react";
import { List } from "antd";
import ReviewAnalysis from "./ReviewAnalysis";
import ReviewCard from "./ReviewCard";

const ReviewSection = ({ reviews }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* Left: Review Analysis */}
      <div style={{ width: "30%", marginRight: "20px" }}>
        <ReviewAnalysis reviews={reviews} />
      </div>

      {/* Right: Reviews */}
      <div style={{ width: "70%" }}>
        <p style={{ fontWeight: "bold", fontSize: "32px" }}>Customer Reviews</p>
        <List
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <ReviewCard review={review} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ReviewSection;
