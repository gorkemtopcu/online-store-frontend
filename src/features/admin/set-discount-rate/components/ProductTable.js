import React from "react";

const ProductTable = ({ products, selectedProduct, setSelectedProduct }) => {
  const hasDiscount = (product) => product.discount > 0;

  const calculateDiscountPercentage = (product) =>
    product.discount > 0 ? product.discount.toFixed(1) : 0;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Product Name</th>
            <th className="p-3 text-left">Current Price</th>
            <th className="p-3 text-left">Discount Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              className={`border-t border-gray-200 hover:bg-gray-50 transition-colors ${
                selectedProduct === product.productId ? 'bg-blue-50 hover:bg-blue-100' : ''
              }`}
              onClick={() => setSelectedProduct(product.productId)}
              style={{ cursor: 'pointer' }}
            >
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price.toFixed(2)}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    hasDiscount(product) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {hasDiscount(product)
                    ? `${calculateDiscountPercentage(product)}% OFF`
                    : 'No discount'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
