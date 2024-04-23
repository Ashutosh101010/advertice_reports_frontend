// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import AdverticeNetwork from '../../../Network';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("accessToken");
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
    <AuthContext.Provider value={{ authenticated, setAuthenticated, setAuth, auth, stateList, setStateList }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
