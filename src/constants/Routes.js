import {
    BarChartOutlined,
} from '@ant-design/icons';
import React from 'react';

const Routes = [
    {
        key: 'dashboard',
        icon: <BarChartOutlined />,
        label: 'Dashboard',
    },
    {
        key: 'product',
        icon: <BarChartOutlined />,
        label: 'Products',
        children: [
            {
                key: 'product/create',
                label: 'Create',
            },
            {
                key: 'product/edit',
                label: 'Edit',
            },
        ],
    },
   
];

export default Routes;