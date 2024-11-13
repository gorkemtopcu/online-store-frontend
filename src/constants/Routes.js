import {
  BarChartOutlined,
} from '@ant-design/icons';
import React from 'react';
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
              key: 'product/edit',
              label: 'Edit',
          },
      ],
  },
];

export default Routes;
