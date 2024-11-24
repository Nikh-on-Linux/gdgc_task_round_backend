import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import listrouter from "./router/listing.route.js";
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.use('/listing', listrouter);

app.get('/', (req, res) => {
  res.send('Api is working');
})

// Listen app to the port
const conn = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(res => {
    console.log('Connected to MongoDB and server started');
    app.listen(port, () => {
      console.log("Server started");
    })
  })
  .catch(err => {
    console.log(err);
  })