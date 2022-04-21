import {useState} from 'react';
import Row from "../Login/Row.jsx";
import VendorRow from '../Login/VendorRow';
import VehicleRow from '../Login/VehicleRow';

const Requests = ({requests}) => {
  const [labels,setLabels] = useState(
    {l1: "Name", l2:"Vehicle Type", l3: "Phone Number", l4:"Paid"}
  )
  const [filter, setFilter] = useState("Pending");
  const [type,setType] = useState('vehicle');

  const setVehicle = () => {
    setType("vehicle");
    setLabels({...labels,l2:"Vehicle Type",l3:"Phone Number",l4:"Paid"});
  }
  const setVendor = () => {
    setType("vendor");
    setLabels({...labels,l2:"Booth Type",l3:"Phone Number",l4:"Paid"})
  }
  const setOrder = () => {
    setType("order");
    setLabels({...labels,l2:"Address",l3:"Order Number",l4:"Status"})
  }

  const statusChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }
  const vehicles = requests.data.vehicles;
  const vendors = requests.data.vendors;
  const orders = requests.data.shows;

  return (
    <div className='dash-container'>
        <div className = "main-header">
            <h2 onClick={setVehicle} className={type === 'vehicle' ? 'active' : ""}>Vehicles</h2>
            <h2 onClick={setVendor} className={type === 'vendor' ? 'active' : ""}>Vendors</h2>
            <h2 onClick={setOrder} className={type === 'order' ? 'active' : ""}>Orders</h2>
            <select onChange = {statusChange}>
              <option value = "Pending">Pending</option>
              <option value = "Accepted">Accepted</option>
              <option value = "Denied">Denied</option>
            </select>
          </div>
        <div className='dashboard'>
          <Row c1="Name" c2={labels.l2} c3={labels.l3} c4={labels.l4}/>
          {type === "vehicle" && vehicles.filter(v => v.status === filter).map(vehicle => <VehicleRow c1={vehicle.fName + " " + vehicle.lName} c2 = {vehicle.entry} c3 = {vehicle.phone} c4 = {vehicle.paid} id = {vehicle._id} />)}
          {type === "vendor" && vendors.filter(v => v.status === filter).map(vendor => <VendorRow c1={vendor.name} c2 = {vendor.booth} c3 = {vendor.phone} c4 = {vendor.paid} id = {vendor._id}/>)}
          {type === "order" && orders.filter(o => o.status === filter).map(order => <VendorRow c1={order.name} c2 = {order.address} c3 = {order.number} c4 = {order.status} id = {order._id}/>)}
        </div>
    </div>
  )
}

export default Requests