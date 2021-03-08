import React, { useContext, createContext, useState } from "react";
import {Redirect} from "react-router-dom"

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

const useAuth = () => {
  return useContext(authContext);
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}
const PrivateContent = ({ children }) => {
  let auth = useAuth();

  console.log(auth)
//   return auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//             }}
//           />
//         );
    return (children)
}


export default PrivateContent;
export {useAuth, useProvideAuth, ProvideAuth}