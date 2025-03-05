import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../authContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  // const { auth, userType } = useContext(AuthContext);


  const auth = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");

  console.log('userType', userType);
  
  if (!auth && userType) {
    if (userType !== "superadmin") {
      return <Navigate to="/admin-login" />
    }else{
      return <Navigate to="super-admin-login" />
    }
  }
  if (auth) {

    return children;
  }
};

export default ProtectedRoute;
