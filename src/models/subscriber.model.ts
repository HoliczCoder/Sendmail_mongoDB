import mongoose from "mongoose";

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
