import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%] bg-white">
      <div className="flex-shrink-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#23CE6B] cursor-pointer hover:scale-105 transition-transform duration-300">
          Oyemo
        </h1>
      </div>
      
      <div className="w-10 h-10 bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
        <User size={20} className="text-white" />
      </div>
    </div>
  );
};

export default Navbar