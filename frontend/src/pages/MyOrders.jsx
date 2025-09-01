import axios from "axios";
import { Package, ShoppingBag } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { BASE_API } from "../main";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(`${BASE_API}/order/userOrders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600";
      case "processing":
        return "text-yellow-600";
      case "preparing":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-[#23CE6B]" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
          <span className="bg-[#E8FCCF] text-[#23CE6B] text-sm font-medium px-3 py-1 rounded-full">
            {data.length}
          </span>
        </div>
      </div>

      {/* Orders Container */}
      <div className="space-y-4">
        {data.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-6 gap-6 items-center">
              <div className="flex justify-center">
                <Package size={40} className="text-[#ce7623]" />
              </div>

              <div className="col-span-2">
                <p className="text-sm text-gray-900 leading-relaxed">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ", ";
                    }
                  })}
                </p>
              </div>

              <div className="text-center">
                <p className="font-semibold text-lg text-gray-900">
                  ${order.amount}.00
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Items: {order.items.length}
                </p>
                <div className="flex items-center justify-center mt-1">
                  <span className="w-2 h-2 bg-[#23CE6B] rounded-full mr-2"></span>
                  <span
                    className={`font-medium text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 bg-[#E8FCCF] text-[#23CE6B] font-medium rounded-lg hover:bg-[#23CE6B] hover:text-white transition-colors duration-200"
                >
                  Track Order
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              <div className="flex items-start gap-4">
                <Package
                  size={32}
                  className="text-[#ce7623] flex-shrink-0 mt-1"
                />

                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " X " + item.quantity;
                        } else {
                          return item.name + " X " + item.quantity + ", ";
                        }
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-lg text-gray-900">
                        ${order.amount}.00
                      </span>
                      <span className="text-sm text-gray-600">
                        {order.items.length} items
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-[#23CE6B] rounded-full mr-2"></span>
                      <span
                        className={`font-medium text-sm ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={fetchOrders}
                    className="w-full py-2 bg-[#E8FCCF] text-[#23CE6B] font-medium rounded-lg hover:bg-[#23CE6B] hover:text-white transition-colors duration-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-sm text-gray-500">
            Your order history will appear here once you place an order.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
