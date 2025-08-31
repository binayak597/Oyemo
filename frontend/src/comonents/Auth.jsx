import { useState, useEffect, useContext } from "react";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { BASE_API } from "../main";

const Auth = ({ setShowLogin }) => {
  const [currentPage, setCurrentPage] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { setToken } = useContext(StoreContext);

  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleClose = () => {
    setIsVisible(false);
    // Delay actual close to allow exit animation
    setTimeout(() => {
      setShowLogin(false);
    }, 300);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    let pageUrl;
    if (currentPage === "Login") {
      pageUrl = `${BASE_API}` + "/auth/login";
    } else {
      pageUrl = `${BASE_API}` + "/auth/register";
    }

    setLoading(true);

    try {
      const res = await axios.post(pageUrl, data);
      if (res.data.success) {
        const { token, user } = res.data.data;

        setToken(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        if (currentPage === "Login") {
          toast.success("Login is Successful");
        } else {
          toast.success("Registration is Successful");
        }

        setIsVisible(false);
        setShowLogin(false);
      }
    } catch (error) {
      toast.error(error.message || "Registration or login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isVisible
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-black/0 backdrop-blur-none pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-out transform ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-8"
        }`}
      >
        {/* Decorative gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#23CE6B] to-[#E8FCCF] rounded-2xl p-[2px]">
          <div className="h-full w-full bg-white rounded-2xl" />
        </div>

        <div className="relative p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 transition-all duration-300">
                {currentPage}
              </h2>
              <p className="text-sm text-gray-500">
                {currentPage === "Login"
                  ? "Welcome back! Please sign in to your account"
                  : "Create your account to get started"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
            >
              <X
                size={20}
                className="group-hover:rotate-90 transition-transform duration-200"
              />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name field for Sign Up */}
            {currentPage === "Sign Up" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                  />
                  <input
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
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
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#23CE6B] transition-colors duration-200"
                />
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#23CE6B]/20 focus:border-[#23CE6B] transition-all duration-200 outline-none hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#23CE6B]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:ring-2 focus:ring-[#23CE6B]/20 focus:outline-none cursor-pointer text-center"
            disabled={loading}
          >
            {loading
              ? "Loading"
              : currentPage === "Sign Up"
              ? "Create Account"
              : "Sign In"}
          </button>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-[#23CE6B] border-gray-300 rounded focus:ring-[#23CE6B] focus:ring-2 transition-colors duration-200"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              By continuing, I agree to the{" "}
              <span className="text-[#23CE6B] hover:underline cursor-pointer font-medium">
                terms of use
              </span>{" "}
              &{" "}
              <span className="text-[#23CE6B] hover:underline cursor-pointer font-medium">
                privacy policy
              </span>
              .
            </p>
          </div>

          {/* Switch between Login/Sign Up */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              {currentPage === "Login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setCurrentPage("Sign Up")}
                    className="text-[#23CE6B] font-semibold hover:text-[#23CE6B]/80 hover:underline transition-all duration-200"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setCurrentPage("Login")}
                    className="text-[#23CE6B] font-semibold hover:text-[#23CE6B]/80 hover:underline transition-all duration-200"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
