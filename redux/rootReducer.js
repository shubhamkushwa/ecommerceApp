import cartReducer from './CartSlice';
import {combineReducers} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({cart: cartReducer});
