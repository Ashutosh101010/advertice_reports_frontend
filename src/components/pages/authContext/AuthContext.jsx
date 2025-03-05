// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import AdverticeNetwork from '../../../Network';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const [auth, setAuth] = useState(localStorage.getItem("accessToken") || null);
  const [authenticated, setAuthenticated] = useState(!!auth);
  const [stateList, setStateList] = useState([]);
  const userType = localStorage.getItem("userType");
  const organisationId = localStorage.getItem("organizationId");

  console.log('auth', auth);


  useEffect(() => {
    getAllCities();
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("accessToken");
      setAuth(newToken);
      setAuthenticated(!!newToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const getAllCities = async () => {
    const res = await AdverticeNetwork.fetchCity();
    setStateList(res.states);
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, setAuth, auth, stateList, setStateList, userType, organisationId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
