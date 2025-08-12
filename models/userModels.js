import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    unique: true,
    lowercase: true,
    trim: true,
  },
  businessName: {
    type: String,
    trim: true,
  },
  phone: {
    type: String, // store as string to preserve leading zeros & formatting
    trim: true,
  },
  serviceRequested: {
    type: String,
    enum: ["Service A", "Service B", "Service C"],
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
    type: String, // will come from dropdown
    required: true,
    trim: true,
  },
  zipcode: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
