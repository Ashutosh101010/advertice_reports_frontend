import React, { useEffect } from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../authContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  // const { auth, userType } = useContext(AuthContext);


  const auth = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();

  // console.log('auth', auth);
  useEffect(()=>{
      if (!auth) {
        navigate('/advertiser-login')
      }
  
  }, [auth])
  
  if (!auth && userType) {
    if (userType !== "superadmin") {
      return <Navigate to="/advertiser-login" />
    }else{
      return <Navigate to="super-admin-login" />
    }
  }
 
  if (auth) {

    return children;
  }
};

export default ProtectedRoute;
