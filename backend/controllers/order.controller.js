import dotenv from 'dotenv'
dotenv.config()

import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontend_url = process.env.FRONTEND_URL

// placing user order for frontend
const placeOrder = async (req, res) => {
  
  const {items, amount, address} = req.body
  try {
    const newOrder = new OrderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    //empty the cart object from usermodel
    await UserModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.status(200).json({ success: true, message: "Payment done successfully", data: {
      session_url: session.url
    } });
  } catch (error) {
    
    return res.status(500).json({ success: false, message: error.messgae, data: null });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    
    if (success == "true") {
      const orderDetails = await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.status(200).json({ success: true, message: "Order verification done successfully", data: {
        orderDetails
      } });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      return res.status(500).json({ success: false, message: "Order not successfully done", data: null });
    }
  } catch (error) {
    
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId });
    return res.status(200).json({ success: true, messgae: "Fetched user orders successfully", data: orders });
  } catch (error) {
    
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      const orders = await OrderModel.find({});
      return res.status(200).json({ success: true, message: "Fetched all orders of your resturant", data: {
        orders
      } });
    } else {
      return res.status(401).json({ success: false, message: "You are not admin", data: null });
    }
  } catch (error) {
    
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// for updating status
const updateStatus = async (req, res) => {

  const {orderId, status} = req.body;
  try {
    let userData = await UserModel.findById(req.userId);
    
    if (userData && userData.role === "admin") {
      let orderDetails = await OrderModel.findByIdAndUpdate(orderId, {
        status
      });
      return res.status(200).json({ success: true, message: "Status Updated Successfully", data: {
        orderDetails
      } });
    }else{
      return res.status(401).json({ success: false, message: "You are not an admin", data: null });
    }
  } catch (error) {
   
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };