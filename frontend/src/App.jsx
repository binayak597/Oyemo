import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import Auth from "./comonents/Auth";
import Footer from "./comonents/Footer";
import Navbar from "./comonents/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import MyOrders from "./pages/MyOrders";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <Auth setShowLogin={setShowLogin} />}
      <div className="min-h-screen w-full bg-gray-50 overflow-hidden">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
