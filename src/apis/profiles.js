import { Router } from "express";
import { DOMAIN } from "../constants";
import { userAuth } from "../middlewares/auth-guard";
import uploader from "../middlewares/uploader";
import { Profile, User } from "../models";

const router = Router();

/**
 * @description To create profile of the authenticated User
 * @type POST <multipart-form> request
 * @api /profiles/api/create-profile
 * @access Private
 */

router.post(
  "/api/create-profile",
  userAuth,
  uploader.single("avatar"),
  async (req, res) => {
    try {
      // check if user has a profile
      const userprofile = await Profile.findOne({
        user: req.user.id,
      });
      if (userprofile) {
        return res.status(400).json({
          status: "error",
          message: "You already have a profile",
        });
      }
      // create new profile
      if (req.file == undefined || req.file == null) {
        return res.status(400).json({
          status: "error",
          message: "No file selected",
        });
      }
      let { file } = req;
      let { body } = req;
      let filename = DOMAIN + "uploads/" + file.filename;
      let profile = await Profile.create({
        account: req.user._id,
        avatar: filename,
        facebook: body.facebook,
        linkedin: body.linkedin,
        github: body.github,
      });
      return res.status(200).json({
        profile,
        success: true,
        message: "Profile Created Successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to create profile.",
      });
    }
  }
);

/**
 * @description To Get the authenticated user's profile
 * @api /profiles/api/my-profile
 * @access Private
 * @type GET
 */
router.get("/api/my-profile", userAuth, async (req, res) => {
  try {
    let profiles = await Profile.find({ account: req.user._id }).populate(
      "account"
    );
    if (!profiles) {
      return res.status(404).json({
        success: false,
        message: "Your profile is not available.",
      });
    }
    return res.status(200).json({
      success: true,
      profiles,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to get the profile.",
    });
  }
});

/**
 * @description To update autheticated user's profile
 * @type PUT <multipart-form> request
 * @api /profiles/api/update-profile
 * @access Private
 */
router.put(
  "/api/update-profile",
  userAuth,
  uploader.single("avatar"),
  async (req, res) => {
    try {
      let { body } = req;
      let { file } = req;
      let filename = DOMAIN + "uploads/" + file.filename;
      let profile = await Profile.findOneAndUpdate(
        { account: req.user._id },
        {
          ...body,
          avatar: filename,
        },
        { new: true }
      );
      return res.status(200).json({
        profile,
        success: true,
        message: "Profile updated successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to update the profile.",
      });
    }
  }
);

/**
 * @description To get user's profile with the username
 * @api /profiles/api/update-profile
 * @access Public
 * @type GET
 */
router.get("/api/profile-user/:username", async (req, res) => {
  try {
    let { username } = req.params;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    let profile = await Profile.findOne({ account: user._id });
    return res.status(200).json({
      profile: {
        ...profile.toObject(),
        account: user.getUserInfo(),
      },
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

export default router;
