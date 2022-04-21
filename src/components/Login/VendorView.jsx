import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompleteVendorForm from "../Forms/CompleteVendorForm"
const VendorView = () => {

  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');

  axios.get(`http://localhost:5000/admin/requests/vendors/${id}`,{
      headers: {
        "auth-token": token
      }
    }).then(res =>{
      setData(res.data);
    },rej => {
      console.log(rej);
    });

  return (
    <div>
      <CompleteVendorForm form={data}/>
    </div>
  )
}

export default VendorView