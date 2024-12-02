export const sortProducts = (products, sortOption) => {
  if (!products) return [];
  const sortedProducts = [...products];
  if (!sortOption || !sortOption.callback) return sortedProducts;
  return sortedProducts.sort(sortOption.callback);
};

export const searchProducts = (products, searchTerm) => {
  if (!products) return [];
  if (searchTerm.trim() === "") return products;

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterProducts = (products, filters) => {
  if (!products) return [];
  const activeFilters = Object.keys(filters).filter(
    (key) => filters[key] === true
  );
  if (!filters || activeFilters.length === 0) return products;
  return products.filter((product) => filters[product.categoryId]);
};
