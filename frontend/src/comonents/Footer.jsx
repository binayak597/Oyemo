import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20" id="contact">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#23CE6B] cursor-pointer hover:scale-105 transition-transform duration-300 mb-4">
                  Oyemo
                </h1>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Delivering fresh, delicious meals right to your doorstep. Experience the convenience of premium food delivery with lightning-fast service and unmatched quality.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg">Follow Us</h3>
                <div className="flex items-center space-x-4">
                  <a 
                    href="#" 
                    className="group p-3 bg-gray-800 hover:bg-[#23CE6B] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Facebook size={20} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a 
                    href="#" 
                    className="group p-3 bg-gray-800 hover:bg-[#23CE6B] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Twitter size={20} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a 
                    href="#" 
                    className="group p-3 bg-gray-800 hover:bg-[#23CE6B] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Instagram size={20} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#23CE6B] mt-2"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Menu", href: "/menu" },
                  { name: "About Us", href: "/about" },
                  { name: "Restaurants", href: "/restaurants" },
                  { name: "Become a Partner", href: "/partner" },
                  { name: "Privacy Policy", href: "/privacy" }
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href}
                      className="text-gray-400 hover:text-[#23CE6B] hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg relative">
                Get in Touch
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#23CE6B] mt-2"></div>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-[#23CE6B] transition-colors duration-300">
                    <Phone size={16} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Call us</p>
                    <a href="tel:+923084900522" className="text-white hover:text-[#23CE6B] transition-colors duration-300">
                      +92-308-4900522
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-[#23CE6B] transition-colors duration-300">
                    <Mail size={16} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email us</p>
                    <a href="mailto:oyemo@contact.com" className="text-white hover:text-[#23CE6B] transition-colors duration-300">
                      oyemo@contact.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-[#23CE6B] transition-colors duration-300">
                    <MapPin size={16} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">Odisha, India</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-[#23CE6B] transition-colors duration-300">
                    <Clock size={16} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Delivery Hours</p>
                    <p className="text-white">24/7 Available</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-white font-semibold text-lg mb-2">Stay Updated</h3>
                <p className="text-gray-400">Get the latest offers and updates delivered to your inbox</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#23CE6B] focus:ring-1 focus:ring-[#23CE6B] text-white placeholder-gray-400 transition-all duration-300 sm:w-64"
                />
                <button className="px-6 py-3 bg-[#23CE6B] hover:bg-[#1fb85d] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm text-center md:text-left">
                Copyright 2025 © Oyemo.com - All Rights Reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-[#23CE6B] transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-[#23CE6B] transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-[#23CE6B] transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;