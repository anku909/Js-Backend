import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    Subscriber: {
      type: Schema.Types.objectId,
      ref: "User",
    },
    channel: {
      type: Schema.Types.objectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
