import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: "",
  admin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(null);
  const userIsLoggedIn = !!token;

  const loginHandler = (token, userId, admin) => {
    setToken(token);
    setUserId(userId);
    setAdmin(admin);
  };
  const logoutHandler = (token, userId) => {
    setToken(null);
    setUserId(null);
    setAdmin(false);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    admin: admin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
