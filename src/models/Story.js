import { model, Schema } from "mongoose";

const storiesSchema = new Schema({
  account: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  video: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = model("stories", storiesSchema);
export default Story;
