import axios from "axios";
import { MapPin, Package, Phone, ShoppingBag, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { BASE_API } from "../main";

const Orders = () => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const res = await axios.get(`${BASE_API}/order/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (ev, orderId) => {
    const status = ev.target.value;
    try {
      const res = await axios.post(
        `${BASE_API}/order/status`,
        {
          orderId,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchAllOrder();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchAllOrder();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Out for delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Food Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-[#23CE6B]" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Order Management</h3>
          <span className="bg-[#E8FCCF] text-[#23CE6B] text-sm font-medium px-3 py-1 rounded-full">
            {orders.length} orders
          </span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
              {/* Package Icon */}
              <div className="col-span-1 flex justify-center pt-2">
                <Package size={40} className="text-[#ce7623]" />
              </div>

              {/* Order Details */}
              <div className="col-span-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <ShoppingBag size={16} />
                    Order Items
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <User size={16} />
                    Customer Details
                  </h4>
                  <p className="text-sm text-gray-700 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin
                      size={14}
                      className="text-gray-500 mt-0.5 flex-shrink-0"
                    />
                    <div className="text-sm text-gray-600">
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.country +
                          ", " +
                          order.address.zipcode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone size={14} className="text-gray-500" />
                    <p className="text-sm text-gray-600">
                      {order.address.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Count */}
              <div className="col-span-2 text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {order.items.length}
                </p>
                <p className="text-sm text-gray-600">Items</p>
              </div>

              {/* Amount */}
              <div className="col-span-2 text-center">
                <p className="text-xl font-bold text-gray-900">
                  ${order.amount}
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>

              {/* Status */}
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Status
                </label>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`w-full px-3 py-2 text-sm font-medium border rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] outline-none transition-all duration-200 ${getStatusColor(
                    order.status
                  )}`}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={24} className="text-[#ce7623]" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      ${order.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium border rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <ShoppingBag size={16} />
                  Items
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <User size={16} />
                  Customer
                </h4>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="flex items-start gap-1 mb-2">
                  <MapPin
                    size={14}
                    className="text-gray-500 mt-0.5 flex-shrink-0"
                  />
                  <div className="text-sm text-gray-600">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={14} className="text-gray-500" />
                  <p className="text-sm text-gray-600">{order.address.phone}</p>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="w-full px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] outline-none transition-all duration-200"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-sm text-gray-500">
            Orders will appear here when customers place them.
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
