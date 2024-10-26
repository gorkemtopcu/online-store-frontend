import {
    BarChartOutlined,
} from '@ant-design/icons';
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
];

export default Routes;