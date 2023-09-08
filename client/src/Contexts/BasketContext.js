import React, { createContext, useContext, useEffect, useState } from 'react'

const BasketContext = createContext();

const defaultBasket=JSON.parse(localStorage.getItem("basket")) || [];
const BasketProvider = ({ children }) => {
    const [items, setItems] = useState(defaultBasket);
    useEffect(() => {
      localStorage.setItem("basket", JSON.stringify(items));
    }, [items])
    

    const addToBasket = (data, itemInBasket) => {
        if (!itemInBasket) {
            return setItems((prev) => [data, ...prev]);
        }
        const filteredItems = items.filter((item) => item._id !== itemInBasket._id);
        setItems(filteredItems);
    }
    const removeFromBasket=(itemId)=>{
        const filteredItems=items.filter((item)=>item._id!==itemId);
        setItems(filteredItems);
    }

    const totalPrice=()=>items.reduce((acc, item)=>acc+item.price, 0);
    
    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        totalPrice
    };

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };