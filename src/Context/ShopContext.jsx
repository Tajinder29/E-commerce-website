import React, { createContext, useEffect, useState } from 'react';
// import all_Product from '../Components/Assets/all_product';
export const ShopContext=createContext(null);
const defaultCart=()=>{
    let cart={};
    for (let index = 0; index < 300+1; index++) {
        cart[index]=0;
        
    }
    return cart;
}
const ShopContextProvider=(props)=>{
    const [all_product,setAll_Product]=useState([]);
     const [cartitems,setCartitems]=useState(defaultCart());
     useEffect(()=>{
      fetch("http://localhost:4000/allProducts")
      .then((res)=>res.json())
      .then((data)=>setAll_Product(data))

       if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/getcart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:"",
            })
            .then((res)=>res.json())
            .then((data)=>setCartitems(data));
        }
     },[])
    
    const addToCart=(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/addtocart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }
    const removeFromCart=(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/removefromcart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartitems){
            if(cartitems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.new_price * cartitems[item];
            }
            
        }
        return totalAmount;
    }

    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartitems){
            if(cartitems[item]>0){
                totalItem+=cartitems[item];
            }
        }
        return totalItem;
    }
        const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartitems,addToCart,removeFromCart};
   
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
} 
export default ShopContextProvider;