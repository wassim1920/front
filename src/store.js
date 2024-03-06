// store.js

import { configureStore } from '@reduxjs/toolkit';
import contractReducer from './redux/contractSlice';

export default configureStore({
  reducer: {
    contracts: contractReducer,
  },
});
