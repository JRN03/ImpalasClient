import { useState } from 'react';
import CarLoad from '../Animations/CarLoad.jsx';
import Row from "../Login/Row.jsx";
import ShowRow from "../Login/ShowRow.jsx";
import { Link } from "react-router-dom";
import axios from 'axios';
const Show = ({requests}) => {

  const [shows,setShows] = useState(requests.data.shows);
  const [loaded, setLoaded] = useState(true);

  const handleDelete = (show) => {
    
    setLoaded(false);
    axios.post(`http://localhost:5000/admin/shows/${show._id}`,{},{
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    }).then(res =>{
      setShows(shows.filter(s => (
        s._id !== show._id
      )));
      setLoaded(true);
    },rej => {
      setLoaded(true);
      alert("Event could not be deleted. Please try again");
    });
  }
  if(!loaded) return <CarLoad/>
  return (
    <div className='dash-container'>
        <div className='dashboard'>
          <div className = "show-options">
            <Link to='/admin/shows/add' id = "addShow">Add Show</Link> 
          </div>
          <Row c1="Event" c2="Date" c3="Location" c4="Edit"/>
          {shows.map(show => (
            <ShowRow handleDelete = {handleDelete} setLoaded={setLoaded} show={show}/>
          ))}
        </div>
    </div>
  )
}

export default Show