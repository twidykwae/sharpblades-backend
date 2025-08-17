import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Quote from "./models/quoteModels.js";
import { sendQuoteEmails } from "./utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { authenticationToken } from "./middleware/auth.js";
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
    const newQuote = await Quote.create({
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

    //jwt for security
    const token = jwt.sign(
      { email: newQuote.email },
      process.env.JWT_SECRET,
      {expiresIn: "24h" }
    )

    //need to add quote to wave
    const magicLink = `http://localhost:3000/user/dashboard?token=${token}`;
    
    await sendQuoteEmails(newQuote, magicLink)

    

    res.status(201).json({
      message: "Quote request submitted successfully",
      data: newQuote,
      magicLink: magicLink
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/user/dashboard", authenticationToken, async(req, res) => {
  try{
    const userQuotes = await Quote.find({ email: req.user.email }).sort({ date: -1 });
    res.json(userQuotes)
  }catch(error){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"})
  }
})


app.get("/", (req, res) => {
  res.send("App is working");
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
