import { Schema } from "mongoose";

const storiesSchema = new Schema({
  account: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  video: {
    type: String,
    required: false,
  },

  image: {
    type: String,
    required: flase,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
