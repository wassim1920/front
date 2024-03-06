// contractSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const contractSlice = createSlice({
  name: 'contracts',
  initialState: {
    contracts: [],
    customers: [],
  },
  reducers: {
    setContracts: (state, action) => {
      state.contracts = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setContracts, setCustomers } = contractSlice.actions;

export default contractSlice.reducer;
