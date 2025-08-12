import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/userModels.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/quote", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      businessName,
      phone,
      serviceRequested,
      houseNumber,
      city,
      state,
      zipcode,
      date
    } = req.body;

    // Save to DB
    const newQuote = await User.create({
      firstName,
      lastName,
      email,
      businessName,
      phone,
      serviceRequested,
      houseNumber,
      city,
      state,
      zipcode,
      date
    });

    res.status(201).json({
      message: "Quote request submitted successfully",
      data: newQuote
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("App is working");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
