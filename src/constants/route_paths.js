const CustomerRoutePaths = {
    HOME: '/',
    COLLECTION: '/collection',
    ABOUT: '/about',
    CONTACT: '/contact',
    WISHLIST: '/wishlist',
    DETAILS: '/products/:id', 
    CHECKOUT: '/checkout'
};

const AdminRoutePaths = {
    ADMIN: '/admin',
    CREATE_PRODUCT: 'product/create',
    EDIT_PRODUCT: 'product/edit'
};

export { CustomerRoutePaths, AdminRoutePaths };