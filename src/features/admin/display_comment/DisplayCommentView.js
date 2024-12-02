import React, { useEffect, useState, useCallback } from "react";
import { Card, Table, Tag, message } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import ReviewService from "services/ReviewService"; // Service to fetch reviews

const DisplayCommentView = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments with useCallback for potential reuse
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ReviewService.getAllComments(); // Fetch all reviews
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      message.error("Failed to fetch comments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Define columns for the table
  const columns = [
    {
      title: "Reviewer Name",
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
      render: (rating) => `${rating} / 5`, // Format the rating
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
  ];

  return (
    <div>
      <ProductHeader title="All Comments" />
      <Card>
        <Table
          dataSource={comments}
          columns={columns}
          rowKey="reviewId"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default DisplayCommentView;
