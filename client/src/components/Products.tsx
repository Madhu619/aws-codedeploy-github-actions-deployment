import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardsList } from '../utils/types';
import Cards from './Cards';

const Products : React.FC= () => {
  const {id, name} = useParams<string>();
  const [products, setProducts] = useState<CardsList[]>([]);

  // This method fetches the products from the database.
  useEffect(() => {
    async function getproducts() {
      const response = await fetch(`http://localhost:8000/category/${id}&${name}`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const products = await response.json();
      setProducts(products);
    }
    getproducts();
    return; 
  }, [id, name]);
  
  const currentData: CardsList[] = products.filter(item => item.category === id)
  return (
    <div className='products-wrapper'>
      <Cards cards={currentData} />
    </div>
  )
}
export default Products;