// import Cart from "./Cart"; // Import the Cart component
import { useState, useEffect } from "react";
import { PlusCircle, MinusCircle, Trash, ShoppingCart, ChevronDown, ShoppingCartIcon,LogOut } from "lucide-react";
import { useContext } from "react";
import OrderPage from "./OrderPage";
import FoodCart from "../components/FoodCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEN_URL_V1 } from "../lib/config";
import { errorNotify, succesNotify } from "../lib/toast";
import { CartContext } from "../context/Context";




export default function MenuPage() {
 
  const { getProductData } = useContext(CartContext); 
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [ items, setItems ] = useState([]);
  const navigate=useNavigate()

  

  const fetchItems = async() => {
    try {
      const response = await axios.get(`${BACKEN_URL_V1}/menu`);
      const data = response.data.data 
      if(data){
        setItems(data)
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleLogout = async() => {
    try {
      const response = await axios.get(`${BACKEN_URL_V1}/auth/logout`,{
        withCredentials: true
      });
      if(response.status === 204){
        succesNotify("You have been loggedout")
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      errorNotify(error.response.data.message)
    }
  }

  function handleShow(){
    setShow(true)
  }
  function handleHidden(){
    setShow(false)
  }

  const handleAddToCart = (item) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const handleDeleteFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  
  return (
    <div className="container mx-auto p-4 px-6 bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      <div className="flex justify-between mb-1 ">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 mt-2 ">Food Delivery System</h1>  
        <div className="">
        <button className=" md:text-3xl mt-3 mr-6" onClick={()=>handleShow()}><ShoppingCart size={40}/></button>
        <button className=" md:text-3xl mt-3" onClick={handleLogout}><LogOut size={40}/></button>
        </div>
        
      </div>
      

      <div className="">
        {/* Menu Items Section */}
        <div className="md:col-span-2 ">
          <div className="flex mb-6 justify-between items-center bg-white p-5 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search for items..."
              className="p-3 border rounded-lg w-full mr-4 text-lg focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.menuId} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all flex flex-col items-center text-center">
                <FoodCart item={item}/>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}

        
          {show && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className=" p-6 rounded-lg w-96">
      <OrderPage
        
        handleHidden={handleHidden}
      />
    </div>
  </div>
)}
        
      </div>
    </div>
  );
}
