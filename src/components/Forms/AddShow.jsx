import { useState } from 'react'
import axios from 'axios'
import Navbar from "../Navbar"
const AddShow = () => {
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {

    axios.post("http://localhost:5000/admin/shows",form,{
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    .then(res => {
      alert("Event Added");
    }, rej => {});

  }
  const handleChange = (e) => {
    e.preventDefault();
    setForm({...form,[e.target.name]:e.target.value})
  }

  return (
    <form onSubmit = {handleSubmit} className='form-page add-shows'>
      <Navbar/>
      <div className='form-section'>
        <h1>Add a New Event</h1>
        <h2>Event Details</h2>
        <div className='input-row'>
          <input onChange = {handleChange} type = 'text' name = "name" placeholder='Event Name' required/>
          <input onChange = {handleChange} type = 'text' name = "location" placeholder='Event Location' required/>
        </div>
        <div className='input-row'>
          <input onChange = {handleChange} type = 'text' name = "date" placeholder='Event Date' required/>
          <input onChange = {handleChange} type = 'text' name = "description" placeholder='Event Description Shown on New Applications' required/>
        </div>
        <button className='add'>Add</button>
      </div>
    </form>
  )
}

export default AddShow