import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import paymentImage from '../utils/icons/payment.jpeg';
import dummyData from '../utils/data.json';
import getPrice from "../utils/priceHelper";
import { CardsList } from "../utils/types";
import comingSoonBanner from '../utils/icons/coming-soon.jpeg';

const BuyNow: React.FC = () => {
  const {id} = useParams<string>();
  const [currentData]: Array<CardsList> = dummyData.products.filter(item => item.id === id)
  const {name, image, price, description, discount} = currentData;
  const [productImage, setProductImage] = useState(comingSoonBanner)
  const loadImage = (imageName: string) => {
    import(`../utils/images/${imageName}.jpg`).then(image => {
      setProductImage(image.default)
    });
  };
  useEffect(() => {
    loadImage(image);
  },[image])
  return (
    <Container fluid className="buy-now">
      <Row className="blink-text">
      </Row>
      <Row className="blink-text"> <h1> Please verify your order details and make payment below </h1></Row>
      <Row>
        <p><strong>Note: </strong> After making payment, please share payment details and postal address to WhatsApp number. <b>9591734665</b> </p>
      </Row>
      <Row>
        <Col md={4} className='product-image'>
          <img width='100%' src={productImage} alt={`${name}`}/>
        </Col>
        <Col md={4} className='product-details'>
          <div className="product-name"><strong> {name}</strong></div>
          <div className="product-price"> <span className="price bold"> {getPrice(price, discount)} </span>
          </div>
          <div className="product-desc"> {description} </div>
        </Col>
        <Col md={4} className="product-image mt-4 mb-5">
          <img className="mt-4 mb-4" width="100%" src={paymentImage} alt=" Payment QR" />
          <p>OR</p>
          <div> Make payment to this UPI : nirmalaa10@axl</div>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4">
          <p> Once the payment is done, Click Below link to update status</p>
          <a target='_bank' aria-label="Chat on WhatsApp" href="https://wa.me/6364981515"> Click Here! </a>
        </Col>
      </Row>
    </Container>
  )
}

export default BuyNow;