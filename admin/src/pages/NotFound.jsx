import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#23CE6B] hover:bg-[#1fb85d] text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Home size={18} />
            Admin Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;