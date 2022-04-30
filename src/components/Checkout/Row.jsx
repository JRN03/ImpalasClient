import React from 'react'

const Row = ({className = "row", item, quantity, cost}) => {
  return (
    <div className={className}>
          <h2>{item}</h2>
          <h2>{quantity}</h2>
          <h2>{cost}</h2>
    </div>
  )
}

export default Row