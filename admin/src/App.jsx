import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <hr className="border-gray-200" />
      <div className="flex w-full min-h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-white lg:ml-0 pt-16 lg:pt-0">
        </div>
      </div>
    </div>
  );
};

export default App;
