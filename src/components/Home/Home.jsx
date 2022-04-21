import {useState} from 'react';
import { Navbar } from '../exports';
import { Link } from 'react-router-dom';
import Event from '../../assets/Event.png';
import Event2 from "../../assets/Event2.png";
import left from "../../assets/leftbutton.png";
import right from "../../assets/rightbutton.png";
import instagram from '../../assets/instagram.png';
import fb from '../../assets/facebook.png';

const Home = () => {

  const [frame, setFrame] = useState(0);
  const images = [Event,Event2];

  const frameUp = () => {
    frame === images.length - 1 ? setFrame(0) : setFrame(frame+1);
  }
  const frameDown = () => {
    frame === 0 ? setFrame(images.length - 1) : setFrame(frame-1);
  }

  return (
    <div className='home'>
      <Navbar/>
      <div className = "main">
        <a className = "gallery-link" href = "#gallery"><p>Visit Our Gallery</p></a>
        <div className = "img-container">
            <img src={images[frame]} alt=""/>
            <div className = "carousel-controls">
              <div className = "carousel-obj">
                <a href="https://www.instagram.com/impalasmagazine/?hl=en"><img src = {instagram} alt = ""/></a>
                <a href="https://www.facebook.com/ImpalasMag"><img src = {fb} alt = ""/></a>
              </div>
              <div className = "carousel-obj"> 
                <img onClick = {frameDown} src={left} alt=""/> 
                <img onClick = {frameUp} src={right} alt=""/> 
              </div>
            </div>
        </div>
        <div className = "details">
            <h3>Upcoming Events</h3>
            <h1>The Best of the West Lowrider Tour</h1>
            <h3>Join us on July 17th at Cow Palace Arena.</h3>
            <h3>2600 Geneva Avenue, Daly City</h3>
            <h3>CA, 94014</h3>
            <div className = "buttons">
              <Link className = "link" to="/register-vehicle">Register</Link>
              <Link className = "link" to="/register-vendor">Vendors</Link>
            </div>
        </div>
      </div>
      <div id="gallery">
          
      </div>
    </div>
  )
}

export default Home