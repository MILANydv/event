import { model, Schema } from "mongoose";

const ProfileSchema = new Schema(
  {
    account: {
      ref: "users",
      type: Schema.Types.ObjectId,
    },
    avatar: {
      type: String,
      required: false,
    },

    facebook: {
      type: String,
      required: false,
    },

    linkedin: {
      type: String,
      required: false,
    },

    github: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

const Profile = model("profiles", ProfileSchema);
export default Profile;
