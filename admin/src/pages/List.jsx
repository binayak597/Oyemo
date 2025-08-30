import { useEffect, useState } from "react";
import { List as ListIcon, Trash2, Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_API } from "../main";

const url = import.meta.env.VITE_URL

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API}/food/list`);
      if (res.data.success) {
        setList(res.data.data);
        toast.success("Fetch food item list successfully" || res.data.message);
      }
    } catch (error) {
      toast.error("Unable to fetch the food items" || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const res = await axios.post(`${BASE_API}/food/remove`, { id: foodId });
      await fetchList();
      if (res.data.success) {
        toast.success(
          "Food item deleted successfully" || response.data.message
        );
      }
    } catch (error) {
      toast.error("Unable to delete the food item" || error.message);
    }
  };

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchList();
  }, []);

  if(loading) return <h1>Loading</h1>

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <ListIcon className="text-[#23CE6B]" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">All Food Items</h2>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-600">
          <div className="col-span-1">Image</div>
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-3 text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredList.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Image */}
              <div className="col-span-2 sm:col-span-1">
                <img
                  src={`${url}/images/storage/` + item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg shadow-sm"
                />
              </div>

              {/* Name */}
              <div className="col-span-6 sm:col-span-4 flex flex-col justify-center">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  {item.name}
                </h3>
                {/* Mobile: Show category and price below name */}
                <div className="sm:hidden flex items-center gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm">
                    ${item.price}
                  </span>
                </div>
              </div>

              {/* Category - Hidden on mobile */}
              <div className="hidden sm:flex col-span-2 items-center">
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Price - Hidden on mobile */}
              <div className="hidden sm:flex col-span-2 items-center">
                <span className="font-semibold text-gray-900">
                  ${item.price}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-4 sm:col-span-3 flex items-center justify-end sm:justify-center">
                <button
                  onClick={() => removeFood(item._id)}
                  className="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                  title="Delete item"
                >
                  <Trash2
                    size={16}
                    className="group-hover:scale-110 transition-transform duration-150"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredList.length === 0 && (
          <div className="text-center py-12">
            <ListIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Add some food items to get started."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
