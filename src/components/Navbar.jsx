import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  return (
    <div className = "navbar">
        <img className = "logo" src = {Logo} alt=""/>
        <div className = "nav-link-container">
          <Link className = "nav-link" to="/">Home</Link>
          <Link className = "nav-link" to="/shop">Shop</Link>
          <Link className = "nav-link" to="/admin">Admin</Link>
        </div>
    </div>
  )
}

export default Navbar