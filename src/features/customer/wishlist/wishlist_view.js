import React, { useEffect, useState } from 'react';
import Policies from '../home/view/components/policies';
import HomeFooter from "components/footers/home_footer";
import { productMockService } from 'services/product_mock_service';
import ProductCardList from 'components/lists/product_card_list';

const WishlistView = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsData = productMockService.generateProducts(3); // Generate 3 mock products
        setProducts(productsData);
    }, []);

    return (
        <div className='flex-wrap'>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h1>
                <ProductCardList products={products} />
                <Policies />
                <HomeFooter />
            </div>
        </div>
        
    );
};

export default WishlistView;
