import React from 'react';
import Policies from '../home/view/components/policies';
import HomeFooter from "components/footers/home_footer";
import Wishlist from './components/wishlist';

const WishlistView = () => {

    return (
        <div className='flex-wrap'>
            <div>
                <Wishlist />
                <Policies />
                <HomeFooter />
            </div>
        </div>
        
    );
};

export default WishlistView;
