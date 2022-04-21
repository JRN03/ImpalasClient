import { Link } from 'react-router-dom';
import axios from 'axios';

const ShowRow = ({show,setLoaded, handleDelete}) => {

  return (
    <div className='request row'>
          <h2>{show.name}</h2>
          <h2>{show.date}</h2>
          <h2>{show.location}</h2>
          <div className='status-container'>
            <Link to = {`/admin/shows/edit/${show._id}`} className="view">Edit</Link>
            <button onClick={() => handleDelete(show)} className="view">Delete</button>
          </div>
      </div>
  )
}

export default ShowRow