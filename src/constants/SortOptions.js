const SortOptions = {
  LOWEST_PRICE: { text: "Lowest Price", callback: (a, b) => a.price - b.price },
  HIGHEST_PRICE: {
    text: "Highest Price",
    callback: (a, b) => b.price - a.price,
  },
  MOST_POPULAR: {
    text: "Most Popular",
    callback: (a, b) => b.numOfWishlists - a.numOfWishlists,
  },
};

export default SortOptions;
