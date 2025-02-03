import { useState } from "react";
import { Home, ShoppingCart, Users, Settings } from "lucide-react";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navVal=[
    { name: "Dashboard", icon: Home },
    { name: "Orders", icon: ShoppingCart },
    { name: "Add items", icon: Users },
    { name: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <nav>
          {navVal.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`flex items-center p-2 rounded-lg w-full text-left mb-2 ${
                activeTab === name ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mr-2" /> {name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
        {activeTab === "Dashboard" && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-bold">Total Orders</h3>
              <p className="text-2xl">1,234</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-bold">Revenue</h3>
              <p className="text-2xl">$25,678</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-bold">Active Orders</h3>
              <p className="text-2xl">56</p>
            </div>
          </div>
        )}

        {activeTab === "Orders" && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Recent Orders</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Order ID</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((id) => (
                  <tr key={id} className="border-b">
                    <td className="p-2">#{id}001</td>
                    <td className="p-2">John Doe</td>
                    <td className="p-2">$30.00</td>
                    <td className="p-2">
                      Delivered
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        

        {activeTab === "Add items" && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center  ">Add Items</h3>
            <form className="w-full">
                <div className="flex w-full mt-3">   
                <div className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="email"
                             className="mt-1 p-2 w-full border rounded-lg"
                            placeholder="Enter food name"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="email"
                             className="mt-1 p-2 w-full border rounded-lg"
                            placeholder="Food price"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <input
                            type="email"
                             className="mt-1 p-2 w-full border rounded-lg"
                            placeholder="Food availability"
                        />
                    </div>


                </div>
                <div className="w-full ml-3">
                <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="email"
                             className="mt-1 p-2 w-full border rounded-lg"
                            placeholder="Food category"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image url</label>
                        <input
                            type="email"
                             className="mt-1 p-2 w-full border rounded-lg"
                            placeholder="url..."
                        />
                    </div>
                    
                </div>
                </div>
              
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                Add
              </button>
            </form>
          </div>
        )}

        
      </div>
    </div>
  );
}
