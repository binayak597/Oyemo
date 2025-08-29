import { Routes, Route } from "react-router-dom";

import Navbar from "./comonents/Navbar";
import Home from "./pages/Home";
import Footer from "./comonents/Footer";

const App = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 overflow-hidden">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
