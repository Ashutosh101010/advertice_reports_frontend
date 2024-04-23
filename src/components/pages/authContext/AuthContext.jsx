// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("accessToken");
  const [authenticated, setAuthenticated] = useState(false);
  const [auth, setAuth] = useState(token);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, setAuth, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
