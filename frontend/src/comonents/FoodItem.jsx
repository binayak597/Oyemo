import { useContext } from "react";
import { Plus, Minus, Star } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02] animate-fade-in overflow-hidden border border-gray-50">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Add to Cart Controls */}
        <div className="absolute bottom-4 right-4 transform transition-all duration-300 ease-out">
          {!cartItems[id] ? (
            <button
              onClick={() => addToCart(id)}
              className="group/btn flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-[#23CE6B] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <Plus 
                size={20} 
                className="text-gray-600 group-hover/btn:text-white transition-all duration-300 group-hover/btn:scale-110" 
              />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg animate-slide-in">
              <button
                onClick={() => removeFromCart(id)}
                className="flex items-center justify-center w-8 h-8 hover:bg-red-50 rounded-full transition-colors duration-200 hover:scale-110 active:scale-95"
              >
                <Minus 
                  size={16} 
                  className="text-red-500 hover:text-red-600 transition-colors duration-200" 
                />
              </button>
              
              <span className="text-gray-800 font-semibold min-w-[20px] text-center text-lg">
                {cartItems[id]}
              </span>
              
              <button
                onClick={() => addToCart(id)}
                className="flex items-center justify-center w-8 h-8 hover:bg-[#E8FCCF] rounded-full transition-colors duration-200 hover:scale-110 active:scale-95"
              >
                <Plus 
                  size={16} 
                  className="text-[#23CE6B] hover:text-[#1fb85d] transition-colors duration-200" 
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#23CE6B] transition-colors duration-300 leading-tight flex-1 mr-3">
            {name}
          </h3>
          <div className="flex-shrink-0 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">4.8</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#23CE6B] transition-all duration-300 group-hover:scale-105">
              ${price}
            </span>
          </div>
          
          {/* Quick Action Indicator */}
          {cartItems[id] && (
            <div className="flex items-center gap-2 text-[#23CE6B] animate-fade-in">
              <div className="w-2 h-2 bg-[#23CE6B] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">In Cart</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#23CE6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default FoodItem;