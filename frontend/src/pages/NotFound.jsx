import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Utensils, MapPin, Clock } from "lucide-react";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#E8FCCF]/20 flex items-center justify-center px-4">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold text-gray-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[#23CE6B] rounded-full flex items-center justify-center shadow-2xl">
                <Utensils size={40} className="text-white sm:w-12 sm:h-12 md:w-16 md:h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Looks like this page went out for delivery and never came back! 
            Don't worry, our kitchen is still cooking up something amazing for you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            to="/" 
            className="group flex items-center gap-3 px-8 py-4 bg-[#23CE6B] hover:bg-[#1fb85d] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform duration-300" />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#23CE6B] text-[#23CE6B] hover:bg-[#23CE6B] hover:text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={20} className="group-hover:scale-110 transition-transform duration-300" />
            Go Back
          </button>
        </div>

      
        {/* Food Illustration */}
        <div className="relative">
          <div className="flex justify-center items-center space-x-4 opacity-60">
            {/* Animated food emojis */}
            <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
              <div className="text-4xl sm:text-5xl">🍕</div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl sm:text-5xl">🍔</div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '400ms' }}>
              <div className="text-4xl sm:text-5xl">🍜</div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '600ms' }}>
              <div className="text-4xl sm:text-5xl">🥗</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 italic">
            "Every great meal starts with finding the right path!"
          </p>
        </div>

        {/* Floating Background Elements */}
        <div className="fixed top-20 left-10 opacity-10 animate-pulse">
          <div className="w-16 h-16 bg-[#23CE6B] rounded-full"></div>
        </div>
        <div className="fixed bottom-20 right-10 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-[#E8FCCF] rounded-full"></div>
        </div>
        <div className="fixed top-1/2 right-20 opacity-10 animate-pulse" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 bg-[#23CE6B] rounded-full"></div>
        </div>
      </div>

     
      
    </div>
  );
};

export default NotFound;