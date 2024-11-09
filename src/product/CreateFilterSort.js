const normalizeSearchTerm = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim() 
    .replace(/[^a-z0-9\s]/g, ''); 
};

const createFilterSort = (products, { searchTerm = '', sortOption = '', mainCategory = '', subCategory = '' }) => {
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
  const normalizedMainCategory = normalizeSearchTerm(mainCategory);
  const normalizedSubCategory = normalizeSearchTerm(subCategory);

  if (!normalizedSearchTerm && searchTerm.trim().length > 0) {
    return [];
  }

  return products
    .filter(product => {
      
      const matchesSearchTerm =
        (product.name && normalizeSearchTerm(product.name).includes(normalizedSearchTerm)) ||
        (product.description && normalizeSearchTerm(product.description).includes(normalizedSearchTerm));

     
      const [productMainCategory, productSubCategory] = product.category
        ? product.category.split(' - ').map(normalizeSearchTerm)
        : ['', ''];

      
      const matchesMainCategory = normalizedMainCategory ? productMainCategory === normalizedMainCategory : true;
      const matchesSubCategory = normalizedSubCategory ? productSubCategory === normalizedSubCategory : true;

      return matchesSearchTerm && matchesMainCategory && matchesSubCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'priceLowHigh') {
        return a.price - b.price;
      } else if (sortOption === 'priceHighLow') {
        return b.price - a.price;
      }
      return 0;
    });
};

export default createFilterSort;
