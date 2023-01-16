import mongoose from "mongoose";
import validator from 'validator';
import crypto from "crypto";

const subscriber = new mongoose.Schema({
    subscriberName: String,
    email: String,
    category: [],
})

export const Subscriber = mongoose.model('Subscriber', subscriber);
