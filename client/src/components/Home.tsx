import React, { Suspense, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { CardsList, PagesList } from '../utils/types';
import Cards from './Cards';

const Home: React.FC= () => {
  const [categories, setCategories] = useState([]);

  // This method fetches the categories from the database.
  useEffect(() => {
    async function getcategories() {
      const response = await fetch(`http://localhost:8000/products/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const categories = await response.json();
      setCategories(categories);
    }

    getcategories();
  },[]);

  // This method will delete a record
  // async function deleteRecord(id) {
  //   await fetch(`http://localhost:8000/${id}`, {
  //     method: "DELETE"
  //   });

  //   const newcategories = categories.filter((el) => el._id !== id);
  //   setcategories(newcategories);
  // }


  const CardsPage: React.FC = () => {
    const sarees: CardsList[] = categories;
    return <Cards cards={sarees} page={PagesList.CATEGORY}/>
  }

  return (
    <div className='main-app'>
      <Suspense fallback={<Spinner />}>
        <CardsPage  />
      </Suspense>
    </div>
  )
}
export default Home;