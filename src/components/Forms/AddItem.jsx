import { useState } from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';
const AddItem = () => {

  const [form, setForm] = useState({});
  const [loaded, setLoaded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoaded(false);
    const data = new FormData();

    for ( var key in form ) {
      data.append(key, form[key]);
    }

    axios.post("http://localhost:5000/admin/shop", data, {
      headers:{
        'auth-token': localStorage.getItem('token')
      }
    }).then(res => {
      setLoaded(true);
    }, err => setLoaded(true));

  }

  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.name === 'img')
      setForm({...form, [e.target.name]:e.target.files[0]});
    else
      setForm({...form,[e.target.name]:e.target.value});
  }
  if(!loaded) return <CarLoad/>
  return (
    <form onSubmit = {handleSubmit} className='form-page'>
        <Navbar/>
        <div className='form-section'>
          <h1>Add Items To Shop</h1>
          <h2>Item Details</h2>
          <div className='input-row'>
            <input onChange = {handleChange} type="text" name="title" placeholder="Name" required/>
            <input onChange = {handleChange} type = "number" name="price" placeholder="Price" required/>
          </div>
          <div className='input-row'>
            <input onChange = {handleChange} accept="image/png, image/jpeg" name="img" type="file" required/>
            <button onClick = {handleSubmit} className='add'>Add</button>
          </div>
        </div>
    </form>
  )
}

export default AddItem