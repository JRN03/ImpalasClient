import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from "../Navbar";
import CarLoad from '../Animations/CarLoad';

const EditShow = () => {

  const { id } = useParams();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/shows/${id}`, {
        headers: {
            'auth-token': localStorage.getItem("token")
        }
    })
    .then(res => {
        setForm(res.data[0]);
        setLoading(false);
    }, err => {setLoading(false)})
  },[id]);

  const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      axios.post(`http://localhost:5000/admin/shows/edit/${id}`, form, {
          headers: {
              'auth-token':localStorage.getItem("token")
          }
      })
      .then(res => setLoading(false), err => console.log(err));
  }

  const handleChange = (e) => {
      e.preventDefault();
      setForm({...form,[e.target.name]:e.target.value});
  }
  if(loading) return <CarLoad/>
  return (
    <form onSubmit = {handleSubmit} className='form-page add-shows'>
    <Navbar/>
    <div className='form-section'>
      <h1>Edit Event</h1>
      <h2>Event Details</h2>
      <div className='input-row'>
        <input onChange = {handleChange} defaultValue={form.name} type = 'text' name = "name" placeholder='Event Name' required/>
        <input onChange = {handleChange} defaultValue={form.location} type = 'text' name = "location" placeholder='Event Location' required/>
      </div>
      <div className='input-row'>
        <input onChange = {handleChange} defaultValue = {form.date} type = 'text' name = "date" placeholder='Event Date' required/>
        <input onChange = {handleChange} defaultValue = {form.description} type = 'text' name = "description" placeholder='Event Description Shown on New Applications' required/>
      </div>
      <button className='add'>Confirm</button>
    </div>
  </form>
  )
}

export default EditShow