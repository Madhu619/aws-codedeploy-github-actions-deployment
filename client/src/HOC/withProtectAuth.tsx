import React, { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../contexts/userContext";

/**
 * HoC used to render the login form for pages that should be protected from non-authenticated users
 *
 * @author Madhusudhana RK
 */
 function withProtectedAuth (WrappedPage: React.ComponentType) {
  return function Comp(): React.ReactElement {
    const {state : { isLoggedIn }} = useContext(AuthContext);
    return !isLoggedIn ? 
      <LoginForm loginFormOpen={true} onHideLoginForm={()=> {}} />
    :
      <WrappedPage />
  };
}
export default withProtectedAuth;
