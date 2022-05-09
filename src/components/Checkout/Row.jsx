import React from 'react'

const Row = ({className = "row", id,item, quantity, cost,handleRemove}) => {
  return (
    <div className={className}>
          <h2>{item}</h2>
          <h2>{quantity}</h2>
          <div className='status-container'>
            <h2>{cost}</h2>{/*Add remove item button*/}
            {cost !== "Cost" && <button className='view'
            onClick={() => handleRemove(id)}
            >Remove</button>}
            {cost !== "Cost" && <button className='view small'
            onClick={() => handleRemove(id)}
            >-</button>}
          </div>
    </div>
  )
}

export default Row