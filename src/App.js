import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import { Home, Shop, Login, RegisterVehicle, RegisterVendor,
   VehicleView, VendorView, AddShow, EditShow, AddItem, Checkout,
  RegisterModel,About, CheckoutReview, Invoice } from './components/exports';
//service_393zopg
const App = () => {

  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);

  const deleteItem = (id) => {
    setCart({...cart, [id]:0});
  };

  return (
    <Router>
      <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/shop' element = {<Shop cart = {cart} items = {items} setItems = {setItems} setCart={setCart}/>} />
          <Route path = '/admin' element = {<Login/>} />
          <Route path = '/about' element = {<About/>} />
          <Route path = '/register-vehicle' element = {<RegisterVehicle/>} />
          <Route path = '/register-vendor' element = {<RegisterVendor/>} />
          <Route path = '/register-model' element = {<RegisterModel/>} />
          <Route path = '/admin/request/vehicles/:id' element = {<VehicleView/>} />
          <Route path = '/admin/request/vendors/:id' element = {<VendorView/>} />
          <Route path = '/admin/shows/add' element = {<AddShow/>} />
          <Route path = '/admin/shows/edit/:id' element = {<EditShow/>} />
          <Route path = '/admin/items/add' element = {<AddItem/>} />
          <Route path = '/checkout' element = {<Checkout cart = {cart} items = {items} handleRemove = {deleteItem} />} />
          <Route path = "/admin/request/orders/:id" element = {<CheckoutReview/>}/>
          <Route path = "/payments/:id" element = {<Invoice/>}/>
      </Routes>
    </Router>
  )
}

export default App