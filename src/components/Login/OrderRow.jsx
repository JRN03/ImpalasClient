import React from 'react'
import { Link } from "react-router-dom";

const OrderRow = ({c1,c2,c3,c4,id}) => {
  return (
    <div className='request row'>
          <h2>{c1}</h2>
          <h2>{c2}</h2>
          <h2>$ {c3}</h2>
          <div className="status-container">
            <h2 className={c4 === "Pending" ? "status" : "status paid"}>{c4}</h2>
            <Link to = {`/admin/request/orders/${id}`} className="view">View</Link>
          </div>
    </div>
  )
}

export default OrderRow