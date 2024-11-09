import React from 'react';
import { BarChartOutlined, EditOutlined } from '@ant-design/icons';

const AdminRoutes = [
    {
        key: 'dashboard',
        icon: <BarChartOutlined />,
        label: 'Product',
        children: [
            {
                key: 'product/create',
                label: 'Create',
                icon: <EditOutlined />,

            },
            {
                key: 'product/Edit',
                label: 'Edit',
                icon: <EditOutlined />,

            },
        ],
    },
];

export default AdminRoutes;
