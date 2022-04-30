import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import cart from "../assets/cart.png";

const Navbar = () => {
  return (
    <div className = "navbar">
        <img className = "logo" src = {Logo} alt=""/>
        <div className = "nav-link-container">
          <Link className = "nav-link" to="/">Home</Link>
          <Link className = "nav-link" to="/shop">Shop</Link>
          <Link className = "nav-link" to="/admin">Admin</Link>
          <Link className = "nav-link" to="/about">About</Link>
          <Link className = "nav-link cart" to="/checkout"><img src={cart} alt=""/></Link>
        </div>
    </div>
  )
}

export default Navbar