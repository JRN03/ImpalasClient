import { useState,useEffect } from 'react';
import Header from '../../assets/2022.png';
import Navbar from "../Navbar";
import axios from 'axios';

const VendorRegistration = () => {
  
  const [qty, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [form, setForm] = useState({});
  const [shows, setShows] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/shows")
    .then(res => {
      setShows(res.data);
    }, rej => {console.log(rej)});
  },[]);

  const handleSubmit = (e) => {
    let booth;
    switch(form.cost) {
      case 300: 
        booth = 'sm-booth';
        break;
      case 500:
        booth = 'med-booth';
        break;
      default:
        booth = "foodTruck";
        break;
    }
    axios.post("http://localhost:5000/register-vendor",{...form, booth:booth})
    .then(res => {
    }, rej => {
    })

  }
  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const changeQty = (e) => {
    setQuantity(e.target.value);
    setForm({...form,quantity:e.target.value})
  } 
  const changeCost = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
    switch(e.target.value){
      case "sm-booth":
        setForm({...form,cost:300})
        setCost(300);
        break;
      case "med-booth":
        setForm({...form,cost:500})
        setCost(500);
        break;
      default:
        setForm({...form,cost:750})
        setCost(750);
        break;
    }
  } 

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className = "form-page">
      <Navbar/>
      <div className = 'form-section header'>
          <img alt="" src={Header}/>
          <h1>Upcoming Events</h1>
          {shows.map(show => 
            <div className = 'show'> {/*Put in for loop to fetch all shows from DB*/}
              <input onChange = {handleChange} name = 'show' type = "radio" value = {show.description} required/>
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
            <input onChange = {handleChange} type = 'text' placeholder = 'Company Name' name = 'name' autoComplete = 'off' required/>
            <input onChange = {handleChange} type = 'text' placeholder = 'Company Person' name = 'person' autoComplete = 'off' required/>
          </div>
          <div className='input-row'>
            <input onChange = {handleChange} type = 'email' placeholder = 'Company Email' name = 'email' autoComplete = 'off' required/>
            <input onChange = {handleChange} type = 'tel' placeholder = 'Company Number' name = 'phone' autoComplete = 'off' required/>
          </div>
          <div className='input-row'>
            <input onChange = {handleChange} className = 'lg left' type = 'text' placeholder='Social Media Info' name = 'social' autoComplete='off'/>
          </div>
          <h2>Company Questions</h2>
          <input onChange = {handleChange} className='lg' type='text' placeholder='What does your company do/sell?' name = 'product' required/>
      </div>
      <div className='form-section'>
          <h1>Booth Information</h1>
          <h2>Pricing</h2>
          <div className='input-row'>
            <div className='entry'>
              <input onChange = {changeCost} name = 'booth' type = 'radio' value = "sm-booth" required/>
              <label htmlFor = "booth">$300 Per 10`x10` Space</label>
            </div>
            <div className='entry'>
              <input onChange = {changeCost} name = 'booth' type = 'radio' value = "med-booth" />
              <label htmlFor = "booth">$500 Per 10`x20` Space</label>
            </div>
          </div>
          <div className='input-row'>
            <div className='entry'>
              <input onChange = {changeCost} name = 'booth' type = 'radio' value = "foodTruck" />
              <label htmlFor = "booth">$750 Per Food Truck, Cart, or Trailer</label>
            </div>
          </div>
          <div className='input-row close'>
            <input onChange = {changeQty} className='sm' type = 'number' min = '0' name = 'quantity' placeholder='Quantity' required/>
            <input className='sm' type = 'text' value = {`$${cost*qty}`} placeholder = 'Total' name = 'cost' readOnly required/>
          </div>
      </div>
      <div className='form-section'>
          <h1>Vendor Notice</h1>
          <h3>Set Up: All vendors must be set up by 10:30am on the day of the show</h3>
          <p>If your company is approved, you will be sent an invoice and terms and conditions regarding the event. All discounts will be reflected on invoice.</p>
      </div>
      <button className = 'submit'>Submit</button>
    </form>
  )
}

export default VendorRegistration