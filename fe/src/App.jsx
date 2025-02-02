import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
// import HomePage from "./pages/HomePage";
import { Context } from "./context/Context";  // Import Context

function App() {
  return (
    <Context> {/* Wrap the entire app in the Context provider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
        <ToastContainer limit={2} position="top-right" />
    </Context>
  );
}

export default App;
