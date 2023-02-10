import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({title, currentRoute, disabledValue, handleDelete, handleSubmit}) => {
  return (
    <nav className='navbar'>
        <h1>{title}</h1>
        {currentRoute === 'Home' && (
            <>
              <Link to='/addproduct'>
                <button>ADD</button>
              </Link>
              <button id='delete-product-btn' onClick={()=>handleDelete()}>MASS DELETE</button>
            </>
            
        )}
        {currentRoute==='addProduct' && (
            <>
              <button disabled={disabledValue} onClick={handleSubmit}>Save</button>
              <Link to='/'>
                <button>Cancel</button>
              </Link>
            </>
            
        )}
        
    </nav>
  )
}

export default Navbar