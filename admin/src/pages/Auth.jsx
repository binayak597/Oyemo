import axios from "axios";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { BASE_API } from "../main";

const Auth = () => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    setLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: data.email, password: data.password }
        : {
            name: data.name,
            email: data.email,
            password: data.password,
            role: "ADMIN",
          };

      const res = await axios.post(`${BASE_API}${endpoint}`, payload);

      if (res.data.success && res.data.data?.role === "ADMIN") {
        const { token, role } = res.data.data;
        setToken(token);
        setAdmin(role);
        localStorage.setItem("admin-token", token);
        localStorage.setItem("admin", role);

        isLogin
          ? toast.success("Login Successful")
          : toast.success("Registration successful");

        navigate("/add");
      } else {
        toast.error("You are not an admin");
      }
      setData({ name: "", email: "", password: "" });
    } catch (error) {
      setData({ name: "", email: "", password: "" });
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setData({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8FCCF]/30 via-white to-[#E8FCCF]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#23CE6B] to-[#23CE6B]/90 p-6 text-center">
          <div className="flex justify-center mb-3">
            {isLogin ? (
              <LogIn className="text-white" size={32} />
            ) : (
              <UserPlus className="text-white" size={32} />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Admin Login" : "Admin Register"}
          </h2>
          <p className="text-green-100 text-sm mt-1">
            {isLogin
              ? "Sign in to your admin account"
              : "Create an admin account"}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for register */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] outline-none transition-colors duration-200"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] outline-none transition-colors duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23CE6B] focus:border-[#23CE6B] outline-none transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#23CE6B] text-white font-medium rounded-lg hover:bg-[#23CE6B]/90 focus:ring-2 focus:ring-[#23CE6B]/50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Loading"
              ) : isLogin ? (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Don't have an admin account?"
                : "Already have an admin account?"}
            </p>
            <button
              onClick={toggleAuthMode}
              className="mt-2 text-sm font-medium text-[#23CE6B] hover:text-[#23CE6B]/80 transition-colors duration-200"
            >
              {isLogin ? "Create new account" : "Sign in instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
