import UserModel from "../models/user.model.js";

// add items to user cart
const addToCart = async (req, res) => {
  const { itemId } = req.body;
  try {
    let userData = await UserModel.findById(req.userId);
    let cartData = userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    
    userData = await UserModel.findByIdAndUpdate(req.userId, { cartData });

    return res
      .status(200)
      .json({
        success: true,
        message: "Fooditem added to cart successfully",
        data: userData,
      });

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  const { itemId } = req.body;
  try {
    let userData = await UserModel.findById(req.userId);
    let cartData = userData.cartData;
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }
    userData = await UserModel.findByIdAndUpdate(req.userId, { cartData });
    return res
      .status(200)
      .json({
        success: true,
        message: "Fooditem removed from cart successfully",
        data: userData,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.userId);
    let cartData = userData.cartData;
    return res.status(200).json({
      success: true,
      message: "Fetched user cart data successfully",
      data: {
        cartData,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

export { addToCart, removeFromCart, getCart };
