import { Router } from "express";
import { DOMAIN } from "../constants";
import SlugGenerator from "../functions/slug-generator";
import { userAuth } from "../middlewares/auth-guard";
import { uploadEventImage as uploader } from "../middlewares/uploader";
import validator from "../middlewares/validator-middleware";
import { Event } from "../models";
import { eventValidations } from "../validators/event-validators";

const router = Router();

/**
 * @description To Upload event Image
 * @api /events/api/event-image-upload
 * @access private
 * @type POST
 */
router.post(
  "/api/event-image-upload",
  userAuth,
  uploader.single("image"),
  async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).json({
          status: "error",
          message: "No file selected",
        });
      }
      let { file } = req;
      let filename = DOMAIN + "event-images/" + file.filename;
      return res.status(200).json({
        filename,
        success: true,
        message: "Image Uploaded Successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to upload event image.",
      });
    }
  }
);

/**
 * @description To create a new event by the authenticated User
 * @api /events/api/create-event
 * @access private
 * @type POST
 */
router.post(
  "/api/create-event",
  userAuth,
  eventValidations,
  validator,
  async (req, res) => {
    try {
      // Create a new Event
      let { body } = req;
      let event = new Event({
        author: req.user._id,
        ...body,
        slug: SlugGenerator(body.title),
      });
      await event.save();
      return res.status(201).json({
        event,
        success: true,
        message: "Your event is published.",
      });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: "Unable to create the event.",
      });
    }
  }
);

/**
 * @description To update a event by the authenticated User
 * @api /events/api/upadte-event
 * @access private
 * @type PUT
 */
router.put(
  "/api/update-event/:id",
  userAuth,
  eventValidations,
  validator,
  async (req, res) => {
    try {
      let { id } = req.params;
      let { user, body } = req;
      let event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }
      if (event.author.toString() !== user._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "event doesn't belong to you.",
        });
      }
      event = await Event.findOneAndUpdate(
        { author: user._id, _id: id },
        {
          ...body,
          slug: SlugGenerator(body.title),
        },
        { new: true }
      );
      return res.status(200).json({
        event,
        success: true,
        message: "event updated successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to update the event.",
      });
    }
  }
);

/**
 * @description To Get all events by All the users
 * @api /events/api/get-event
 * @access public
 * @type GET
 */

  router.get("/api/get-event", async (req, res) => {
    try {
      let events = await Event.find();
      return res.status(200).json({
        events,
        success: true,
        message: "Events fetched successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to fetch events.",
      });
    }
  }
);



/**
 * @description To like a event by authenticated user
 * @api /events/api/like-event
 * @access private
 * @type PUT
 */
router.put("/api/like-event/:id", userAuth, async (req, res) => {
  try {
    let { id } = req.params;
    let event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "event not found.",
      });
    }

    let user = event.likes.user.map((id) => id.toString());
    if (user.includes(req.user._id.toString())) {
      return res.status(404).json({
        success: false,
        message: "You have already liked this event.",
      });
    }

    event = await Event.findOneAndUpdate(
      { _id: id },
      {
        likes: {
          count: event.likes.count + 1,
          user: [...event.likes.user, req.user._id],
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "You liked this event.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to like the event. Please try again later.",
    });
  }
});


/**
 * @description To comment a event by authenticated user
 * @api /events/api/comment-event
 * @access private
 * @type PUT
 */

router.put('/api/comment-event/:id', userAuth, async (req, res) => {
  try {
    let { id } = req.params;
    let { body } = req;
    let event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "event not found.",
      });
    }

    let user = event.likes.user.map((id) => id.toString());
    if (user.includes(req.user._id.toString())) {
      return res.status(404).json({
        success: false,
        message: "You have already commented this event.",
      });
    }

    event = await Event.findOneAndUpdate(
      { _id: id },
      {
        comments: {
          count: event.comments.count + 1,
          user: [req.user._id],
          comment: [body.comment],
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "You commented this event.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Unable to comment the event. Please try again later.",
    });
  }
}
);


export default router;
