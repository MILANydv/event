import { Router } from "express";
import { DOMAIN } from "../constants";
import { userAuth } from "../middlewares/auth-guard";
import { uploadEventStoryImage as imageUploader, uploadEventStoryVideo as videoUploader } from "../middlewares/uploader";

const router = Router();

/**
 * @description To Upload event Story Image
 * @api /events/api/event-story-image-upload
 * @access private
 * @type POST
 */
router.post(
  "/api/event-story-image-upload",
  userAuth,
  imageUploader.single("image"),
  async (req, res) => {
    try {
    console.log(req.file);
      if (req.file == undefined) {
        return res.status(400).json({
          status: "error",
          message: "No file selected",
        });
      }
      let { file } = req;
      let filename = DOMAIN + "event-story-images/" + file.filename;
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
 * @description To Upload event Story Video
 * @api /events/api/event-story-video-upload
 * @access private
 * @type POST
 */
router.post(
    "/api/event-story-video-upload",
    userAuth,
    videoUploader.single("video"),
    async (req, res) => {
        try {
            if (req.file == undefined) {
                return res.status(400).json({
                    status: "error",
                    message: "No file selected",
                });
            }
            let { file } = req;
            let filename = DOMAIN + "event-story-videos/" + file.filename;
            return res.status(200).json({
                filename,
                success: true,
                message: "Video Uploaded Successfully.",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Unable to upload event video.",
            });
        }
    }
);




export default router;