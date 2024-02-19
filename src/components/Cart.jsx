import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./Cart.css"
import { removeFromCart,decrementFromCart, incrementToCart ,calculatePrice} from '../redux/cartSlice'
import { Link } from 'react-router-dom'
const Cart = () => {
   const cartItems = useSelector(state=> state.cart.cart)
   const total = useSelector(state=> state.cart.total);
   const dispatch= useDispatch();

   const decrement =(id)=>{
    dispatch(decrementFromCart(id))
    dispatch(calculatePrice())
  }
  const increment =(id)=>{
    dispatch(incrementToCart(id))
    dispatch(calculatePrice())
  }

  const deleteCart = (dispatch, itemId) => {
    dispatch(removeFromCart({ id: itemId }));
    dispatch(calculatePrice());
};
  
  return (
    <div className='cart-page'>
    <div className='cart'>
    <h1>Cart Items</h1>
      { cartItems.length >0 ?(
        cartItems.map(item=>{
          return(
            <div className='cart-main'>
            <div className='cart-content'>
            <img src={item.image[0]}></img>
              <h5>{item.title}</h5>
              <h5>{item.price}rs</h5>
              </div>
              <div className='cart-btn'>
              <button  onClick={() => decrement(item.id)} >-</button>
             <h4> {item.quantity}</h4>
              <button onClick={()=> increment(item.id)}>+</button>
                <button className='delete' onClick={() => deleteCart(dispatch, item.id)}>Delete</button>
              </div>
              
            </div>
            
          )
          
        })
        ) :
        <> <p style={{marginTop:'5rem', fontSize: "2.5rem"}}>Cart is Empty</p>

        <Link to="/gotohome"><button>Go To Home</button></Link></>
      }
  
    </div>
    <div className='order-div'>
      <h2>Total amount: Rs {total}</h2>
      <button className='order'>Order Now</button>
      </div>
     </div>
  )
}

export default Cart
