import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../authContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/admin-login" />
  }
  if (auth) {

    return children;
  }
};

export default ProtectedRoute;
