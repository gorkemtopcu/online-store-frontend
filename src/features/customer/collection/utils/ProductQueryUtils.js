export const sortProducts = (products, sortOption) => {
  if (!products) return [];
  const sortedProducts = [...products];

  if (sortOption === "price") {
    return sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "popularity") {
    return sortedProducts.sort((a, b) => b.popularity - a.popularity);
  }

  return sortedProducts;
};

export const searchProducts = (products, searchTerm) => {
  if (!products) return [];
  if (searchTerm.trim() === "") return products;

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterProducts = (products, filters) => {
  if (!products) return [];
  if (!filters || Object.keys(filters).length === 0) return products;

  return products.filter((product) => filters[product.categoryId]);
};
