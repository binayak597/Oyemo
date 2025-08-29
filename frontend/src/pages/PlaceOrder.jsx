import {
  Check,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handlePlaceOrder = async (ev) => {
    ev.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
      });
      setIsProcessing(false);
    }, 2000);
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#E8FCCF]/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600">
            We're almost there! Just need a few more details
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Delivery Information Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white p-6">
                <div className="flex items-center">
                  <MapPin className="mr-3" size={24} />
                  <h2 className="text-xl font-semibold">
                    Delivery Information
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="relative group">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                      />
                      <input
                        required
                        name="firstName"
                        value={data.firstName}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="John"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="relative group">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                      />
                      <input
                        required
                        name="lastName"
                        value={data.lastName}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Doe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                      />
                      <input
                        required
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="john.doe@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                      />
                      <input
                        required
                        name="phone"
                        value={data.phone}
                        onChange={onChangeHandler}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <div className="relative group">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                      />
                      <input
                        required
                        name="street"
                        value={data.street}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="123 Main Street, Apt 4B"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        required
                        name="city"
                        value={data.city}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="New York"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        required
                        name="state"
                        value={data.state}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="NY"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        required
                        name="zipcode"
                        value={data.zipcode}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="10001"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        required
                        name="country"
                        value={data.country}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="United States"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white p-6">
                <div className="flex items-center">
                  <CreditCard className="mr-3" size={24} />
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {/* Credit Card Option */}
                  <div
                    onClick={() => setSelectedPayment("card")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedPayment === "card"
                        ? "border-[#23CE6B] bg-[#E8FCCF]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                          selectedPayment === "card"
                            ? "border-[#23CE6B] bg-[#23CE6B]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPayment === "card" && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <CreditCard
                        size={20}
                        className={
                          selectedPayment === "card"
                            ? "text-[#23CE6B]"
                            : "text-gray-600"
                        }
                      />
                      <span
                        className={`font-medium ${
                          selectedPayment === "card"
                            ? "text-[#23CE6B]"
                            : "text-gray-900"
                        }`}
                      >
                        Credit/Debit Card
                      </span>
                    </div>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div
                    onClick={() => setSelectedPayment("cod")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedPayment === "cod"
                        ? "border-[#23CE6B] bg-[#E8FCCF]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                          selectedPayment === "cod"
                            ? "border-[#23CE6B] bg-[#23CE6B]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPayment === "cod" && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">
                          $
                        </span>
                      </div>
                      <span
                        className={`font-medium ${
                          selectedPayment === "cod"
                            ? "text-[#23CE6B]"
                            : "text-gray-900"
                        }`}
                      >
                        Cash on Delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Time Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-[#23CE6B] mr-3" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Estimated Delivery
                </h3>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-[#E8FCCF]/30 rounded-lg">
                <Truck className="text-[#23CE6B]" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">25-35 minutes</p>
                  <p className="text-sm text-gray-600">Standard delivery</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white p-6">
                <h3 className="text-xl font-semibold">Order Summary</h3>
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

                <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-4">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-[#23CE6B]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 py-3 bg-gray-50 rounded-lg mt-4">
                  <Shield className="text-green-600" size={16} />
                  <span className="text-sm text-gray-600">
                    SSL Secured Payment
                  </span>
                </div>

                {/* Place Order Button */}
                <div
                  onClick={handlePlaceOrder}
                  className={`w-full mt-6 py-4 font-semibold rounded-lg transition-all duration-200 cursor-pointer text-center flex items-center justify-center group ${
                    isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white hover:shadow-lg hover:shadow-[#23CE6B]/25 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <CreditCard
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={18}
                      />
                    </>
                  )}
                </div>

                <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                  By placing your order, you agree to our terms of service and
                  privacy policy. Your order will be confirmed via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
