import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Product from './Product'

const Home = () => {

  const [products, setProducts] = useState([])
  const getAllProducts = async ()=>{
    try{
      axios.get(`https://php-mysql-restful-app.herokuapp.com/api/read.php`)
            .then(res => {
              //console.log(res.data.body)
              setProducts(res.data.body)
            })
    } catch(error) {throw error}
  }

  useEffect( ()=>{
    getAllProducts();
  }, [])

  const handleDelete = async ()=>{
    const checkedBoxes = document.querySelectorAll("input[type='checkbox']:checked")
    checkedBoxes.forEach(checkbox =>{
      //console.log(checkbox.id)
      try {
        axios.post(`https://php-mysql-restful-app.herokuapp.com/api/delete.php`, { sku: checkbox.id}) 
        .then(res => {
          console.log(res.data)
          setProducts([]);
          getAllProducts();
          return;
         })
      } catch (error) { throw error;}
    })
  }
  return (
    <div className='home__main'>
        <Navbar 
        currentRoute='Home'
        title='Product List'
        handleDelete={handleDelete}
        />
      <section className='home__products'>
        {products.length>0 && products.map(product =>{
          return (
            <Product
            key={product.sku}
            sku={product.sku} 
            name={product.name}
            price={product.price}
            value={product.value}
            />
          )
         })}
      </section>
    </div>
  )
}

export default Home