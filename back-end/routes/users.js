import express from "express";
import { getUsersStarredImages } from "../models/users.js";

const router = express.Router();

router.get("/:id/favourites", async function(req, res, next) {
  const id = req.params.id;
  console.log(id);
  const data = await getUsersStarredImages(id);
  res.json({ success: true, payload: data })
})

export default router;
