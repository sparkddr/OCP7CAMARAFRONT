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
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("storedToken"))
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("storedUserId"))
  );
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("storedAdmin"))
  );
  const userIsLoggedIn = !!token;

  const loginHandler = (token, userId, admin) => {
    setToken(token);
    localStorage.setItem("storedToken", JSON.stringify(token));
    setUserId(userId);
    localStorage.setItem("storedUserId", JSON.stringify(userId));
    setAdmin(admin);
    localStorage.setItem("storedAdmin", JSON.stringify(admin));
  };
  const logoutHandler = (token, userId) => {
    setToken(null);
    setUserId(null);
    setAdmin(false);
    localStorage.clear();
  };

  // const contextValue = {
  //   token: localStorage.getItem('storedToken'),
  //   isLoggedIn: userIsLoggedIn,
  //   userId: localStorage.getItem('storedUserId'),
  //   admin: localStorage.getItem('storedAdmin'),
  //   login: loginHandler,
  //   logout: logoutHandler,
  // };
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
