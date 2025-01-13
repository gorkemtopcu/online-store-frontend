import React from "react";
import {
  BarChartOutlined,
  EditOutlined,
  TruckOutlined,
  DollarOutlined,
  FileTextOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { AdminRoutePaths } from "./route_paths";
import UserRoles from "./UserRoles";

const AdminRouteFactory = (role) => {
  switch (role) {
    case UserRoles.SALES_MANAGER:
      return [
        {
          key: "dashboard",
          icon: <DollarOutlined />,
          label: "Sales",
          children: [
            {
              key: AdminRoutePaths.DISPLAY_INVOICES,
              label: "Display Invoices",
              icon: <FileTextOutlined />,
            },
            {
              key: AdminRoutePaths.REVENUE_CHART,
              label: "Revenue Chart",
              icon: <BarChartOutlined />,
            },
            {
              key: AdminRoutePaths.EVALUATE_REFUNDS,
              label: "Evaluate Refunds",
              icon: <EditOutlined />,
            },
            {
              key: AdminRoutePaths.SET_DISCOUNT_RATE,
              label: "Set Discount Rate",
              icon: <PercentageOutlined />,
            },
            {
              key: AdminRoutePaths.MANAGE_PRICE,
              label: "Manage Price",
              icon: <PercentageOutlined />,
            },
          ],
        },
      ];
    case UserRoles.PRODUCT_MANAGER:
      return [
        {
          key: "product",
          icon: <BarChartOutlined />,
          label: "Product Management",
          children: [
            {
              key: AdminRoutePaths.CREATE_PRODUCT,
              label: "Add Product",
              icon: <EditOutlined />,
            },
            {
              key: AdminRoutePaths.EDIT_PRODUCT,
              label: "Edit Product",
              icon: <EditOutlined />,
            },
          ],
        },
        {
          key: "categories",
          icon: <EditOutlined />,
          label: "Category Management",
          children: [
            {
              key: AdminRoutePaths.CREATE_CATEGORY,
              label: "Add Category",
              icon: <EditOutlined />,
            },
            {
              key: AdminRoutePaths.EDIT_CATEGORY,
              label: "Edit Category",
              icon: <EditOutlined />,
            },
          ],
        },
        {
          key: "delivery",
          icon: <TruckOutlined />,
          label: "Delivery Management",
          children: [
            {
              key: AdminRoutePaths.DELIVERY_LIST,
              label: "Delivery List",
              icon: <TruckOutlined />,
            },
            {
              key: AdminRoutePaths.DISPLAY_INVOICES,
              label: "Display Invoices",
              icon: <FileTextOutlined />,
            },
          ],
        },
        {
          key: "comment",
          icon: <EditOutlined />,
          label: "Comment Management",
          children: [
            {
              key: AdminRoutePaths.MANAGE_COMMENT,
              label: "Manage Comments",
              icon: <EditOutlined />,
            },
            {
              key: AdminRoutePaths.ALL_COMMENTS,
              label: "All Comments",
              icon: <EditOutlined />,
            },
          ],
        },
      ];
    default:
      return []; // Return empty for roles without admin permissions
  }
};

export default AdminRouteFactory;
