import express from 'express'
import mongoose from 'mongoose'
const app = express()
import 'dotenv/config'
import bookRoutes from "./Book/bookroute.js"
import cors from 'cors'
const port = process.env.PORT
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

app.use("/api/books", bookRoutes)

async function connectDB() {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit if connection fails
    }
  }
  connectDB();

app.get('/', (req, res) => {
  res.send('Hello User!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})