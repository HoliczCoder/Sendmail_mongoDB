import { Request, Response } from "express";
import { Subscriber } from "../models/subscriber.model";
import mongoose from "mongoose";
export const createSubscriber = async (req: Request, res: Response) => {
  try {
    const subscriber = new Subscriber({
      subscriberName: req.body.subscriberName,
      email: req.body.email,
      category: [...req.body.category],
    });
    const result = await subscriber.save();
    console.log("successful", result);
    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error,
    });
  }
};

export const getSubscriber = async (req: Request, res: Response) => {
  try {
    const Subscriber = mongoose.model("Subscriber");
    const result = await Subscriber.find({}, function (err: any, docs: any) {
      if (err) {
        console.log(err);
      } else {
        // console.log("First function call : ", docs);
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error,
    });
  }
};
