import { useState } from "react";
import { Search, ShoppingBasket, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", href: "/", type: "route" },
    { id: "menu", label: "Menu", href: "#menu", type: "section" },
    {
      id: "contact-us",
      label: "Contact Us",
      href: "#contact",
      type: "section",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (item) => {
    setMenu(item.id);
    setIsMobileMenuOpen(false);

    if (item.type === "section") {
      // Small delay to ensure mobile menu closes first
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 300);
    }
  };

  return (
    <nav className="relative bg-white shadow-sm border-b border-gray-100">
      <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => setMenu("home")}>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#23CE6B] cursor-pointer hover:scale-105 transition-transform duration-300">
                Oyemo
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 xl:space-x-12">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.type === "route" ? (
                  <Link
                    to={item.href}
                    onClick={() => setMenu(item.id)}
                    className={`relative text-base xl:text-lg font-medium capitalize transition-all duration-300 hover:text-[#23CE6B] ${
                      menu === item.id
                        ? "text-[#23CE6B]"
                        : "text-gray-600 hover:text-[#23CE6B]"
                    }`}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#23CE6B] transition-all duration-300 ${
                        menu === item.id ? "w-full" : "w-0"
                      }`}
                    />
                    {/* Hover indicator */}
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-[#23CE6B] opacity-30 w-0 hover:w-full transition-all duration-300" />
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`relative text-base xl:text-lg font-medium capitalize transition-all duration-300 hover:text-[#23CE6B] ${
                      menu === item.id
                        ? "text-[#23CE6B]"
                        : "text-gray-600 hover:text-[#23CE6B]"
                    }`}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#23CE6B] transition-all duration-300 ${
                        menu === item.id ? "w-full" : "w-0"
                      }`}
                    />
                    {/* Hover indicator */}
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-[#23CE6B] opacity-30 w-0 hover:w-full transition-all duration-300" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Search Icon */}
            <button className="p-2 rounded-full hover:bg-[#E8FCCF] transition-colors duration-300 group">
              <Search
                size={20}
                className="text-gray-600 group-hover:text-[#23CE6B] transition-colors duration-300"
              />
            </button>

            {/* Cart Icon with Badge */}
            <button className="relative p-2 rounded-full hover:bg-[#E8FCCF] transition-colors duration-300 group">
              <ShoppingBasket
                size={20}
                className="text-gray-600 group-hover:text-[#23CE6B] transition-colors duration-300"
              />
              {/* Cart Badge */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#23CE6B] text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                2
              </span>
            </button>

            {/* Sign In Button */}
            <button
              className="px-6 py-2 lg:px-8 lg:py-2.5 text-sm lg:text-base font-medium text-[#23CE6B] border-2 border-[#23CE6B] rounded-full hover:bg-[#23CE6B] hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button & Icons */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Mobile Search & Cart */}
            <button className="p-2 rounded-full hover:bg-[#E8FCCF] transition-colors duration-300">
              <Search size={18} className="text-gray-600" />
            </button>

            <button className="relative p-2 rounded-full hover:bg-[#E8FCCF] transition-colors duration-300">
              <ShoppingBasket size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#23CE6B] rounded-full animate-pulse"></span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-[#E8FCCF] transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-gray-600" />
              ) : (
                <Menu size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-gradient-to-b from-[#E8FCCF] to-white rounded-b-xl">
            {menuItems.map((item, index) => (
              <div key={item.id}>
                {item.type === "route" ? (
                  <Link
                    to={item.href}
                    onClick={() => {
                      setMenu(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-6 py-3 text-base font-medium capitalize transition-all duration-300 hover:bg-white hover:text-[#23CE6B] hover:pl-8 ${
                      menu === item.id
                        ? "text-[#23CE6B] bg-white border-l-4 border-[#23CE6B]"
                        : "text-gray-700"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`block w-full text-left px-6 py-3 text-base font-medium capitalize transition-all duration-300 hover:bg-white hover:text-[#23CE6B] hover:pl-8 ${
                      menu === item.id
                        ? "text-[#23CE6B] bg-white border-l-4 border-[#23CE6B]"
                        : "text-gray-700"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}

            {/* Mobile Sign In Button */}
            <div className="px-6 pt-4">
              <button
                className="w-full py-3 text-center font-medium text-[#23CE6B] border-2 border-[#23CE6B] rounded-full hover:bg-[#23CE6B] hover:text-white transition-all duration-300"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-[-1] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
