import { useState, useEffect, useMemo, useCallback } from "react";
import ProductService from "services/ProductService";
import {
  filterProducts,
  searchProducts,
  sortProducts,
} from "../utils/ProductQueryUtils";

export const PRODUCT_STATES = {
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error",
};

const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [filters, setFilters] = useState({});
  const [state, setState] = useState(PRODUCT_STATES.LOADING);

  const loadProducts = useCallback(async () => {
    setState(PRODUCT_STATES.LOADING);
    try {
      const response = await ProductService.getAllPriced();
      if (response?.data) {
        setProducts(response.data);
        setState(PRODUCT_STATES.LOADED);
      } else {
        setState(PRODUCT_STATES.ERROR);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setState(PRODUCT_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = searchProducts(products, searchTerm);
    filtered = sortProducts(filtered, sortOption);
    return filterProducts(filtered, filters);
  }, [products, searchTerm, sortOption, filters]);

  return {
    state,
    filteredProducts,
    setSearchTerm,
    setSortOption,
    setFilters,
    sortOption,
    retry: loadProducts,
  };
};

export default useProductsQuery;
