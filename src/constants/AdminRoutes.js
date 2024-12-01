import React from 'react';
import Icon, { BarChartOutlined, EditOutlined } from '@ant-design/icons';
import { AdminRoutePaths } from './route_paths';

const AdminRoutes = [
    {
        key: 'category',
        icon: <BarChartOutlined />,
        label: 'Category',
        children: [
            {
                key: AdminRoutePaths.CREATE_CATEGORY,
                label: 'Create',
                icon: <EditOutlined />,

            },
            {
                key: AdminRoutePaths.EDIT_CATEGORY,
                label: 'Edit',
                icon: <EditOutlined />,

            },
        ],
    },
    {
        key: 'dashboard',
        icon: <BarChartOutlined />,
        label: 'Product',
        children: [
            {
                key: AdminRoutePaths.CREATE_PRODUCT,
                label: 'Create',
                icon: <EditOutlined />,

            },
            {
                key: AdminRoutePaths.EDIT_PRODUCT,
                label: 'Edit',
                icon: <EditOutlined />,

            },
        ],
    }
];

export default AdminRoutes;
