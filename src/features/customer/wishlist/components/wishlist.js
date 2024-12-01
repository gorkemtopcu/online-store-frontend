import React, { useEffect, useState } from "react";
import WishlistService from "services/WishlistService";
import ProductService from "services/ProductService"; // Import ProductService to fetch product details
import ProductCardList from "components/lists/product_card_list";
import useUserStore from "context/UserStore";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = currentUser.uid;
        const response = await WishlistService.getById(userId);
        if (response && response.data) {
          console.log("Fetched wishlist data:", response.data); // Log the fetched data

          // Fetch product details for each item in the wishlist
          const productDetailsPromises = response.data.map(async (item) => {
            const productResponse = await ProductService.getById(item.productId);
            if (productResponse && productResponse.data) {
              return {
                id: item.productId,
                name: productResponse.data.name, // Adjust this based on the actual property name
                image: productResponse.data.image, // Adjust this based on the actual property name
                ...productResponse.data // Include other properties if necessary
              };
            }
            return null;
          });

          const productDetails = await Promise.all(productDetailsPromises);
          setProducts(productDetails.filter(product => product !== null));
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  return (
    <div className="flex-wrap">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h1>
        <ProductCardList products={products} />
      </div>
    </div>
  );
};

export default Wishlist;