import React from 'react'
import  toast, {Toaster} from 'react-hot-toast';
import "./Card.css"
import { useDispatch } from 'react-redux';
import { addToCart,calculatePrice } from '../redux/cartSlice';

const Card = ({id,title, image, discountPercentage, stock, price, description }) => {
  
  const dispatch = useDispatch();
  const addToCartBtn = () => {
    dispatch(addToCart({title,price,image,id, quantity: 1,total:0}))
    dispatch(calculatePrice())
    toast.success("Added To Cart");

  };

  
  return (
  <>
    <div className='card-container'>
  
      <div className='car-image'>
        <img src={image[0]}></img>
      </div>
      <div className='content'>
        <div className='c1'>
          <h4>{title}</h4>
          <div className='year'>{discountPercentage}%</div>
        </div>
        <div className='c2'>
          <h4>Descriptoin</h4>
          <p style={{ fontSize: "14px" }}>{description}</p>
        </div>
        <hr />
        <div className='c3'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h5>{price}Rs</h5>
          </div>
          <div className='c31'>
            <div style={{
              backgroundColor: "#A3C8ED", color: "white", display: "flex", justifyContent: "center",
              alignItems: "center", borderRadius: "0.5rem", height: "2rem", width: "2rem", marginRight: "5px"
            }}>{stock}</div>
            <button onClick={addToCartBtn}>Add to cart</button>
           
          </div>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Card