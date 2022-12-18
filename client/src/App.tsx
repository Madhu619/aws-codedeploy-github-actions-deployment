import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import NavBar from './NavbarComponents/Navbar';
import  { Routes, Route} from 'react-router-dom';
import Footer from './Footer/Footer';
import GenericNotFound from './components/GenericNotFound';
import BuyNow from './components/BuyNow';
import About from './NavbarComponents/About';
import Blog from './NavbarComponents/Blog';
import Contact from './NavbarComponents/Contact';
import Home from './components/Home';

import Products from './components/Products';
import Product from './components/Product';

import PrivacyPolicy from './Footer/PrivacyPolicy';
import ReturnsAndRefund from './Footer/ReturnsAndRefunds';
import Shipping from './Footer/Shipping';
import TermsAndConditions from './Footer/TermsConditions';
import Signup from './NavbarComponents/Signup';
import Cart from './components/Cart';
import Login from './components/Login';

const RouterOptions = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path={`/category/:id&:name`} element={<Products /> } />
      <Route path={`/category/product/:id&:name`} element={<Product /> } />
      <Route path={`/buynow/:id`} element={<BuyNow /> } />
      <Route path={`/privacy`} element={<PrivacyPolicy /> } />
      <Route path={`/return`} element={<ReturnsAndRefund /> } />
      <Route path={`/shipping`} element={<Shipping /> } />
      <Route path={`/terms`} element={<TermsAndConditions /> } />
      <Route path={`/signup`} element={<Signup /> } />
      <Route path={`/login`} element={<Login /> } />
      <Route path={`/cart/:id`} element={<Cart /> } />
      <Route path='*' element={<GenericNotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <div className="App">
      <NavBar />
    <div className="pages-wrapper">
      <RouterOptions></RouterOptions>
    </div>
      <Footer />
    </div>
  );
}

export default App;
