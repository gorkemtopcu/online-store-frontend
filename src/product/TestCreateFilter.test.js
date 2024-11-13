import ProductSearchFilter from "features/customer/collection/view/components/ProductSearchFilter";'

describe('Search Performance and Edge Cases', () => {
  
  // Mock Data Setup
  const largeDataset = Array.from({ length: 10000 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `Description for product ${index + 1}`,
    price: Math.random() * 100,
    quantityInStocks: index % 2 === 0 ? 10 : 0,
    category: index % 2 === 0 ? 'Men - T-Shirts' : 'Women - Shoes',
  }));

  const testParams = { searchTerm: '', sortOption: '', mainCategory: '', subCategory: '' };

  // Performance Test
  test('Search performance with a large dataset', () => {
    const start = performance.now();
    ProductSearchFilter(largeDataset, testParams);
    const end = performance.now();
    console.log(`Search took ${end - start} ms`);
  });

  // Edge Case Tests
  test('Handles empty search term', () => {
    const results =ProductSearchFilter(largeDataset, { ...testParams, searchTerm: '' });
    expect(results.length).toBe(largeDataset.length); // Should return all products
  });

  test('Handles special characters in search term', () => {
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm: '@#$%' });
    expect(results.length).toBe(0); // Expect zero results as special characters are removed in normalization
  });  

  test('Handles very long search term gracefully', () => {
    const longSearchTerm = 'a'.repeat(1000); // Very long search term
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm: longSearchTerm });
    expect(results.length).toBe(0); // Should handle gracefully without crash
  });

  test('Search is case-insensitive', () => {
    const searchTerm = 'product 1';
    const resultsLowercase = ProductSearchFilter(largeDataset, { ...testParams, searchTerm });
    const resultsUppercase = ProductSearchFilter(largeDataset, { ...testParams, searchTerm: searchTerm.toUpperCase() });
    expect(resultsLowercase).toEqual(resultsUppercase); // Should return the same results
  });

  test('Ignores leading and trailing whitespace in search term', () => {
    const searchTerm = '   Product 1   ';
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm });
    const productExists = results.some(product => product.name === 'Product 1');
    expect(productExists).toBe(true); // Expect "Product 1" to be in the results
  });  

  test('Returns partial matches for search term', () => {
    const searchTerm = 'Pro';
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm });
    expect(results.length).toBeGreaterThan(0); // Should find partial matches
  });

  test('Handles numbers in search term', () => {
    const searchTerm = '1';
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm });
    expect(results.length).toBeGreaterThan(0); // Assuming some product IDs or names contain '1'
  });

  test('Prioritizes exact matches in search results', () => {
    const searchTerm = 'Product 1';
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm });
    expect(results[0].name).toBe('Product 1'); // The exact match should be the first result
  });

  test('Handles extreme data values in products', () => {
    const extremeProduct = {
      id: 10001,
      name: 'Expensive Product',
      description: 'A very expensive product',
      price: 999999,
      popularity: 1,
      category: 'Luxury',
    };
    const results = ProductSearchFilter([...largeDataset, extremeProduct], { ...testParams, searchTerm: 'Expensive Product' });
    expect(results[0]).toEqual(extremeProduct); // Should handle extreme values without error
  });

  test('Returns empty array when no products match search term', () => {
    const searchTerm = 'Nonexistent Product';
    const results = ProductSearchFilter(largeDataset, { ...testParams, searchTerm });
    expect(results).toHaveLength(0); // Should return an empty array
  });

});
