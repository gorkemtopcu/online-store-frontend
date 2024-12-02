import { Button, Modal, Form, Input, Rate, message, Tag } from "antd";
import LoadingButton from "components/buttons/LoadingButton";
import ReviewStatus from "constants/ReviewStatus";
import useUserStore from "context/UserStore";
import React, { useEffect, useState } from "react";
import ReviewService from "services/ReviewService";

const ReviewButton = ({ product }) => {
  const [myReview, setMyReview] = useState(null);
  const [visible, setVisible] = useState(false);
  const { currentUser } = useUserStore();

  const toggleModal = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!currentUser) return;
    ReviewService.getReviewsByUserId(currentUser.uid).then((response) => {
      console.log("Reviews by user:", response);
      if (!response.data) return;
      response.data.forEach((review) => {
        if (review.productId === product.productId) {
          setMyReview(review);
        }
      });
    });
  }, [product, currentUser]);

  return (
    <>
      {/* Trigger Button */}
      <Button type="primary" onClick={toggleModal}>
        {myReview ? "See Review" : "Add Review"}
      </Button>
      {myReview ? (
        <SeeReviewModal
          visible={visible}
          setVisible={setVisible}
          review={myReview}
          product={product}
        />
      ) : (
        <AddReviewModal
          visible={visible}
          setVisible={setVisible}
          currentUser={currentUser}
          product={product}
          setMyReview={setMyReview}
        />
      )}
    </>
  );
};

const AddReviewModal = ({
  visible,
  setVisible,
  currentUser,
  product,
  setMyReview,
}) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setVisible((prev) => !prev);
  };

  const handleFormSubmit = (values) => {
    setIsLoading(true);
    ReviewService.addReview({
      uid: currentUser.uid,
      name: currentUser.name,
      productId: product.productId,
      rating: values.rating,
      comment: values.comment,
    }).then((response) => {
      if (!response.data) {
        message.error("Failed to add review. Please try again later.");
        return;
      }
      setMyReview(response.data);
      toggleModal();
      setIsLoading(false);
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={toggleModal}
      footer={null} // Custom footer for the form
      title="Add a Comment"
      closable
    >
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{ comment: "", rating }} // Bind the rating here
      >
        {/* Rating Input (Required) */}
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please select a rating!" }]}
        >
          <Rate value={rating} onChange={(value) => setRating(value)} />
        </Form.Item>

        {/* Comment Input (Optional) */}
        <Form.Item
          label="Comment"
          name="comment"
          rules={[
            { max: 500, message: "Comment cannot exceed 500 characters." },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Write your comment here..." />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          {isLoading ? (
            <LoadingButton></LoadingButton>
          ) : (
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const SeeReviewModal = ({ visible, setVisible, review, product }) => {
  const toggleModal = () => {
    setVisible((prev) => !prev);
  };

  const getReviewStatusTag = (status) => {
    const statusInfo = ReviewStatus[status] || {
      text: status,
      color: "default",
    };
    return (
      <Tag color={statusInfo.color} style={{ marginBottom: "12px" }}>
        {statusInfo.text}
      </Tag>
    );
  };

  return (
    <Modal
      open={visible}
      onCancel={toggleModal}
      footer={null}
      title={product.name}
      closable
    >
      <div>
        {/* Review Status Tag */}
        {getReviewStatusTag(review.reviewStatus)}
        <br />

        {/* Displaying the rating */}
        <Rate disabled value={review.rating} />

        {/* Displaying the comment */}
        <p>{review.comment}</p>
      </div>
    </Modal>
  );
};

export default ReviewButton;
