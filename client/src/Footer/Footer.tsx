import React from "react";
import { Col, Row } from "react-bootstrap";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Row >
        <Col className="footer-elements" sm={{ span: 3, offset: 1 }} offset>
          <span><a className="text-style" href="/privacy"> <i className="fa fa-user-secret"> Privacy Policy </i> </a></span>
          <span><a className="text-style" href="/return"> <i className="fa fa-retweet"> Return Policy </i></a></span>
          <span><a className="text-style" href="/shipping"> <i className="fa fa-truck"> Shipping </i></a></span>
          <span><a className="text-style" href="/terms"> <i className="fa fa-gavel"> Terms & Conditions </i></a></span>
        </Col>
        <Col className="footer-elements" sm={{ span: 3, offset: 1 }} offset>
          <span> <span className="text-style no-margin"> <i className="fa fa-briefcase"> Career </i></span></span>
          <span><a className="text-style" href="/about">  <i className="fa fa-users"> Management </i> </a></span>
          <span> <span className="text-style no-margin"> <i className="fa fa-question"> FAQ </i> </span></span>
          <span> <span className="text-style no-margin"> <i className="fa fa-ticket"> Offers </i></span></span>
        </Col>
        <Col className="footer-elements" sm={{ span: 3, offset: 1 }} offset>
          <span> <span className="text-style no-margin"> <i className="fa fa-facebook"> Facebook </i> </span></span>
          <span> <span className="text-style no-margin"> <i className="fa fa-linkedin"> LinkedIn </i> </span></span>
          <span> <span className="text-style no-margin">  <i className="fa fa-instagram"> Instagram </i> </span></span>
          {/* <span> <span className="text-style no-margin">  <i className="fa fa-twitter"> Twitter </i> </span></span> */}
          <span> <span className="text-style no-margin">  <i className="fa fa-youtube"> YouTube </i> </span></span>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer;