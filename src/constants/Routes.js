import {
    BarChartOutlined,
} from '@ant-design/icons';
<<<<<<< HEAD
import { Link } from 'react-router-dom';  

const Routes = [
  {
    key: 'dashboard',
    icon: <BarChartOutlined />,
    label: 'Reports',
    children: [
      {
        key: 'product',
        label: <Link to="/product">Product</Link>,  
      },
      {
        key: 'product/sell',
        label: 'Sell',
      },
      {
        key: 'product/buy',
        label: 'Buy',     
     },
    ],
  },
=======
import React from 'react';

const Routes = [
    {
        key: 'dashboard',
        icon: <BarChartOutlined />,
        label: 'Reports',
        children: [
            {
                key: 'product',
                label: 'Product',
            },
            {
                key: 'product/sell',
                label: 'Sell',
            },
            {
                key: 'product/buy',
                label: 'Buy',
            },
        ],
    },
>>>>>>> b6092c06ae4e5d30effeb9f402dee59827ec1aa9
];

export default Routes;