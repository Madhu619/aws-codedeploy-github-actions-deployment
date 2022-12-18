import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/userContext';
import withProtectedAuth from '../HOC/withProtectAuth';
import { CardsList } from '../utils/types';
import Cards from './Cards';

const Cart : React.FC= () => {
  const [products, setProducts] = useState<CardsList[]>([]);
  const [isError, setIsError] = useState(false);
  const {state: {loginUser}} = useContext(AuthContext);
  
  // This method fetches the products from the database.
  useEffect(() => {
    async function getproducts() {
      if (!loginUser._id) {
        return null
      }
      const response = await fetch(`http://localhost:8000/cart/products/${loginUser._id}`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        console.log(message);
        setIsError(true);
        return;
      }

      const products = await response.json();
      setProducts(products);
    }

    getproducts();

    return; 
  }, [loginUser]);

  if (isError) {
    return (
      <div className='products-wrapper'>
        No Product found. Please return to <a href="/"> Home </a> page.
      </div>
    )
  }
  
  return (
    <div className='products-wrapper'>
      <Cards cards={products} />
    </div>
  )
}
export default withProtectedAuth(Cart);