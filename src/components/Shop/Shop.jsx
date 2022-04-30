import { useState, useEffect } from 'react';
import { Navbar } from '../exports';
import left from "../../assets/leftbutton.png";
import right from "../../assets/rightbutton.png";
import instagram from '../../assets/instagram.png';
import fb from '../../assets/facebook.png';
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = ({cart, setCart, items, setItems}) => {

  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [qty, setQty] = useState(1)
  const values = [1,2,3,4,5,6,7,8,9,10];

  const [images, setImages] = useState({});

  const newQty = (e) => {
    e.preventDefault();
    setQty(e.target.value);
  }
  useEffect(() => {
    axios.get("http://localhost:5000/items")
    .then(res => {
      setItems(res.data);
    },err => console.log(err));
  },[items,images, setItems])

  useEffect(() => {
    if(images.length === items.length) return;
    items.forEach(item => {
      axios.get(`http://localhost:5000/images/${item.img}`)
        .then(res => {
          if(!images.hasOwnProperty(item._id)) setImages({...images,[item._id]:res.data})
          setLoaded(true);
        }, rej => {console.log(rej)});
    })
  },[items,images, setItems])

  const frameUp = () => {
    frame === items.length - 1 ? setFrame(0) : setFrame(frame+1);
  }
  const frameDown = () => {
    frame === 0 ? setFrame(items.length - 1) : setFrame(frame-1);
  }

  const addToCart = (e) => {
    e.preventDefault();
    if(cart.hasOwnProperty(items[frame]._id)){
      setCart({...cart,[items[frame]._id]:cart[items[frame]._id]+parseInt(qty,10)});
    }
    else {
      setCart({...cart,[items[frame]._id]:parseInt(qty,10)});
    }
    toast("Item has been added to cart", {
      position: toast.POSITION.TOP_LEFT,
      draggable: false
    });
    localStorage.setItem('cart',cart);
  };

  if(!loaded || items.length === 0) return <CarLoad/>
  return (
    <div className='shop'>
      <Navbar/>
      <ToastContainer/>
      <div className='main'>
        <div className='col-1'>
          <div className='carousel'>
            <img src={`data:image/png;base64,${images[items[frame]._id]}`} alt=""/>
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
              <select onChange = {newQty} name = 'qty' className='qty'>
                {values.map(value => <option value={value}>{value}</option>)}
              </select>
            </div>
            <button onClick = {addToCart} className='add'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop