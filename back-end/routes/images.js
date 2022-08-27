import express from "express";
import { getAllImages, postNewImage, updateAltText, deleteImage } from "../models/images.js";

const router = express.Router();

/* GET images listing. */
router.get("/", async function (req, res, next) {
  const data = await getAllImages();
  res.json({ success: true, payload: data });
});

router.post("/", async function(req, res, next) {
  const body = req.body;
  const data = await postNewImage(body);
  res.json({ success: true, payload: data })
})

router.patch("/:id", async function(req, res, next) {
  const id = Number(req.params.id);
  const body = req.body;
  const data = await updateAltText(id, body.altText);
  res.json({ success: true, payload: data })
})

router.delete("/:id", async function(req, res, next) {
  const id = Number(req.params.id);
  const data = await deleteImage(id);
  res.json({ success: true, payload: data })
})

export default router;
