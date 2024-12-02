import React, { useEffect, useState } from "react";
import WishlistService from "services/WishlistService";
import ProductService from "services/ProductService"; // Import ProductService to fetch product details
import WishlistCardList from "components/lists/wishlistCardList";
import useUserStore from "context/UserStore";
import { Empty, message } from "antd";
import LoadingSpinner from "components/spinner/LoadingSpinner";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userId = currentUser.uid;
        const response = await WishlistService.getByUserId(userId);
        if (response && response.data) {
          console.log("Fetched wishlist data:", response.data);
          const productDetailsPromises = response.data.map(async (item) => {
            const productResponse = await ProductService.getById(
              item.productId
            );
            if (productResponse && productResponse.data) {
              return {
                id: item.productId,
                name: productResponse.data.name,
                image: productResponse.data.image,
                wishlistId: item.id,
                ...productResponse.data,
              };
            }
            return null;
          });

          const productDetails = await Promise.all(productDetailsPromises);
          setProducts(productDetails.filter((product) => product !== null));
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      await WishlistService.removeFromWishlist(wishlistItemId);
      setProducts(
        products.filter((product) => product.wishlistId !== wishlistItemId)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      message.error("Failed to remove item from wishlist");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <div>Please log in to view your wishlist.</div>;
  }

  return (
    <div className="flex-wrap">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h1>
        {products.length === 0 ? (
          <Empty description={"Your wishlist is empty"} />
        ) : (
          <WishlistCardList
            products={products}
            onRemove={handleRemoveFromWishlist}
          />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
