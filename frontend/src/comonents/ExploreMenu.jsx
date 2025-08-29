import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" id="menu">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Explore our menu
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>

      {/* Menu Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="group flex flex-col items-center cursor-pointer"
            >
              <div
                className={`relative rounded-full transition-all duration-300 hover:scale-110 ${
                  category === item.menu_name
                    ? "ring-4 ring-[#23CE6B] ring-offset-2 shadow-xl"
                    : "hover:shadow-lg"
                }`}
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full object-cover relative z-10"
                />
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 rounded-full bg-[#23CE6B] transition-all duration-300 ${
                    category === item.menu_name
                      ? "bg-opacity-10"
                      : "bg-opacity-0 group-hover:bg-opacity-20"
                  }`}
                ></div>
              </div>
              <p
                className={`mt-3 text-sm lg:text-base font-medium text-center transition-colors duration-300 ${
                  category === item.menu_name
                    ? "text-[#23CE6B] font-semibold"
                    : "text-gray-700 group-hover:text-[#23CE6B]"
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </section>
  );
};

export default ExploreMenu;
