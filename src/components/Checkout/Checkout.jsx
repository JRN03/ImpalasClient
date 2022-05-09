import React from 'react';
import Navbar from "../Navbar";
import Row from "./Row";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { toast }  from "react-toastify";

toast.configure();

const Checkout = ({cart, items, handleRemove}) => {

  const findItem = (id) => {
    let item;
    items.forEach(i => {
      if(i._id === id) item = i;
    });
    return item;
  }

  let price = 0;
  const getTotal = () => {
    Object.keys(cart).map((keyName, i) => {
      price += findItem(keyName).price * cart[keyName];
    });
  }
  getTotal();

  const handleToken = async (token, addresses) => {
    let tempItems = {};
    Object.keys(cart).map((keyName, i) => {
      tempItems[findItem(keyName).title] = cart[keyName];
    });

    const response = await axios.post("http://localhost:5000/checkout", {
      token,
      price,
      tempItems
    });
    const status = response.data;
    if(status === "success"){
      toast("Order has been received. You will be sent a tracking number once the order is processed.", { type: "success" });
    }else {
      toast("Order was not processed. Please try again.", { type: "error" });
    }
  }

  return (
    <div className='checkout'>
      <Navbar/>
      <div className='main'>
        <div>
          <h1>Checkout</h1>
          <Row className = "row labels" item="Item" quantity="Quantity" cost = "Cost"/>
          <hr/>
          {Object.keys(cart).map((keyName, i) => (
            cart[keyName] > 0 && <div key={i}>
              <Row handleRemove = {handleRemove} id = {keyName} item = {findItem(keyName).title} quantity = {cart[keyName]} cost = {`$ ${findItem(keyName).price*cart[keyName]}`}/>
            </div>
          ))}
        </div>
        <div className='checkout-controls'>
            <h2>Total: $ {price}</h2>
            <StripeCheckout
              stripeKey='pk_live_51Kt7tlBUdDJl779XVZsjao5vPcjheUHbXuX2k2yEhsRMhZYVXqxDiiiV0rH6SCsXy4lfu4G6UsqUkkMrNDa9byyT00GUYxpcAn'
              token={handleToken}
              billingAddress
              shippingAddress
              amount = {price*100}
            />
        </div>
      </div>
    </div>
  )
}

export default Checkout