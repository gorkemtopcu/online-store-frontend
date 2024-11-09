import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../assets/sway_logo.jpeg'; // Import the logo
import { ShoppingCartOutlined, UserOutlined , SearchOutlined, MenuOutlined } from '@ant-design/icons';



const Navbar = () => {
    const [visible, setVisible] = React.useState(false);

    return (
        <div className="flex items-center justify-between py-3 font-medium px-4">
            {/* Logo Container */}
            <div className="flex items-center">
                <img src={logo} alt="logo" className="w-24 mr-4" /> 
            </div>

           {/* Navigation Links */}
            <ul className='hidden md:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1 '>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">
                {/* Display search, user and cart icon */}
                <SearchOutlined className="w-5 h-5 cursor-pointer" />
                <div className="group relative"> 
                    <UserOutlined className="w-5 h-5 cursor-pointer" />
                    <div className="hidden group-hover:block absolute right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded"> 
                            <p className="cursor-pointer hover:text-black">Profile</p>
                            <p className="cursor-pointer hover:text-black">Orders</p>
                            <p className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className="relative"> 
                    <ShoppingCartOutlined className="w-5 min-w-5" alt = "" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded text-[8px]'> 10</p>
                </Link>
                {/* Display menu icon only in small sized screen*/}
                <MenuOutlined onClick= {()=>setVisible(true)} className="w-5 cursor-pointer sm:hidden" alt = "" />
                {/* todo: Display menu  only in small sized screen*/}
            </div>
        </div>
    );
};


export default Navbar;