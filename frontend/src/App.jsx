import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import Auth from "./comonents/Auth";
import Footer from "./comonents/Footer";
import Navbar from "./comonents/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

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
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
