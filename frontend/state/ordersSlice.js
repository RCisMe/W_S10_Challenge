import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  
import axios from 'axios'; 

export const fetchOrders=createAsyncThunk ('orders/fetchOrders', async() =>{
    const response = await axios.get('http://localhost:9009/api/pizza/history');
    return response.data;
});

const ordersSlice=createSlice({
    name: 'orders',
    initialState:{
        history:[], 
        status:'idle',
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchOrders.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchOrders.fulfilled, (state,action)=>{
            state.status='succeed';
            state.history=action.payload;
        })
        .addCase(fetchOrders.rejected,(state)=>{
            state.status='failed'
        })
    },

}) ;

export default ordersSlice.reducer;