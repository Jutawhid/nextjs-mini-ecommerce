import addedToCartToast from '@/util/Toast/addedToCartToast';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },
    addToBasket: (state:any, action:any) => {
      // state.items = [...state.items, action.payload];
      const index = state.items.findIndex(
        (cartItem:any) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        let newCart = [...state.items];
        newCart[index] = {
          ...newCart[index],
          qty: newCart[index].qty + 1,
        };
        state.items = newCart;
      } else {
        let item = { ...action.payload };
        delete item.toast;
        state.items = [...state.items, item];
      }
      //Toast to indicate item added to cart
      if (action.payload.toast) {
        addedToCartToast(action.payload.image, action.payload.title);
      }
    },
    //Update the quantity of item in cart
    updateQty: (state, action) => {
      let newCart:any = [...state.items];
      const index = state.items.findIndex(
        (Item:any) => Item._id === action.payload._id
      );
      if (index >= 0) {
        if (action.payload.qty >= 1) {
          newCart[index] = action.payload;
          state.items = newCart;
        } else {
          newCart.splice(index, 1);
          state.items = newCart;
        }
      } else {
        console.warn("Product not present in the cart!");
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (cartItem:any) => cartItem._id === action.payload._id
      );
      let newBastek = [...state.items];
      if (index >= 0) {
        newBastek.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (_id:${action.payload._id}) as its not in the cart`
        );
      }
      state.items = newBastek;
    },
    removeGroupedFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (cartItem:any) => cartItem._id === action.payload._id
      );
      let newBastek = [...state.items];
      if (index >= 0) {
        newBastek.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (_id:${action.payload._id}) as its not in the cart`
        );
      }
      state.items = newBastek;
    },
    clearBasket: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  removeGroupedFromBasket,
  clearBasket,
  hydrate,
  updateQty
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state:any) => state.basket.items;
export const selectTotal = (state:any) =>
  state.basket.items.reduce((total:any, item:any) => total + item.price * item.qty, 0);

export default basketSlice.reducer;
