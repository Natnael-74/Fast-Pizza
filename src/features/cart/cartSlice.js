import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemInCart = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.totalPrice = itemInCart.quantity * itemInCart.unitPrice;
        return;
      }

      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      // if (item.quantity === 1) {
      //   item.quantity = 1;
      //   return;
      // }
      if (item.quantity === 0) {
        CartSlice.caseReducers.removeFromCart(state, action);
        return;
      }
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;

export function getCart(state) {
  return state.cart.cart;
}

export function getTotalPrice(state) {
  return state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);
}

export function getCartQuantity(state) {
  return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCurrentQuantityById(state, pizzaId) {
  const item = state.cart.cart.find((item) => item.pizzaId === pizzaId);
  return item ? item.quantity : 0;
}
