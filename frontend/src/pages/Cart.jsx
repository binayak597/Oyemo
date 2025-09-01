import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { BASE_URL } from "../main";
import toast from "react-hot-toast";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setShowLogin,
    token

  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setIsPromoApplied(true);
    }
  };

  const handleCheckout = () => {

    if(!token){
      setShowLogin(true);
      toast.error("Please login first to order food")
      return;
    }
    navigate("/order")
  }

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  // Filter items that are in cart
  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#E8FCCF]/20 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="text-[#23CE6B] mr-3" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Cart
            </h1>
          </div>
          <p className="text-gray-600">Review your delicious selections</p>
        </div>

        {cartItemsList.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-10">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <ShoppingCart className="text-gray-300 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some delicious items to get started!
              </p>
              <div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#23CE6B]/25 hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Browse Menu
                <ArrowRight className="ml-2" size={18} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white p-4">
                  <h2 className="text-lg font-semibold">Order Items</h2>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead className="bg-[#E8FCCF]/30">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                          Item
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">
                          Price
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">
                          Quantity
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">
                          Total
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItemsList.map((item, index) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-100 hover:bg-[#E8FCCF]/20 transition-colors duration-200"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-4">
                              <div className="relative group">
                                <img
                                  src={`${BASE_URL}/images/storage/` + item.image}
                                  alt={item.name}
                                  className="w-16 h-16 rounded-lg object-cover group-hover:scale-110 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Fresh & Delicious
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-lg font-semibold text-gray-900">
                              ${item.price}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-200 group"
                              >
                                <Minus
                                  size={14}
                                  className="text-gray-600 group-hover:text-red-600"
                                />
                              </button>
                              <span className="w-12 text-center font-semibold text-gray-900">
                                {cartItems[item._id]}
                              </span>
                              <button
                                onClick={() => addToCart(item._id)}
                                className="w-8 h-8 rounded-full bg-[#E8FCCF] hover:bg-[#23CE6B] flex items-center justify-center transition-colors duration-200 group"
                              >
                                <Plus
                                  size={14}
                                  className="text-[#23CE6B] group-hover:text-white"
                                />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-lg font-bold text-[#23CE6B]">
                              ${(item.price * cartItems[item._id]).toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
                            >
                              <Trash2
                                size={16}
                                className="group-hover:scale-110 transition-transform duration-200"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card Layout */}
                <div className="md:hidden space-y-4 p-4">
                  {cartItemsList.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-gradient-to-r from-white to-[#E8FCCF]/10 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={`${BASE_URL}/images/storage/` + item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Fresh & Delicious
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-[#23CE6B]">
                              ${(item.price * cartItems[item._id]).toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-200"
                              >
                                <Minus size={14} className="text-gray-600" />
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {cartItems[item._id]}
                              </span>
                              <button
                                onClick={() => addToCart(item._id)}
                                className="w-8 h-8 rounded-full bg-[#E8FCCF] hover:bg-[#23CE6B] flex items-center justify-center transition-colors duration-200"
                              >
                                <Plus
                                  size={14}
                                  className="text-[#23CE6B] hover:text-white"
                                />
                              </button>
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 ml-2"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Promo Code */}
            <div className="space-y-6">
              {/* Promo Code Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Tag className="text-[#23CE6B] mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Promo Code
                  </h3>
                </div>

                {isPromoApplied ? (
                  <div className="bg-gradient-to-r from-[#E8FCCF] to-[#E8FCCF]/50 rounded-lg p-4 border-2 border-[#23CE6B]">
                    <p className="text-[#23CE6B] font-semibold text-sm">
                      ✓ Promo code applied! 10% discount
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 text-sm mb-3">
                      Have a promo code? Enter it here for discounts
                    </p>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none"
                      />
                      <div
                        onClick={handlePromoCode}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
                      >
                        Apply
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white p-6">
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  {isPromoApplied && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#23CE6B]">Discount (10%)</span>
                      <span className="font-semibold text-[#23CE6B]">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[#23CE6B]">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div
                    onClick={handleCheckout}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#23CE6B]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center flex items-center justify-center group"
                  >
                    Proceed to Checkout
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      size={18}
                    />
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
