import { createContext, useEffect, useContext, useCallback } from "react";
import { useSetState } from 'react-use';
import { AuthContext } from "./userContext";

export interface iCartProps {
  cartDetails: any,
}

export interface iAuthProps {
  state: iCartProps,
  getCartItems: () => void,
}
export const initialState: iCartProps | any = {
  cartDetails: {items: []},
}
export const CartContext = createContext(initialState);

export const CartContextProvider = (props: any) => {
  const [state, setState] = useSetState<any>(initialState);
  const {state: { loginUser }} = useContext(AuthContext);

  const setCartItems = useCallback((cartDetails: any) => setState({cartDetails}),[setState]);

  const getCartItems = useCallback((id: any) => {
    const res = getCartDetails( id )
    res.then(result => {
      setCartItems(result);
    }).catch( error =>
      console.log(error)
    )
  },[setCartItems])

  const insertCartItems = (id: string, itemId: string) => {
    insertIntoCart( id, itemId )
    .then(result => {
      setCartItems(result);
    }).catch( error =>
      console.log(error)
    )
  }

  const removeCartItems = (id: string, itemId: string) => {
    removeFromCart( id, itemId )
    .then(result => {
      setCartItems(result);
    }).catch( error =>
      console.log(error)
    )
  }

  useEffect(() => {
    if (loginUser && Object.keys(loginUser).length > 0){
      getCartItems(loginUser._id);
    }
  }, [loginUser, getCartItems])

  return (
    <CartContext.Provider
      value={{
        state,
        getCartItems,
        insertCartItems,
        removeCartItems
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
const insertIntoCart = (id: string, itemId: string ) => 
  fetch(`http://localhost:8000/product/addToCart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "localhost, 0.0.0.0/0",
      "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    },
    body: JSON.stringify({userId: id, itemId: itemId}),
  }).then(result => result.json())
  .catch(error => error)

const getCartDetails = (id: string ) => 
fetch(`http://localhost:8000/cart/${id}`)
.then((response) => response.json())
.then(result => result)
.catch(error =>  error )

const removeFromCart = (id: string, itemId: string ) => 
  fetch(`http://localhost:8000/product/removeFromCart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    },
    body: JSON.stringify({userId: id, itemId: itemId}),
  }).then(result => result.json())
  .catch(error => error)
