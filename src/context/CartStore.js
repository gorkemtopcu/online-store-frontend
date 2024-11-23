import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || {},

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const productId = product.productId;
      const existingProduct = state.cart[productId];

      const updatedCart = {
        ...state.cart,
        [productId]: existingProduct
          ? {
              product: existingProduct.product,
              quantity: existingProduct.quantity + quantity,
            }
          : { product, quantity },
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = { ...state.cart };
      delete updatedCart[productId];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  decreaseQuantity: (productId, amount = 1) =>
    set((state) => {
      const currentProduct = state.cart[productId];

      if (currentProduct) {
        const newQuantity = currentProduct.quantity - amount;
        let updatedCart;

        if (newQuantity > 0) {
          updatedCart = {
            ...state.cart,
            [productId]: {
              product: currentProduct.product,
              quantity: newQuantity,
            },
          };
        } else {
          updatedCart = { ...state.cart };
          delete updatedCart[productId];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: {} });
  },

  getTotalPrice: () => {
    const state = get();
    return Object.values(state.cart).reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0
    );
  },

  getTotalQuantity: () => {
    const state = get();
    return Object.values(state.cart).reduce(
      (total, { quantity }) => total + quantity,
      0
    );
  },
}));

export default useCartStore;
