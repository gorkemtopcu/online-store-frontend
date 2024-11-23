import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAllowed, redirectTo }) => {
  return isAllowed ? element : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
