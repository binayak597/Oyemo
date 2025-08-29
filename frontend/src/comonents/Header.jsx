
const Header = () => {
  return (
    <section className="relative h-[70vh] md:h-[75vh] max-h-[600px] w-[90%] sm:w-[88%] mx-auto mt-6 md:mt-8 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
      {/* Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/header.jpg')",
        }}
      >
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Content */}
            <div>
              {/* Main Heading */}
              <h1 className="text-3xl md:text-6xl font-bold text-white">
                Order your
                <span className="block text-[#23CE6B] animate-pulse">
                  favourite food
                </span>
                <span className="block">here</span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-lg md:max-w-xl lg:max-w-2xl">
                Choose from a diverse menu featuring a delectable array of
                dishes crafted with the finest ingredients and culinary
                expertise. Our mission is to satisfy your cravings and elevate
                your dining experience, one delicious meal at a time.
              </p>

              {/* CTA Button */}
              <div className="pt-2 md:pt-4">
                <button className="px-6 md:px-8 py-2 md:py-4 bg-white text-gray-800 font-semibold text-base md:text-lg rounded-full hover:bg-[#23CE6B] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <a href="#menu">View Menu</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
