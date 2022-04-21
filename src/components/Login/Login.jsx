import { useState,useEffect } from 'react'
import axios from 'axios';
import AdminPage from './AdminPage';
import Navbar from '../Navbar';
import CarLoad from '../Animations/CarLoad';

const Login = () => {

  const [form, setForm] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [auth, setAuth] = useState(false);
  const [requests, setRequests] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post("http://localhost:5000/admin/login",{username:form.username,password:form.password})
      .then(res => {
        setToken(res.data.token)
        localStorage.setItem('token',res.data.token);
      }, rej => {
        alert("Invalid Credentials");
        setLoading(false);
      });
  }
  
  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  useEffect(() => {
    if(token) setLoading(true);
    axios.get("http://localhost:5000/admin/requests",{
      headers: {
        "auth-token": token
      }
    }).then(res =>{
      setRequests(res);
      setAuth(true);
      setLoading(false);
    },rej => {
      setAuth(false);
      setLoading(false);
    });
  },[token, setToken])

  if(loading) return <CarLoad/>
  if(auth) return <AdminPage requests={requests}/>
  return (
    <div className = "admin-login">
      <Navbar/>
      <form className='admin-login-form' onSubmit = {handleSubmit}>
        <h1>Welcome Back</h1>
        <div className='inputs'>
          <input onChange = {handleChange} name = 'username' type="text" placeholder='Username' required/>
          <input onChange = {handleChange} name = 'password' type="password" placeholder='Password' required/>
        </div>
        <button className='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login