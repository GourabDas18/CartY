import { createSlice } from "@reduxjs/toolkit";

let initState = {
    men : [],
    women : [],
    user :[],
    orders:[],
    checked:false
}

export const storeSlice = createSlice({
    name: "storeSlice",
    initialState : initState,
    reducers:{
        addMenProduct : (state,action) =>{
            
            state.men= [...action.payload]
        },
        addWomenProduct : (state,action) =>{
            state.women= [...action.payload]
        },
        addUser : (state,action) =>{
            
            state.user= [...action.payload]
        },
        updateUserInfo : (state,action) =>{
            let keys= Object.keys(action.payload);
            let values= Object.values(action.payload);
            if(keys.length===values.length){
                keys.forEach((key,i)=>{
                    state.user[0][key.toString()]=values[i];
                })
            }
        },
        addToCart : (state,action) =>{
            state.user[0].cart= [...action.payload]
        },
        addToWishList : (state,action) =>{
            state.user[0].wishlist= [...action.payload]
        },
        addToOrder : (state,action) =>{
            state.orders.push(action.payload);
        },
        setOrderList : (state,action) =>{
            state.orders= [...action.payload];
        },
        setChecked : (state,action)=>{
            state.checked=action.payload;
        },
        setLogout :(state,action)=>{
            state.men = [...action.payload];
            state.women = [...action.payload];
            state.user = [...action.payload];
            state.orders = [...action.payload];
        }
    }
})

export const { addMenProduct , addWomenProduct, addUser ,addToCart, addToOrder, setOrderList,setChecked,setLogout,addToWishList, updateUserInfo} = storeSlice.actions
export default storeSlice.reducer