import { useState } from "react";
import { Upload, Plus, ImagePlus } from "lucide-react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { BASE_API } from "../main";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { name, description, price, category } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("category", category);
    formData.append("image", image);

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_API}/food/add`, formData);
      if (res.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success("Food item Added Successfully" || response.data.message);
      }
    } catch (error) {
      toast.error("Unable to add food item" || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Plus className="text-[#23CE6B]" size={28} />
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="flex items-center justify-center">
              <label
                htmlFor="image"
                className="group relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#23CE6B] transition-colors duration-200 cursor-pointer overflow-hidden"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-[#23CE6B] transition-colors duration-200">
                    <ImagePlus size={24} className="mb-2" />
                    <span className="text-xs font-medium">Upload Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl">
                  <Upload className="text-white" size={20} />
                </div>
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                required
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Enter product name"
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] transition-colors duration-200 outline-none"
              required
            />
          </div>

          {/* Product Description */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="4"
              placeholder="Enter product description"
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] transition-colors duration-200 outline-none resize-none"
              required
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] transition-colors duration-200 outline-none bg-white"
                required
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] transition-colors duration-200 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#23CE6B] text-white font-medium rounded-lg hover:bg-[#23CE6B]/90 focus:ring-2 focus:ring-[#23CE6B]/50 transition-all duration-200 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                "Loading"
              ) : (
                <>
                  <Plus size={18} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
