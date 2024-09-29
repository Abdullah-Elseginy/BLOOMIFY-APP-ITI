import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
});

export default rootReducer;
