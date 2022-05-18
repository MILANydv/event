import { model, Schema } from "mongoose";
import Paginator from "mongoose-paginate-v2";

const EventSchema = new Schema(
  {
    eventImage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    likes: {
      count: { type: Number, default: 0 },
      user: [
        {
          ref: "users",
          type: Schema.Types.ObjectId,
        },
      ],
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          ref: "users",
          type: Schema.Types.ObjectId,
        },
      },
    ],
    organizer: {
      ref: "users",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

EventSchema.plugin(Paginator);

const Event = model("events", EventSchema);
export default Event;
