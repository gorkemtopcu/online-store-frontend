import Navbar from 'components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />  {/*To render child */}
        </div>
    );
};

export default UserLayout;