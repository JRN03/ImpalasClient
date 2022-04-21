import { useState,useEffect } from 'react';
import Header from '../../assets/2022.png';
import Navbar from "../Navbar";
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';

const VendorRegistration = ({form}) => {
  
  const [shows, setShows] = useState([]);
  const token = localStorage.getItem("token");
  const [loaded, setLoaded] = useState(false);
  const [rejection,setRejection] = useState(false);
  const [rejectMessage, setMessage] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/shows")
    .then(res => {
      setShows(res.data);
      setLoaded(true);
    }, rej => {console.log(rej)});
  },[]);

  const accept = () => {
    axios.post("http://localhost:5000/admin/requests/vendors/accepted", {id:form._id},{
      headers: {
        "auth-token": token
      }
    }).then(res => console.log("Success"), rej => console.log(rej));
  }
  const reject = (e) => {
    axios.post("http://localhost:5000/admin/requests/vehicles/denied", {id:form._id,message:rejectMessage},{
      headers: {
        "auth-token": token
      }
    }).then(res => console.log("Success"), rej => console.log(rej));
  }
  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }
  const cancel = (e) => {
    e.preventDefault();
    setRejection(false);
  }
  if(!loaded) return <CarLoad/>
  return (
    <form encType="multipart/form-data" className = "form-page">
      <Navbar/>
      <fieldset disabled='disabled'>
      <div className = 'form-section header'>
          <img alt="" src={Header}/>
          <h1>Upcoming Events</h1>
          {shows.map(show => 
            <div className = 'show'> {/*Put in for loop to fetch all shows from DB*/}
              <input name = 'show' type = "radio" value = {show.description} checked={form.show === show.description ? "checked" : "" } required/>
              <label htmlFor='show'>{show.description}</label>
            </div>
          )}
          <div className = 'disclaimer'>
            Absolutely no refunds or sharing booths
          </div>
      </div>
      <div className='form-section'>
          <h1>Vendor Information</h1>
          <h2>Company Details</h2>
          <div className='input-row'>
            <input type = 'text' placeholder = 'Company Name' value = {form.name} name = 'name' autoComplete = 'off' required/>
            <input type = 'text' placeholder = 'Company Person' value = {form.person} name = 'person' autoComplete = 'off' required/>
          </div>
          <div className='input-row'>
            <input type = 'email' placeholder = 'Company Email' value = {form.email} name = 'email' autoComplete = 'off' required/>
            <input type = 'tel' placeholder = 'Company Number' value = {form.phone} name = 'phone' autoComplete = 'off' required/>
          </div>
          <div className='input-row'>
            <input className = 'lg left' type = 'text' placeholder='Social Media Info' value = {form.social} name = 'social' autoComplete='off'/>
          </div>
          <h2>Company Questions</h2>
          <input className='lg' type='text' placeholder='What does your company do/sell?' value = {form.product} name = 'product' required/>
      </div>
      <div className='form-section'>
          <h1>Booth Information</h1>
          <h2>Pricing</h2>
          <div className='input-row'>
            <div className='entry'>
              <input name = 'booth' type = 'radio' value = "sm-booth" checked={form.booth === "sm-booth" ? "checked" :  ""} required/>
              <label htmlFor = "booth">$300 Per 10`x10` Space</label>
            </div>
            <div className='entry'>
              <input name = 'booth' type = 'radio' value = "med-booth" checked={form.booth === "med-booth" ? "checked" :  ""} />
              <label htmlFor = "booth">$500 Per 10`x20` Space</label>
            </div>
          </div>
          <div className='input-row'>
            <div className='entry'>
              <input name = 'booth' type = 'radio' value = "foodTruck" checked={form.booth === "foodTruck" ? "checked" :  ""}/>
              <label htmlFor = "booth">$750 Per Food Truck, Cart, or Trailer</label>
            </div>
          </div>
          <div className='input-row close'>
            <input className='sm' type = 'number' min = '0' value = {form.quantity} name = 'quantity' placeholder='Quantity' required/>
            <input className='sm' type = 'text' value = {form.cost} placeholder = 'Total' name = 'cost' readOnly required/>
          </div>
      </div>
      <div className='form-section'>
          <h1>Vendor Notice</h1>
          <h3>Set Up: All vendors must be set up by 10:30am on the day of the show</h3>
          <p>If your company is approved, you will be sent an invoice and terms and conditions regarding the event. All discounts will be reflected on invoice.</p>
      </div>
      </fieldset>
      {rejection ? (<div className='form-section'>
          <h1>Reason For Rejection</h1>
          <input onChange = {handleChange} className = "lg" type = "text" name = "reason" placeholder='Reason for rejection' required/>
          <div className='actions'>
            <button onClick = {reject} className='accept'>Submit</button>
            <button onClick = {cancel} className='reject'>Cancel</button>
          </div>
      </div>): (
        <div className='actions'>
          <button onClick = {accept} className='accept'>Accept</button>
          <button onClick = {() => {setRejection(true)}} className='reject'>Reject</button>
        </div>
      )}
    </form>
  )
}

export default VendorRegistration