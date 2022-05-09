import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import cart from "../assets/cart.png";
import hamburger from "../assets/menu.png";

const Navbar = () => {
  return (
    <div className = "navbar">
        <img className = "logo" src = {Logo} alt=""/>
        <input type="checkbox" id='toggle'/>
        <label htmlFor='toggle'><img src={hamburger} className="hamburger"/></label>
        <div className = "nav-link-container">
          <Link className = "nav-link" to="/">Home</Link>
          <Link className = "nav-link" to="/shop">Shop</Link>
          <Link className = "nav-link" to="/about">About</Link>
          <Link className = "nav-link cart" to="/checkout"><img src={cart} alt=""/></Link>
          <Link className = "nav-link checkout-link" to="/checkout">Checkout</Link>
        </div>
    </div>
  )
}

export default Navbar