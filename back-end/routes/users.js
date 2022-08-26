import express from "express";
import { getUsersStarredImages, getUsersPosts } from "../models/users.js";

const router = express.Router();

router.get("/:id/favourites", async function(req, res, next) {
  const id = req.params.id;
  const data = await getUsersStarredImages(id);
  res.json({ success: true, payload: data })
})

router.get("/:id/posts", async function(req, res, next) {
  const id = req.params.id;
  const data = await getUsersPosts(id);
  res.json({ success: true, payload: data })
})

export default router;
