import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_API } from "../main";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const res = await axios.post(`${BASE_API}/order/verify`, {
      success,
      orderId,
    });
    if (res.data.success) {
      navigate("/my-orders");
      toast.success("Order Placed Successfully");
    } else {
      toast.error("Something went wrong");
      navigate("/");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-[#23CE6B] rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
