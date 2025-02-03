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
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate=useNavigate()

  
// useEffect for API fetching
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

  // useEffect for search functionality
  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, items]);

  const handleLogout = async() => {
    let answer=confirm('Want to logou t ')

    if(answer){
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
  }}

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
    <div className="container mx-auto   bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      <div className="flex justify-between mb-3  flex-col md:flex-row bg-blue-300  rounded-b-3xl">
        <div className="border-2 rounded-lg md:flex md:justify-between md:w-full px-6">
          <h1 className="md:text-4xl text-2xl font-extrabold mb-2 md:mb-6 text-gray-900 mt-1 ">Food Delivery System</h1>  
          <div className="flex  flex-row justify-end mb-3">
            <button className=" md:text-3xl mt-3 hover:scale-105 duration-300 mr-3 md:mr-6" onClick={()=>handleShow()}><ShoppingCart className="md:w-8 md:h-8 w-6 h-6"/></button>
            <button className=" md:text-3xl mt-3 hover:scale-105 duration-300 " onClick={handleLogout}><LogOut className="md:w-8 md:h-8 w-6 h-6" /></button>
          </div>
        </div>
        
      </div>
      

      <div className="mx-6">
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
            {filteredItems.map((item) => (
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
