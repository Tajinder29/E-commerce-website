import React, { createContext, useState } from 'react';
import all_Product from '../Components/Assets/all_product';
export const ShopContext=createContext(null);
const defaultCart=()=>{
    let cart={};
    for (let index = 0; index < all_Product.length+1; index++) {
        cart[index]=0;
        
    }
    return cart;
}
const ShopContextProvider=(props)=>{
     const [cartitems,setCartitems]=useState(defaultCart());
    
    const addToCart=(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    }
    const removeFromCart=(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartitems){
            if(cartitems[item]>0){
                let itemInfo=all_Product.find((product)=>product.id===Number(item));
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
        const contextValue={getTotalCartItems,getTotalCartAmount,all_Product,cartitems,addToCart,removeFromCart};
   
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
} 
export default ShopContextProvider;