import React from "react";

const DiscountForm = ({
  discountRate,
  setDiscountRate,
  handleApplyDiscount,
  handleRemoveDiscount,
  selectedProduct,
}) => {
  return (
    <div>
      <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-2">
        Discount Percentage
      </label>
      <input
        id="discountRate"
        type="number"
        value={discountRate}
        onChange={(e) => setDiscountRate(e.target.value)}
        placeholder="Enter discount percentage"
        className="w-full p-2 border border-gray-300 rounded-md"
        min="0"
        max="100"
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleApplyDiscount}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          disabled={!selectedProduct || !discountRate}
        >
          Apply Discount
        </button>
        <button
          onClick={handleRemoveDiscount}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          disabled={!selectedProduct}
        >
          Remove Discount
        </button>
      </div>
    </div>
  );
};

export default DiscountForm;
