import { model, Schema } from "mongoose";
import Paginator from "mongoose-paginate-v2";

const EventSchema = new Schema(
  {
    eventImage: {
      type: String,
      default:
        "https://hire4event.com/blogs/wp-content/uploads/2019/05/Event-Management-Proposal-Hire4event.jpg",
    },
    slug: {
      type: String,
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
      type: Schema.Types.ObjectId,
      ref: "categories", // this will take Category id not all object
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    specialApperence: {
      type: String,
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
