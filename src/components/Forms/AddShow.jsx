import { useState } from 'react'
import axios from 'axios'
import Navbar from "../Navbar"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddShow = () => {
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/admin/shows",form,{
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    .then(res => {
      toast("Success. Show has been added.",{
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    }, rej => {
      toast("Error. Event could not be added. Please try again",{
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    });

  }
  const handleChange = (e) => {
    e.preventDefault();
    setForm({...form,[e.target.name]:e.target.value})
  }

  return (
    <form onSubmit = {handleSubmit} className='form-page add-shows'>
      <Navbar/>
      <ToastContainer/>
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