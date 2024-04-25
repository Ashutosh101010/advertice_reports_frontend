// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import AdverticeNetwork from '../../../Network';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const organisationId = localStorage.getItem("organizationId");
  const [authenticated, setAuthenticated] = useState(false);
  const [auth, setAuth] = useState(token);
  const [stateList, setStateList] = useState([]);


  useEffect(() => {
    getAllCities();
  }, [])
  const getAllCities = async () => {
    const res = await AdverticeNetwork.fetchCity();
    setStateList(res.states);
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, setAuth, auth, stateList, setStateList, userId, userType, organisationId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
