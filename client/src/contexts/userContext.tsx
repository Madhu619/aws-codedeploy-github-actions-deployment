import React, { useEffect } from "react";
import { useSetState } from 'react-use';
import { LocalStorageValues } from "../utils/types";

export interface iLoginProps {
  isLoggedIn: boolean,
  isLoginPending: boolean,
  loginError: string | null,
  loginUser: any,
}

export interface iAuthProps {
  state: iLoginProps,
  login: (userName: string, password: string) => void,
  logout: () => void,
}
export const initialState: iLoginProps | any = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  loginUser: {}
}
export const AuthContext = React.createContext(initialState);
const localLogin = localStorage.getItem(LocalStorageValues.LOGIN_USER);

export const ContextProvider = (props: any) => {
  const [state, setState] = useSetState<any>(initialState);

  const setLoginPending = (isLoginPending: boolean) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn: boolean) => setState({isLoggedIn});
  const setLoginError = (loginError: string | null) => setState({loginError});
  const setLoginUser = (loginUser: any) => setState({loginUser});

  const login = (userName: string, password: string) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);
    setLoginUser(null);

    const res = fetchLogin( userName, password )
    res.then(result => {
      if (result.error) {
        setLoginError(result)
      } else {
        setLoginError(null)
        setLoginUser(result);
        setLoginPending(false);
        setLoginSuccess(true);
        localStorage.setItem(LocalStorageValues.LOGIN_USER, JSON.stringify(result));
      }
    }).catch( error =>
      setLoginError(error)
    )
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
    setLoginUser(null);
    localStorage.clear();
  }

  useEffect(() => {
    if (localLogin) {
      setState({
        isLoginPending: false,
        isLoggedIn: true,
        loginUser: JSON.parse(localLogin)
      })
    }
  }, [setState])

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchLogin = (userName: string, password:string ) => 
  fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "localhost, 0.0.0.0/0",
      "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    },
    body: JSON.stringify({userName: userName, password: password}),
  }).then((result)=> result.json())
  .catch(error => error)