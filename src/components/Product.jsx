import React from 'react'

const Product = ({sku,name,price,value}) => {
  return (
    <div className='product'>
        <input className='delete-checkbox' id={sku} type='checkbox' />
        <p>{sku}</p>
        <p>{name}</p>
        <p>{price} $</p>
        <p>{value}</p>
    </div>
  )
}

export default Product