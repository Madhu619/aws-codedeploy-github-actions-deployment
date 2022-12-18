import { CardsList, PagesList } from "../utils/types"

import comingSoonBanner from '../utils/icons/coming-soon.jpeg'
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import getPrice from "../utils/priceHelper";

interface iCard {
  card: CardsList;
  currentPage?: PagesList;
}
const Card: React.FC<iCard> = ({card, currentPage}) => {
  const {id, name, price, description, image, discount, category} = card;
  const productUrl = category ? `/category/product/` : `/category/`
  const [productImage, setProductImage] = useState(comingSoonBanner)
  const loadImage = (imageName: string) => {
    if (imageName !== 'false') {
      import(`../utils/images/${imageName}.jpg`).then(image => {
        setProductImage(image.default)
      });
    }
  };

  function Card (): React.ReactElement {
    return (
      <Fragment>
        <div className="card-image">
          <img src={productImage} alt={`${name}`}/>
        </div>
        <div className="card-name">
          <strong> {name}</strong>
        </div>
        <div className="card-price"> 
          <span className="price"> {getPrice(price, discount)} </span> {currentPage === PagesList.CATEGORY &&<span> Onwards </span> }
        </div>
        <div className="card-desc"> 
          <strong> Description: </strong>{description}
        </div>
      </Fragment>
    )
  }
  useEffect(() => {
    loadImage(image);
  },[image])

  return (
    <Link to={`${productUrl}${id}&name=${name.replaceAll(' ', '-')}`} className='text-style card'>
      <Card />
    </Link>
  )
}

export default Card