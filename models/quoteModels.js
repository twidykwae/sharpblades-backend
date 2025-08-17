import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  businessName: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  serviceRequested: {
    type: String,
    enum: ["Service A", "Service B", "Service C"], // update with real services
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipcode: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "canceled"],
    default: "pending",
  }
}, { timestamps: true });

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
