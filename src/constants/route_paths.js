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
  NOTIFICATIONS: "/notifications", // Added Notifications route

};

const AdminRoutePaths = {
  ADMIN: "/admin",
  CREATE_PRODUCT: "product/create",
  EDIT_PRODUCT: "product/edit",

  // Category
  CREATE_CATEGORY: "category/create",
  EDIT_CATEGORY: "category/edit",

  // Order
  MANAGE_ORDER: "/admin/manage-order",
};

export { CustomerRoutePaths, AdminRoutePaths };
