import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';
import { AuthContext } from '../contexts/userContext';
import logo from '../utils/icons/logo.jpeg'
import LoginForm from '../components/LoginForm';

const NavBar: React.FC = () => {
  const [click, setClick] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const onHideLoginForm = () => {
    setLoginFormOpen(!loginFormOpen)
  }
  const {state: { isLoggedIn, loginUser}, logout} = useContext(AuthContext);
  const { state: {cartDetails} } = useContext(CartContext);
  const onLogout = (e: any) => {
    onHideLoginForm()
    e.preventDefault()
    logout();
  }
  useEffect(() => {
    setCartItems(cartDetails.items.length)
    return; 
  }, [loginUser, cartDetails]);
  return (
    <div className='navbar-wrapper'>
     <div className={click ? "main-container" : "container"}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink  to="/" className="nav-logo">
              <img src={logo} alt="Divine Logo" />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                            isActive ? 'nav-links active' : 'nav-links'
                          }
                onClick={click ? handleClick : undefined}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                            isActive ? 'nav-links active' : 'nav-links'
                          }
                onClick={click ? handleClick : undefined}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                            isActive ? 'nav-links active' : 'nav-links'
                          }
                onClick={click ? handleClick : undefined}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                            isActive ? 'nav-links active' : 'nav-links'
                          }
               onClick={click ? handleClick : undefined}
              >
                Contact Us
              </NavLink>
            </li>
            { !isLoggedIn &&  
              <li className="nav-item" onClick={() => onHideLoginForm()}>
                <span className='nav-links login-button'> login </span>
              </li> 
            }
            { isLoggedIn && 
              <li className="nav-item" onClick={(e) => onLogout(e)}>
                <span className='nav-links login-button'> logout </span>
              </li>
            }
            { isLoggedIn && 
              <li className="nav-item" >
                <NavLink
                to={`/cart/${loginUser._id}`}
                style={{position: 'relative'}}
                className={({ isActive }) =>
                            isActive ? 'nav-links active' : 'nav-links'
                          }
               onClick={click ? handleClick : undefined}
              > <i className='fa fa-shopping-cart' style={{fontSize: '24px'}}></i> <span className='cart-items'>{cartItems}</span> </NavLink>
              </li>
            }
          </ul>
          {/* <li className="nav-item" >
            <UserAccountMenu />
          </li> */}
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
      <LoginForm loginFormOpen={loginFormOpen} onHideLoginForm={onHideLoginForm} />
    </ div>
  );
}

export default NavBar;