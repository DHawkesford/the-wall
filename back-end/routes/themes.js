import express from "express";
import { getAllThemes, getTodaysTheme } from "../models/themes.js";

const router = express.Router();

// GET a listing of all themes.
router.get("/", async function (req, res, next) {
  const data = await getAllThemes();
  res.json({ success: true, payload: data });
});

// GET today's theme.
router.get("/today", async function (req, res, next) {
  const data = await getTodaysTheme();
  res.json({ success: true, payload: data });
});

export default router;
