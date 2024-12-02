import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Table, message, Tag } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import ReviewService from "services/ReviewService"; // Service for handling review API calls
import StringConstants from "constants/StringConstants";

// Refactored ManageReviewView component
const ManageReviewView = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch reviews with useCallback for potential reuse
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ReviewService.getPendingReviews(); // Assume this fetches reviews
      setReviews(response.data);
      console.log("Reviews fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      message.error("Failed to fetch reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDecline = async (reviewId) => {
    try {
      await ReviewService.declineReview(reviewId); // Assume this deletes a review
      setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
      message.success("Review declined successfully.");
    } catch (error) {
      console.error("Error declining review:", error);
      message.error("Failed to decoine the review. Please try again.");
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      await ReviewService.approveReview(reviewId); // Assume this approves a review
      setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
      message.success("Review approved successfully.");
    } catch (error) {
      console.error("Error approving review:", error);
      message.error("Failed to approve review. Please try again.");
    }
  };

  // Define columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "reviewStatus",
      key: "reviewStatus",
      render: (status) => (
        <Tag color={status === "APPROVED" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {record.reviewStatus !== "APPROVED" && (
            <Button
              type="primary"
              onClick={() => handleApprove(record.reviewId)}
              style={{ marginRight: 8 }}
            >
              {StringConstants.APPROVE}
            </Button>
          )}
          <Button type="primary" danger onClick={() => handleDecline(record.reviewId)}>
            {StringConstants.DECLINE}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ProductHeader title="Manage Reviews" />
      <Card>
        <Table
          dataSource={reviews}
          columns={columns}
          rowKey="reviewId"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default ManageReviewView;
