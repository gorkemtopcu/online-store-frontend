import {
    BarChartOutlined,
} from '@ant-design/icons';

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