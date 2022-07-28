import express from "express";
import { getAllImages, postNewImage } from "../models/images.js";

const router = express.Router();

/* GET images listing. */
router.get("/", async function (req, res, next) {
  const data = await getAllImages();
  res.json({ success: true, payload: data });
});

router.post("/", async function(req, res, next) {
  const body = req.body;
  const data = await postNewImage(body.url);
  res.json({ success: true, payload: data })
})

export default router;
