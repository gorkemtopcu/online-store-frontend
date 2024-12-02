const ServiceConstants = {
  PRODUCTS: "http://localhost:8081/admin/products",
  VERIFY: "http://localhost:8081/auth/verify",
  USER: "http://localhost:8081/user",
  ORDERS: "http://localhost:8081/api/orders",
  CATEGORY: "http://localhost:8081/categories",
  REVIEW: "http://localhost:8081/review",
  WISHLIST: "http://localhost:8081/wishlist",
  INVOICES: "http://localhost:8081/api/invoices",

  GET_ALL: "/getAll",
  GET_BY_ID: "/getById",
  CREATE: "/create",
  GET_BY_USER_ID: "/getByUserId/",
  GET_BY_PRODUCT_ID: "/getByProductId/",
  ADD: "/add",
  DELETE: "/delete/",
  APPROVE: "/approve/",
  DECLINE: "/decline/",
  REMOVE: "/remove",
  UPDATE_STATUS: "/updateStatus",
  BEST_SELLERS: "/getMostWishlisted",
  NEW_ARRIVALS: "/getNewArrivals",
};

export default ServiceConstants;
