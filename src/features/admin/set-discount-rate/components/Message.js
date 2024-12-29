import React from "react";

const Message = ({ message, error }) => {
  if (!message && !error) return null;

  return (
    <div className={`mt-4 p-2 rounded ${message ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
      {message || error}
    </div>
  );
};

export default Message;
