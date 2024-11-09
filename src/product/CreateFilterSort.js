const createFilterSort = (products, { searchTerm = '', sortOption = '', mainCategory = '', subCategory = '' }) => {
  return products
    .filter(product => {
      // Arama işlemi
      const matchesSearchTerm =
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Ana ve alt kategori ayrımı
      const [productMainCategory, productSubCategory] = product.category
        ? product.category.split(' - ')
        : ['', ''];

      // Ana kategoriye göre filtreleme
      const matchesMainCategory = mainCategory ? productMainCategory === mainCategory : true;

      // Alt kategoriye göre filtreleme
      const matchesSubCategory = subCategory ? productSubCategory === subCategory : true;

      return matchesSearchTerm && matchesMainCategory && matchesSubCategory;
    })
    .sort((a, b) => {
      // Fiyata göre sıralama
      if (sortOption === 'priceLowHigh') {
        return a.price - b.price;
      } else if (sortOption === 'priceHighLow') {
        return b.price - a.price;
      }
      return 0;
    });
};

export default createFilterSort;
