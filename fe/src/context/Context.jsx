import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEN_URL_V1 } from "../lib/config";

export const CartContext=createContext({
    items:[],
    getProductQuantity:()=>{},
    addOneToCart:()=>{},
    deleteFromCart:()=>{},
    getTotalCost:()=>{},
    removeOneFromCart:()=>{},
    getProductData:()=>{}
})





export function Context({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    const [items, setItems] = useState([]); // Store menu items 
    
    // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get(`${BACKEN_URL_V1}/menu`);
            setItems(response.data.data);
          } catch (error) {
            console.log(error.response.data.message);
          }
        };
        fetchItems();
      }, []);


    function getProductQuantity(_id) {
        const quantity = cartProducts.find(product => product.menuId === _id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(_id) {

        console.log("hi")
        const quantity = getProductQuantity(_id);

        if (quantity === 0) { 
            setCartProducts(
                [...cartProducts, {menuId:_id, quantity: 1 }]
            )
        } else { 
            setCartProducts(
                cartProducts.map(
                    product => product.menuId === _id ? { ...product, quantity: product.quantity + 1 } : product                                        
                )
            )
        }
    }

    function removeOneFromCart(_id) {
        const quantity = getProductQuantity(_id);

        if(quantity == 1) {
            deleteFromCart(menuId);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>  product.menuId === _id ? { ...product, quantity: product.quantity - 1 } : product                                      
                )
            )
        }
    }

    function deleteFromCart(_id) {
       
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.menuId != _id;
            })  
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach((cartItem) => {
            const productData = getProductData(cartItem.menuId);
            if (productData && productData.price) {
                totalCost += (productData.price * cartItem.quantity);
            }
        });
        return totalCost;
    }

    function getProductData(id) {
        const product = items.find((product) => product._id === id);
        return product || null; 
      }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        getProductData
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
  
}

export default Context
