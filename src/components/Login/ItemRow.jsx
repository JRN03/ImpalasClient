import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemRow = ({item,setLoaded, handleDelete}) => {

  return (
    <div className='request row'>
          <h2>{item.title}</h2>
          <h2>{item.price}</h2>
          <h2>{item._id}</h2>
          <div className='status-container'>
            <button onClick={() => handleDelete(item)} className="view">Delete</button>
          </div>
      </div>
  )
}

export default ItemRow