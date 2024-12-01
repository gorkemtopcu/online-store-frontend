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
};

const AdminRoutePaths = {
  ADMIN: "/admin",
  CREATE_PRODUCT: "product/create",
  EDIT_PRODUCT: "product/edit",

  // Category
  CREATE_CATEGORY: "category/create",
  EDIT_CATEGORY: "category/edit",

};

export { CustomerRoutePaths, AdminRoutePaths };
