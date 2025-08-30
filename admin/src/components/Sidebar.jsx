import { useState } from "react";
import { Plus, List, ShoppingBag, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("add");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const sidebarItems = [
    {
      id: "add",
      label: "Add Items",
      icon: Plus,
      path: "/add",
    },
    {
      id: "list",
      label: "List Items",
      icon: List,
      path: "/list",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
      path: "/orders",
    },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    setIsMobileMenuOpen(false);
    navigate(item.path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-green-50 hover:border-green-500 transition-all duration-200"
      >
        {isMobileMenuOpen ? (
          <X size={18} className="text-gray-600 hover:text-green-600" />
        ) : (
          <Menu size={18} className="text-gray-600 hover:text-green-600" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-16 lg:w-64 bg-white border-r border-gray-200 min-h-full">
        <div className="flex flex-col pt-8 px-2 lg:px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 p-3 lg:px-4 lg:py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                  isActive
                    ? "bg-green-50 text-green-600 shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="hidden lg:block font-medium text-sm">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-gray-200 mt-16" />
          

        {/* Mobile Navigation */}
        <div className="flex flex-col pt-6 px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-green-50 text-green-600 shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;