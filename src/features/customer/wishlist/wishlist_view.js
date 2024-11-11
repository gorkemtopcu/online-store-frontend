import React from 'react';
import HomeFooter from "components/footers/home_footer";
import Wishlist from './components/wishlist';

const WishlistView = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Wishlist />         
            </div>
            <HomeFooter />
        </div>
        
    );
};

export default WishlistView;
