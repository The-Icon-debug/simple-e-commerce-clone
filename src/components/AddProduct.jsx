import React, {useState, useRef, useEffect} from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom";


const SKU_REGEX = /^[A-Z][A-Z0-9]{4,23}$/;
const NAME_REGEX = /^[ a-zA-Z0-9-_]{4,24}/;
const UNIV_REGEX = /^[0-9]{1,9}[\.][0-9]{2}$/; //price, weight, height,width,length
const SIZE_REGEX = /^[1-9][0-9]{0,20}$/;

const AddProduct = () => {
  let navigate = useNavigate()

  const formRef = useRef()
  const errRef = useRef()

  const [validSku, setValidSku] = useState(false)
  const [skuFocus, setSkuFocus] = useState(false)

  const [validName, setValidName] = useState(false)
  const [nameFocus, setNameFocus] = useState(false)

  const [validPrice, setValidPrice] = useState(false)
  const [priceFocus, setPriceFocus] = useState(false)

  const [validSize, setValidSize] = useState(false)
  const [sizeFocus, setSizeFocus] = useState(false)

  const [validWeight, setValidWeight] = useState(false)
  const [weightFocus, setWeightFocus] = useState(false)

  const [validHeight, setValidHeight] = useState(false)
  const [heightFocus, setHeightFocus] = useState(false)

  const [validWidth, setValidWidth] = useState(false)
  const [widthFocus, setWidthFocus] = useState(false)

  const [validLength, setValidLength] = useState(false)
  const [lengthFocus, setLengthFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  // const [success, setSuccess] = useState(false)

  useEffect(()=>{
    formRef.current.focus();
  }, [])

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    type: '',
    size: '',
    weight: '',
    height: '',
    width: '',
    length: ''
  })

  const {sku,name,price,type,size,weight,height,width,length} = formData

  const validBook = validSku&&validName&&validPrice&&validWeight&&type==='Book'? true: false;
  const validDVD = validSku&&validName&&validPrice&&validSize&&type==='DVD'? true: false;
  const validFurn = validSku&&validName&&validPrice&&validHeight&&validLength&&validWidth&&type==='Furniture'? true: false;

  useEffect(()=>{
    setValidSku(SKU_REGEX.test(sku))
  }, [sku])

  useEffect(()=>{
    setValidName(NAME_REGEX.test(name))
  }, [name])

  useEffect(()=>{
    setValidPrice(UNIV_REGEX.test(price))
  }, [price])

  useEffect(()=>{
    setValidSize(SIZE_REGEX.test(size))
  }, [size])

  useEffect(()=>{
    setValidWeight(UNIV_REGEX.test(weight))
  }, [weight])

  useEffect(()=>{
    setValidHeight(UNIV_REGEX.test(height))
  }, [height])

  useEffect(()=>{
    setValidWidth(UNIV_REGEX.test(width))
  }, [width])

  useEffect(()=>{
    setValidLength(UNIV_REGEX.test(length))
  }, [length])



  useEffect(()=>{
    setErrMsg('');
  }, [sku, name,price,type,size,weight,length,width,height])

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData(prevData => {
      return {...prevData, [name]:value}
    })
  }

  const postData = (mydata)=>{
    fetch(`https://php-mysql-restful-app.herokuapp.com/api/create.php`,{
        method: 'POST',
        body: JSON.stringify(mydata),
        headers: {"Content-Type": "application/json"},
        mode:'no-cors'
      })
      .then(res =>{
        navigate('/')
      })
    }  

  const submitProduct =()=>{
     let myData = {}
     switch (type) {
      case 'DVD':
        myData = {sku:sku, name:name, price:price, type:type, value:`Size: ${size} MB`}
        if(validDVD){
          postData(myData)
        }else{
          setErrMsg('Please Submit Required DVD data')
          errRef.current.focus()
        }
        break;
        case 'Book':
          myData = {sku:sku, name:name, price:price, type:type, value:`Weight: ${weight} KG`}
          if(validBook){
            postData(myData)
          }else{
            setErrMsg('Please Submit Required Book data')
            errRef.current.focus()
          }
        break;
          case 'Furniture':
            myData = {sku:sku, name:name, price:price, type:type, value:`Dimensions: ${height}x${width}x${length} CM`}
            if(validFurn){
              postData(myData)
            }else{
              setErrMsg('Please Submit Required Furniture data')
              errRef.current.focus()
            }
        break;
        default:
        break;
    }
    //postData(myData)
  }

  return (
    <div className='add-product__main'>
        <Navbar 
        title='Product Add'
        currentRoute='addProduct'
        handleSubmit={submitProduct}
        // disabledValue={validBook || validDVD || validFurn ? false : true}
        />
        <p ref={errRef} className={errMsg? 'errmsg' : 'offscreen'}>{errMsg}</p>
        <form id='product_form'>
          <label htmlFor='sku'>
            SKU:
            <span className={validSku ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validSku || !sku ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}  />
            </span>
          </label>
          <input 
          id='sku'
          type='text'
          name='sku'
          ref={formRef}
          aria-invalid={validSku? 'false':'true'}
          aria-describedby = 'uidnote'
          onFocus={()=> setSkuFocus(true)}
          onBlur={()=> setSkuFocus(false)}
          placeholder='#sku'
          value={sku}
          onChange={handleChange}
          />
          <p id='uidnote' className={skuFocus&&sku&&!validSku? 'instructions':'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            5 to 24 characters.<br/>
            Must begin with an uppercase letter.<br/>
            Only uppercase letters and numbers are allowed.
          </p>
          <br />
          <br />
          <label htmlFor='name'>
            Name:
            <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !name ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}  />
            </span>
          </label>
          <input 
          id='name'
          type='text'
          name='name'
          aria-invalid={validName? 'false':'true'}
          aria-describedby = 'namenote'
          onFocus={()=> setNameFocus(true)}
          onBlur={()=> setNameFocus(false)}
          placeholder='#name'
          value={name}
          onChange={handleChange}
          />
          <p id='namenote' className={nameFocus&&name&&!validName? 'instructions':'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            4 to 24 characters.<br />
            Must begin with a letter.<br />
           Letters, numbers, underscores, hyphens and spaces allowed.
          </p>
          <br />
          <br />
          <label htmlFor='price'>
            Price ($):
            <span className={validPrice ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPrice || !price ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}  />
            </span>
            </label>
          <input 
          id='price'
          type='number'
          min='1'
          step='0.01'
          name='price'
          aria-invalid={validPrice? 'false':'true'}
          aria-describedby = 'pricenote'
          onFocus={()=> setPriceFocus(true)}
          onBlur={()=> setPriceFocus(false)}
          placeholder='#price'
          value={price}
          onChange={handleChange}
          />
          <p id='pricenote' className={priceFocus&&price&&!validPrice? 'instructions':'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            Price must be a positive number.<br />
            Decimals allowed upto the nearest cent.
          </p>
          <br />
          <br />
          <label htmlFor='productType'>Type Switcher: </label>
          <select id='productType' name='type' value={type} onChange={handleChange}>
            <option>Type Switcher</option>
            <option id='DVD'>DVD</option>
            <option id='Book'>Book</option>
            <option id='Furniture'>Furniture</option>
          </select>
          <br />
          <br />
          {type==='DVD' && (
            <div className='form__type-container'>
              <label htmlFor='size'>
                  Size (MB):
                  <span className={validSize ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validSize || !size ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
              </label>
              <input 
              id='size'
              type='number'
              min='1'
              name='size'
              aria-invalid={validSize? 'false':'true'}
              aria-describedby = 'sizenote'
              onFocus={()=> setSizeFocus(true)}
              onBlur={()=> setSizeFocus(false)}
              placeholder='#size'
              value={size}
              onChange={handleChange}
              />
              <p id='sizenote' className={sizeFocus&&size&&!validSize? 'instructions':'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Size must be a positive number.<br />
              </p>
              <p>Provide the size of the DVD in Megabytes</p>
            </div>
          )}
           {type==='Book' && (
            <div className='form__type-container'>
              <label htmlFor='weight'>
                Weight (KG):
                <span className={validWeight ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validWeight|| !weight ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
              </label>
              <input 
              id='weight'
              type='number'
              min='1'
              step='0.01'
              name='weight'
              aria-invalid={validWeight? 'false':'true'}
              aria-describedby = 'weightnote'
              onFocus={()=> setWeightFocus(true)}
              onBlur={()=> setWeightFocus(false)}
              placeholder='#weight'
              value={weight}
              onChange={handleChange}
              />
              <p id='weightnote' className={weightFocus&&weight&&!validWeight? 'instructions':'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Weight must be a positive number<br />
                rounded to two decimal places.
              </p>
              <p>Provide the weight of the Book in Kilograms</p>
            </div>
          )}
          {type==='Furniture' && (
            <div className='form__type-container'>
              <label htmlFor='height'>
                 Height (CM): 
                 <span className={validHeight ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                 </span>
                 <span className={validHeight || !height ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes}  />
                 </span>
              </label>
              <input 
              id='height'
              type='number'
              min='1'
              step='0.01'
              name='height'
              aria-invalid={validHeight? 'false':'true'}
              aria-describedby = 'heightnote'
              onFocus={()=> setHeightFocus(true)}
              onBlur={()=> setHeightFocus(false)}
              placeholder='#height'
              value={height}
              onChange={handleChange}
              />
               <p id='heightnote' className={heightFocus&&height&&!validHeight? 'instructions':'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Height must be a positive number<br />
                rounded to two decimal places.
              </p>
              <br />
              <br />
              <label htmlFor='width'>
                Width (CM): 
                <span className={validWidth ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                 </span>
                 <span className={validWidth || !width ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes}  />
                 </span>
                </label>
              <input 
              id='width'
              type='number'
              min='1'
              step='0.01'
              name='width'
              aria-invalid={validWidth? 'false':'true'}
              aria-describedby = 'widthnote'
              onFocus={()=> setWidthFocus(true)}
              onBlur={()=> setWidthFocus(false)}
              placeholder='#width'
              value={width}
              onChange={handleChange}
              />
              <p id='widthnote' className={widthFocus&&width&&!validWidth? 'instructions':'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Width must be a positive number<br />
                rounded to two decimal places.
              </p>
              <br />
              <br />
              <label htmlFor='length'>
                Length (CM): 
                <span className={validLength ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                 </span>
                 <span className={validLength || !length ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes}  />
                 </span>
                </label>
              <input 
              id='length'
              type='number'
              min='1'
              step='0.01'
              name='length'
              aria-invalid={validLength? 'false':'true'}
              aria-describedby = 'lengthnote'
              onFocus={()=> setLengthFocus(true)}
              onBlur={()=> setLengthFocus(false)}
              placeholder='#length'
              value={length}
              onChange={handleChange}
              />
              <p id='lengthnote' className={lengthFocus&&length&&!validLength? 'instructions':'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Length must be a positive number<br />
                rounded to two decimal places.
              </p>
              <p>Provide the dimensions of the furniture: Height, Width and Length in Centimeters</p>
            </div>
          )}
        </form>


    </div>
  )
}

export default AddProduct