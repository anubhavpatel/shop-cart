import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        cart:[],
        total: 0
    },
    reducers:{
    addToCart: (state, actions)=>{
        const item= actions.payload;
        const isItemExist = state.cart.find((i) => i.id === item.id);
        if (isItemExist) {
            state.cart.forEach((i) => {
              if (i.id === item.id) i.quantity += 1;
            });
          } else {
            state.cart.push(item);
          }
//    state.cart.push(actions.payload)
    },
    removeFromCart: (state, actions)=>{
        state.cart = state.cart.filter(x=>x.id !==actions.payload.id)
    },
    decrementFromCart: (state, actions) => {
        const item = state.cart.find((i) => i.id === actions.payload);
        if (item.quantity > 1) {
          state.cart.forEach((i) => {
            if (i.id === item.id) i.quantity -= 1;
          });
        }
      },
      incrementToCart: (state, actions) => {
        const item = state.cart.find((i) => i.id === actions.payload);
       
          state.cart.forEach((i) => {
            if (i.id === item.id) i.quantity += 1;
          });
        
      },

      calculatePrice: (state) => {
        let sum = 0;
        state.cart.forEach((i) => (sum += i.price * i.quantity));
        state.total = sum;
      }
    }
})

export default cartSlice.reducer;
export const {addToCart, removeFromCart ,decrementFromCart, incrementToCart,calculatePrice} =cartSlice.actions;