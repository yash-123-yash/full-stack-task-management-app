import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../context/Context";
// import { getProductData } from "./MenuPage";
import { CircleX } from 'lucide-react';
import axios from "axios";
import { BACKEN_URL_V1 } from "../lib/config";
import { errorNotify, succesNotify } from "../lib/toast";


export default function OrderPage({ handleHidden }) {

  const cart = useContext(CartContext)
  const [quantityArr,setQuantityArr]=useState([])
  const productCount=cart.items.reduce((sum,product)=>sum+product.quantity,0)

  const quantityArray=[]

 

  async function handleBuy(items){
    console.log(items)
    try {
      const resposne = await axios.post(`${BACKEN_URL_V1}/order`, {
        items: items
      }, { withCredentials: true })
  
      if(resposne.status === 200){
        succesNotify("Your order os placed")
      }
    } catch (e) {
      console.log(e);
      errorNotify(e.resposne.data.message)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-full md:w-96 ">
      <div className="flex justify-between  items-start">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Shopping Cart</h2>
      <button className="text-2xl  mt-1 text-red-600" onClick={()=>handleHidden()}><CircleX/></button> 
      </div>
      
      
      {cart.items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.items.map((item) => {
            const product = cart.getProductData(item.menuId); 
            // console.log(product)
            if (!product) {
              return (
                <li key={item.menuId} className="text-red-500">
                  Product not found
                </li>
              );
            }
            return (
              <li key={item.menuId} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{product.name || "No Name"}</p>
                  <p className="text-gray-600">
                  ₹{product.price ? product.price.toFixed(2) : "N/A"} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => cart.removeOneFromCart(item.menuId)} className="text-red-500">
                    <MinusCircle size={20} />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button onClick={() => cart.addOneToCart(item.menuId)} className="text-green-500">
                    <PlusCircle size={20} />
                  </button>
                  <button  onClick={() => cart.deleteFromCart(item.menuId)} className="text-gray-800">
                    <Trash size={20} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {cart.items.length > 0 && (
        <div className="mt-4 font-bold text-lg flex justify-between">
          Total: ₹{cart.getTotalCost()}

          
          <button onClick={()=>handleBuy(cart.items)} className="font-semibold text-sm border-2 border-gray-400 px-3 rounded-md py-2 bg-blue-600 text-white hover:bg-blue-700 active:scale-105  duration-400">Buy now</button>
        </div>
      )}
      
    </div>
  );
}
