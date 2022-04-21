import React from 'react'

const Row = ({c1,c2,c3,c4}) => {
  return (
    <div className='row'>
        <h3>{c1}</h3>
        <h3>{c2}</h3>
        <h3>{c3}</h3>
        <h3>{c4}</h3>
    </div>
  )
}

export default Row