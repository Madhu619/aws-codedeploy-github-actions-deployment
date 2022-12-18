import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardsList } from '../utils/types';
import comingSoonBanner from '../utils/icons/coming-soon.jpeg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import getPrice from '../utils/priceHelper';
import { AuthContext } from '../contexts/userContext';
import { CartContext } from '../contexts/cartContext';
import Payments from './Payments/Payments';

const Product : React.FC= () => {
  const {id} = useParams<string>();
  const [productImage, setProductImage] = useState(comingSoonBanner);
  const [product, setProduct] = useState<CardsList>();
  const navigate = useNavigate();
  const loadImage = () => {
    if ( product?.image ) {
      import(`../utils/images/${product?.image}.jpg`).then(image => {
        setProductImage(image.default)
      });
    }
  };
  const {state: {loginUser: {_id}}} = useContext(AuthContext);
  const {state: {cartDetails}, insertCartItems, removeCartItems} = useContext(CartContext);
  const [alreadyInCart, checkAlreadyInCart] = useState(cartDetails.items.filter((item: any )=> item === id).length);
  useEffect(() => {
    async function getproducts() {
      const response = await fetch(`http://localhost:8000/category/product/${id}`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const products = await response.json();
      setProduct(products);
    }
    getproducts();
    return; 
  },[id])

  useEffect(() => {
    checkAlreadyInCart(cartDetails.items.filter((item: any )=> item === id).length)
  }, [cartDetails, id])

  const addToCart = () => {
    if (!_id) {
      navigate("/login");
    } else {
      insertCartItems(_id, product?.id)
    }
  }

  const removeFromCart = () => {
    if (!_id) {
      navigate("/login");
    } else {
      removeCartItems(_id, product?.id)
    }
  }

if (!product) {
  return null
}
  loadImage();
  return (
    <Suspense fallback={"... Loading"} >
      <Container className='product-wrapper' fluid>
        <Row>
          <Col sm={4} className='product-image'>
            <img width='100%' src={productImage} alt={`${product.name}`}/>
          </Col>
          <Col sm={4} className='product-details'>
            <div className="product-name"><strong> {product.name}</strong></div>
            <div className="product-price"> <span className="price bold"> {getPrice(product.price, product.discount)} </span>
            </div>
            <div className="product-desc"> {product.description} </div>
          </Col>
          <Col sm={4} className='product-actions'>
            { !alreadyInCart ?
              <Button className='btn btn-primary' onClick={() => {
                addToCart()
              }} > Add to Cart </Button> :

              <Button className='btn btn-danger' onClick={() => {
                removeFromCart()
              }} > Remove from Cart </Button>
            }
            <Payments product={product} userId={_id} />
          </Col>
        </Row>
      </Container>
    </Suspense>
  )
}
export default Product;