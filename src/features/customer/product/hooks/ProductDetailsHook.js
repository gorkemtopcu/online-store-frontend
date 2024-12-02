import { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "services/ProductService";
import useCartStore from "context/CartStore";
import { CustomerRoutePaths } from "constants/route_paths";
import ReviewService from "services/ReviewService";
import ReviewStatus from "constants/ReviewStatus";

const useProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { addToCart, getCartObjects } = useCartStore();
  const navigate = useNavigate();

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await ProductService.getById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [id]);

  // Fetch approved reviews
  const fetchProductReviews = useCallback(async () => {
    try {
      const { data } = await ReviewService.getReviewsByProductId(id);
      const approvedReviews = data.filter(
        (review) => review.reviewStatus === ReviewStatus.APPROVED.text
      );
      setReviews(approvedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [id]);

  // Fetch product and reviews on mount or when id changes
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchProduct(), fetchProductReviews()]);
    };
    fetchData();
  }, [fetchProduct, fetchProductReviews]);

  // Get quantity of the product in the cart
  const getQuantityOnCart = useCallback(() => {
    const cart = getCartObjects();
    if (!cart) return 0;
    const productInCart = cart.find(
      (item) => item.product.productId === product?.productId
    );
    return productInCart ? productInCart.quantity : 0;
  }, [getCartObjects, product]);

  // Check if the product is available for adding to the cart
  const checkProductAvailability = useCallback(() => {
    const quantityOnCart = getQuantityOnCart();
    return product?.quantityInStock - quantityOnCart >= 1;
  }, [getQuantityOnCart, product]);

  // Handle adding product to the cart
  const handleAddToCart = useCallback(() => {
    addToCart(product);
    notification.success({
      key: "added-to-cart",
      message: "Added to Cart",
      description: `${product.name} has been successfully added to your cart.`,
      placement: "topRight",
      duration: 2,
      onClick: () => {
        navigate(CustomerRoutePaths.CART);
        notification.destroy("added-to-cart");
      },
    });
  }, [addToCart, navigate, product]);

  return { product, reviews, checkProductAvailability, handleAddToCart };
};

export default useProductDetails;
