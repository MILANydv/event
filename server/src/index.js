import { json } from "body-parser";
import consola from "consola";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { join } from "path";
import postApis from "./apis/posts";
import profileApis from "./apis/profiles";
// Router imports
import userApis from "./apis/users";
// Import Application Constants
import { DB,PORT } from "./constants";

// const DB =
//   "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/event_management?retryWrites=true&w=majority";

// Import passport middleware
require("./middlewares/passport-middleware");

// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(express.static(join(__dirname, "./uploads")));

// Inject Sub router and apis
app.use("/users", userApis);
app.use("/posts", postApis);
app.use("/profiles", profileApis);

const main = async () => {
  try {
    // Connect with the database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    consola.success("DATABASE CONNECTED...");
    // Start application listening for request on server
    app.listen(PORT, () => consola.success(`Sever started on port ${PORT}`));
  } catch (err) {
    consola.error(`Unable to start the server \n${err.message}`);
  }
};

main();
