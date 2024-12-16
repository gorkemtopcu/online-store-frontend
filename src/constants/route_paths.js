const CustomerRoutePaths = {
  HOME: "/",
  COLLECTION: "/collection",
  ABOUT: "/about",
  CONTACT: "/contact",
  WISHLIST: "/wishlist",
  DETAILS: "/products/:id",
  CART: "/cart",
  PAYMENT: "/payment",
  ORDERS: "/orders",
  INVOICE: "/invoice/:orderId",
};

const AdminRoutePaths = {
  ADMIN: "/admin",
  DASHBOARD: "/admin",


  // Product Manager Routes
  // Category
  CREATE_CATEGORY: "category/create",
  EDIT_CATEGORY: "category/edit",

  // Product
  MANAGE_STOCKS: "product/manage-stocks",
  CREATE_PRODUCT: "product/create",
  EDIT_PRODUCT: "product/edit",

  // Order
  MANAGE_ORDER: "/admin/manage-order",

  // Comment
  MANAGE_COMMENT: "/admin/manage-comment",
  ALL_COMMENTS: "/admin/all-comments",

  // Delivery
  DELIVERY_LIST: "/admin/delivery-list",

  // Sales Manager Routes
  DISPLAY_INVOICES: "/admin/display-invoices",
  REVENUE_CHART: "/admin/revenue-chart",
  EVALUATE_REFUNDS: "/admin/evaluate-refunds",
  SET_DISCOUNT_RATE: "/admin/set-discount-rate",
};

export { CustomerRoutePaths, AdminRoutePaths };
