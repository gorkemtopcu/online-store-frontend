import React, { useEffect, useState } from 'react';
import Policies from '../home/view/components/policies';
import HomeFooter from "components/footers/home_footer";
import { productMockService } from 'services/product_mock_service';
import ProductCardList from 'components/lists/product_card_list';

const WishlistView = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const productsData = productMockService.generateProducts(3); // Generate 3 mock products
        setProducts(productsData);
    }, []);

    // Handle add to cart
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Handle remove from wishlist
    const removeFromWishlist = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div className='flex-wrap'>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h1>
                
                {/* Display message if wishlist is empty */}
                {products.length === 0 ? (
                    <p className="text-center text-lg mt-6">Your wishlist is empty. Start adding products!</p>
                ) : (
                    <ProductCardList 
                        products={products} 
                        showButtons={true} // Only show buttons in WishlistView
                        onAddToCart={addToCart}
                        onRemoveFromWishlist={removeFromWishlist}
                    />
                )}

                <Policies />
                <HomeFooter />
            </div>
        </div>
    );
};

export default WishlistView;
