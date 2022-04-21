import { useState } from 'react';
import Navbar from "../Navbar";
import { RequestsView, ShopsView, ShowsView } from "../Views/index.js";

const AdminPage = ({requests}) => {

  const [view, setView] = useState("requests");

  return (
    <div className='admin-page'>
        <Navbar/>
        <header className = "dash-header">
          <h1>Dashboard</h1>
          <h2 onClick = {() => {setView('requests')}} className={view === "requests" ? 'active' : ""}>Requests</h2>
          <h2 onClick = {() => {setView("shop")}} className={view === "shop" ? 'active' : ""}>Shop</h2>
          <h2 onClick = {() => {setView("shows")}} className={view === "shows" ? 'active' : ""}>Shows</h2>
        </header>
       {view === "requests" && <RequestsView requests = {requests} />}
       {view === "shop" && <ShopsView requests = {requests} />}
       {view === "shows" && <ShowsView requests = {requests} />}
    </div>
  )
}

export default AdminPage