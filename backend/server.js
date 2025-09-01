import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import routes from './routes/index.routes.js'

const app = express()

app.use(express.json())

const allowedOrigins = [
  process.env.FRONTEND_URL1,
  process.env.FRONTEND_URL2
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
app.use("/images/storage", express.static("uploads"))

app.use("/api/v1.0", routes);

app.get("/", (req, res) => {
  res.send("hello")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is up and running at PORT ${PORT}`)
})