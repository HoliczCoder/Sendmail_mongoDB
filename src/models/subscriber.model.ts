import mongoose, { now } from "mongoose";
import validator from "validator";
import crypto from "crypto";

const subscriber = new mongoose.Schema({
  subscriberName: String,
  email: String,
  categories: [
    {
      category: String,
      lastSendDate: { type: Date, default: Date.now },
      isSendingFail: { type: Boolean, default: false },
    },
  ],
});

export const Subscriber = mongoose.model("Subscriber", subscriber);
