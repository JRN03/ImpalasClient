import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Shop, Login, RegisterVehicle, RegisterVendor,
   VehicleView, VendorView, AddShow, EditShow, AddItem } from './components/exports';
//service_393zopg
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/shop' element = {<Shop/>} />
          <Route path = '/admin' element = {<Login/>} />
          <Route path = '/register-vehicle' element = {<RegisterVehicle/>} />
          <Route path = '/register-vendor' element = {<RegisterVendor/>} />
          <Route path = '/admin/request/vehicles/:id' element = {<VehicleView/>} />
          <Route path = '/admin/request/vendors/:id' element = {<VendorView/>} />
          <Route path = '/admin/shows/add' element = {<AddShow/>} />
          <Route path = '/admin/shows/edit/:id' element = {<EditShow/>} />
          <Route path = '/admin/items/add' element = {<AddItem/>} />
      </Routes>
    </Router>
  )
}

export default App