import FoodModel from "../models/food.model.js";
import fs from "fs";

// add food items

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const { name, description, price, category } = req.body;
  try {
    const newFoodItem = new FoodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await newFoodItem.save();

    return res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: newFoodItem,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    return res.status(200).json({
      success: true,
      message: "All foods are fetched successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error", data: null });
  }
};

// remove food item
const removeFood = async (req, res) => {
  const { id } = req.body;
  try {
    const food = await FoodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await FoodModel.findByIdAndDelete(req.body.id);
    return res.status(200).json({
      success: true,
      message: "Food removed successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message, data: null });
  }
};

export { addFood, listFood, removeFood };
