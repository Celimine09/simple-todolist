import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import dotenv from 'dotenv'; 

dotenv.config();

const app: Express = express()
const PORT: string | number = process.env.PORT || 4001

app.use(cors())
app.use(express.json()) // Add this line to parse JSON request bodies
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.53v3a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`

mongoose
  .connect(uri, { dbName: process.env.MONGO_DB })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })