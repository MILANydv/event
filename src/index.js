import { json } from "body-parser";
import consola from "consola";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { join } from "path";
import categoryApis from './apis/category';
import eventApis from "./apis/event";
import profileApis from "./apis/profiles";
// Router imports
import userApis from "./apis/users";
// Import Application Constants
import { DB, PORT } from "./constants";


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
app.use("/events", eventApis);
app.use("/profiles", profileApis);
app.use("/categories", categoryApis);


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
