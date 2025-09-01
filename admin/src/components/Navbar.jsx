import { User, LogOut } from "lucide-react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const { token, setToken, setAdmin } = useContext(StoreContext);

  const handleLogout = () => {
    setToken("");
    setAdmin(false);
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin");
  };

  return (
    <div className="flex justify-between items-center py-2 px-[4%] bg-white">
      <div className="flex-shrink-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#23CE6B] cursor-pointer hover:scale-105 transition-transform duration-300">
          Oyemo
        </h1>
      </div>
      
      {token && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
            <User size={20} className="text-white" />
          </div>
          
          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:from-red-600 hover:to-red-700"
            title="Logout"
          >
            <LogOut size={18} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;