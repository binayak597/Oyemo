import { Routes, Route } from "react-router-dom";

import Navbar from "./comonents/Navbar";
import Home from "./pages/Home";
import Footer from "./comonents/Footer";
import { useState } from "react";
import Auth from "./comonents/Auth";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <Auth setShowLogin={setShowLogin} />}
      <div className="min-h-screen w-full bg-gray-50 overflow-hidden">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
