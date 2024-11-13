import React from "react";

const PolicyItem = ({ policy }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-2xl mb-4">{policy.icon}</div>
      <p className="font-semibold text-lg">{policy.title}</p>
      <p className="text-gray-500 text-sm">{policy.description}</p>
    </div>
  );
};

export default PolicyItem;
