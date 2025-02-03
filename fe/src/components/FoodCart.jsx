import React, { useContext } from 'react'
import { CartContext } from '../context/Context'
import { MinusCircle, PlusCircle, ShoppingCart, Trash  } from 'lucide-react'

function FoodCart(props) {
    const product = props.item;
    const cart=useContext(CartContext)
    const productQuantity=cart.getProductQuantity(product._id)
    // console.log("Image URL:", product);

  return (
    <>
      <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-full mb-4" />

                <h2 className="text-2xl font-bold mb-2 text-gray-900">{product.name}</h2>
                {/* <p className="mb-2 text-gray-600 text-sm">{product.description}</p> */}
                <p className="font-bold mb-2 text-lg text-gray-800">₹ {product.price.toFixed(2)}</p>
                {/* <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p> */}
                <div className="mt-4">
                  {productQuantity>0 ? (
                    <div className="flex items-center space-x-4">   
                      <button onClick={() => cart.removeOneFromCart(product._id)} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
                        <MinusCircle size={20} />
                      </button>
                      <span className="text-xl font-bold">{productQuantity}</span>
                      <button onClick={() => cart.addOneToCart(product._id)} className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
                        <PlusCircle size={20} />
                      </button>
                      <button onClick={() => cart.deleteFromCart(product._id)} className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-900">
                        <Trash size={20} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => cart.addOneToCart(product._id)} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition flex items-center">
                      <ShoppingCart size={24} className="mr-2" />
                      Add to Cart
                    </button>
                  )}
                </div>
    </>
  )
}

export default FoodCart
