import React, { useCallback, useEffect, useState } from "react";
import MainImage from "./MainImage";
import WishlistButton from "components/buttons/WishlistButton";
import ThumbnailList from "./ThumbnailList";
import WishlistService from "services/WishlistService";
import useUserStore from "context/UserStore";
import { message } from "antd";

const ProductImage = ({ imageURLs, productId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { currentUser } = useUserStore();

  const fetchWishlist = useCallback(
    async (user) => {
      if (!user) return; // Exit if the user is not logged in
      try {
        setIsWishlistLoading(true);
        const response = await WishlistService.getByUserId(user.uid);
        const wishlistItem = response.data.find(
          (item) => item.productId === productId
        );
        if (wishlistItem) {
          setIsWishlisted(true);
          setWishlistId(wishlistItem.id); // Save the wishlist item's ID
        } else {
          setIsWishlisted(false);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsWishlistLoading(false);
      }
    },
    [productId]
  );

  useEffect(() => {
    fetchWishlist(currentUser);
  }, [fetchWishlist, currentUser]);

  const toggleWishlist = async () => {
    if (!currentUser) {
      message.error("Please log in to use the wishlist feature");
      return;
    }
    setIsWishlistLoading(true);

    try {
      if (isWishlisted) {
        // Remove from wishlist
        await WishlistService.removeFromWishlist(wishlistId);
        setIsWishlisted(false);
        setWishlistId(null);
      } else {
        // Add to wishlist
        const response = await WishlistService.addToWishlist(
          currentUser.uid,
          productId
        );
        setIsWishlisted(true);
        setWishlistId(response.data.id);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleNavigate = (direction) => {
    setCurrentImageIndex((prev) =>
      direction === "left"
        ? (prev - 1 + imageURLs.length) % imageURLs.length
        : (prev + 1) % imageURLs.length
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div style={{ position: "relative", maxWidth: "300px", margin: "0 auto" }}>
      <MainImage
        imageURL={imageURLs[currentImageIndex]}
        onNavigate={handleNavigate}
      />
      <WishlistButton
        isWishlisted={isWishlisted}
        toggleWishlist={toggleWishlist}
        loading={isWishlistLoading} // Disable while loading
      />
      <ThumbnailList
        imageURLs={imageURLs}
        currentImageIndex={currentImageIndex}
        onThumbnailClick={handleThumbnailClick}
      />
    </div>
  );
};

export default ProductImage;
