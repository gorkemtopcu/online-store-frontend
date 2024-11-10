import React, { useEffect, useState } from 'react';
import Policies from '../home/view/components/policies';
import HomeFooter from "components/footers/home_footer";
import WishlistItems from './components/wishlist_items';

const WishlistView = () => {

    return (
        <div>
            <WishlistItems />
            <Policies />
            <HomeFooter />
        </div>
    );
};

export default WishlistView;
