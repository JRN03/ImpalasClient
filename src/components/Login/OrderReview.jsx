import { useState } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CarLoad from "../Animations/CarLoad";
import { toast } from 'react-toastify';

const OrderReview = () => {

  const { id } = useParams();
  const [ order, setOrder ] = useState();
  const [link, setLink] = useState("");
  const [service, setService] = useState("");
  const getOrder = async () => {
    const body = await axios.get(`http://localhost:5000/admin/orders/${id}`,{
        headers:{
            "auth-token": localStorage.getItem("token")
        }
    });
    setOrder(body.data);
  };

  const changeLink = (e) => {
      e.preventDefault();
      setLink(e.target.value);
  }

  const changeService = (e) => {
      e.preventDefault();
      setService(e.target.value);
  }
  const handleSubmit = async (e) => {
    const body = await axios.post(`http://localhost:5000/admin/orders`, {link:link,id:id,service:service}, {
        headers: {
            "auth-token": localStorage.getItem("token")
        }
    });
    toast("Order has been updated.", {
        type: "success",
        position: toast.POSITION.TOP_LEFT
    });
  }

  if(!order) getOrder();
  if(!order) return <CarLoad/>
  return (
    <div className='form-page'>
        <Navbar/>
        <fieldset className='order form-section' disabled>
            <h1>Order Details</h1>
            <div>
                <label htmlFor='name'>Name: </label>
                <input type="text" value = {order ? order.recipient : ""} />
            </div>
            <div>
                <label htmlFor='email'>Email: </label>
                <input type="text" value = {order ? order.email : ""} />
            </div>
            <div className='address'>
                <label htmlFor='address'>Address: </label>
                <input type="text" value = {order.address}/>
            </div>
            <div>
                <label htmlFor='city'>City: </label>
                <input type="text" value = {order.city}/>
            </div>
            <div>
                <label htmlFor='state'>State: </label>
                <input type="text" value={order.state} />
            </div>
            <div>
                <label htmlFor='zip'>Zip: </label>
                <input type="text" value = {order.zip} />
            </div>
            <div>
                <label htmlFor='total'>Total: </label>
                <input type="text" value = {`$ ${order.total}`}/>
            </div>
            <div className='order-items-container'>
                <h1>Cart</h1>
                <div className='order-items-labels'>
                    <h2>Item</h2>
                    <h2>Quantity</h2>
                </div>
                <div className='order-items'>
                    {Object.keys(order.items).map( (keyName, i) => (
                        <div className='order-item-row'>
                            <h3>{keyName}</h3>
                            <h3>{order.items[keyName]}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </fieldset>
        <form onSubmit = {handleSubmit} className='submit-order form-section'>
            <h1>Tracking Number</h1>
            <h3>Provide the tracking information for this order below. Once the form is submitted, the tracking number will be emailed to the user.</h3>
            <input onChange = {changeLink} className = "tracking" type="text" placeholder="Tracking Number" required/>
            <input onChange = {changeService} className = "tracking" type="text" placeholder="Shipping Service (e.g UPS, USPS, etc)." required/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default OrderReview