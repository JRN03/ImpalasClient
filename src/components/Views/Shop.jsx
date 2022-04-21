import { useState } from 'react'
import { Link } from 'react-router-dom';
import Row from '../Login/Row.jsx';
import ItemRow from "../Login/ItemRow.jsx";
import CarLoad from "../Animations/CarLoad";
import axios from 'axios';

const Shop = ({requests}) => {

  const [items, setItems] = useState(requests.data.items);
  const [loaded,setLoaded] = useState(true);

  const handleDelete = (item) => {
    setLoaded(false);
    axios.delete(`http://localhost:5000/admin/shop`, {
      headers: {
        'auth-token':localStorage.getItem('token')
      },
      data: {id:item._id}})
    .then(res => {
      setLoaded(true);
      setItems(items.filter(i => i._id !== item._id));
    }, rej => setLoaded(true));
  }

  if(!loaded) return <CarLoad/>
  return (
    <div className='dash-container'>
      <div className='dashboard'>
          <div className = "show-options">
            <Link to='/admin/items/add' id = "addShow">Add Item</Link> 
          </div>
          <Row c1="Name" c2="Price" c3="ID" c4="Edit"/>
          {items.map(item => (
            <ItemRow handleDelete = {handleDelete} setLoaded={setLoaded} item={item}/>
          ))}
      </div>
    </div>
  )
}

export default Shop