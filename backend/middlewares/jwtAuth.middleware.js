import jwt from "jsonwebtoken";

const jwtAuth = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized", data: null });
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    
    return res.status(500).json({success:false,message:error.message, data: null});
  }
};
export default jwtAuth;