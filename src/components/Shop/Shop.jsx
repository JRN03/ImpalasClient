import { useState, useEffect } from 'react';
import { Navbar } from '../exports';
import left from "../../assets/leftbutton.png";
import right from "../../assets/rightbutton.png";
import instagram from '../../assets/instagram.png';
import fb from '../../assets/facebook.png';
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';

const Shop = () => {

  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const values = [1,2,3,4,5,6,7,8,9,10];

  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/items")
    .then(res => {
      setItems(res.data);
    },err => console.log(err));
  },[items,images])

  useEffect(() => {
    items.forEach(item => {
      axios.get(`http://localhost:5000/images/${item.img}`)
        .then(res => {
          setImages([...images,res.data])
          setLoaded(true);
        }, rej => {console.log(rej)});
    })
  },[items,images])

  const frameUp = () => {
    frame === items.length - 1 ? setFrame(0) : setFrame(frame+1);
  }
  const frameDown = () => {
    frame === 0 ? setFrame(items.length - 1) : setFrame(frame-1);
  }

  if(!loaded || items.length === 0) return <CarLoad/>
  return (
    <div className='shop'>
      <Navbar/>
      <div className='main'>
        <div className='col-1'>
          <div className='carousel'>
            <img src={`data:image/png;base64,${images[frame]}`} alt=""/>
            <div className='controls'>
              <div>
                <img src={instagram} alt=""/>
                <img src={fb} alt=""/>
              </div>
              <div>
                <img src={left} onClick = {frameDown} alt=""/>
                <img src={right} onClick = {frameUp} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2'>
          <h3>Shop</h3>
          <h1>${items[frame].price}.00</h1>
          <h2>{items[frame].title}</h2>
          <div className='options'>
            <div className='select-container'>
              <select name = 'qty' className='qty'>
                {values.map(value => <option value={value}>{value}</option>)}
              </select>
            </div>
            <button className='add'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop