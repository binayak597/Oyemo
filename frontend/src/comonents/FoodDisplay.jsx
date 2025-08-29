import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Top dishes near you
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#23CE6B] to-[#E8FCCF] rounded-full"></div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#23CE6B]/20 hover:-translate-y-1"
              >
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Empty State */}
      {food_list.filter(item => category === "All" || category === item.category).length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No dishes found
          </h3>
          <p className="text-gray-600">
            Try selecting a different category to explore more delicious options.
          </p>
        </div>
      )}
      
    </section>
  );
};

export default FoodDisplay;