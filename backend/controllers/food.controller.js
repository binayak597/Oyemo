import Busboy from "busboy";
import FoodModel from "../models/food.model.js";
import cloudinary from "../config/cloudinary.js";

// add food items

const addFood = (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const foodData = {};
  let fileUploaded = false;

  busboy.on("field", (fieldname, val) => {
    foodData[fieldname] = val;
  });

  busboy.on("file", (fieldname, file, filename) => {
    // Upload directly to Cloudinary via stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "food_items",
        public_id: `${Date.now()}-${filename}`,
        resource_type: "image",
      },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message, data: null });
        }

        try {
          const newFoodItem = new FoodModel({
            ...foodData,
            image: result.secure_url,
            imageId: result.public_id,
          });

          await newFoodItem.save();

          return res.status(201).json({
            success: true,
            message: "Food added successfully",
            data: newFoodItem,
          });
        } catch (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message, data: null });
        }
      }
    );

    file.pipe(uploadStream);
    fileUploaded = true;
  });

  busboy.on("finish", () => {
    if (!fileUploaded) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required", data: null });
    }
  });

  req.pipe(busboy);
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
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    const food = await FoodModel.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found", data: null });
    }

    // Delete image from Cloudinary if exists
    if (food.imageId) {
      await cloudinary.uploader.destroy(food.imageId);
    }
    await FoodModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Food removed successfully",
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

export { addFood, listFood, removeFood };
