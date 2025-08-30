import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid name or password",
          data: null,
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid name or password",
          data: null,
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "User Loggedin Successfully",
      data: {
        token,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

// register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists", data: null });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter valid email",
          data: null,
        });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter strong password",
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: {
        token,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

export { loginUser, registerUser };
