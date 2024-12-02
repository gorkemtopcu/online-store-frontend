import React from "react";
import { List } from "antd";
import ReviewAnalysis from "./ReviewAnalysis";
import ReviewCard from "./ReviewCard";

const ReviewSection = ({ approvedReviews, allReviews }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* Left: Review Analysis */}
      <div style={{ width: "30%", marginRight: "20px" }}>
        <ReviewAnalysis reviews={allReviews} />
      </div>

      {/* Right: Reviews */}
      <div style={{ width: "70%" }}>
        <p style={{ fontWeight: "bold", fontSize: "32px" }}>
          Customer Comments
        </p>
        <List
          dataSource={approvedReviews}
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
