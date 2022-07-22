import express, { query } from "express";
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import { getAllStars, getUsersStars, postNewVote } from "../models/stars.js";

const router = express.Router();

const checkJwt = auth({
  audience: 'https://the-wall-dan-blake.herokuapp.com',
  issuerBaseURL: `https://dev-bpskse9l.us.auth0.com/`,
});

// GET a listing of all stars.
router.get("/", async function (req, res, next) {
  const data = await getAllStars();
  res.json({ success: true, payload: data });
});

// GET a listing of a user's starred images
router.get("/:id", checkJwt, requiredScopes('read:current_user_stars'), async function(req, res, next) {
  const id = Number(req.params.id);
  const data = await getUsersStars(id);
  res.json({ success: true, payload: data })
})

router.post("/:userID/:imageID", async function(req, res, next) {
  const userID = req.params.userID;
  const imageID = req.params.imageID;
  const data = await postNewVote(userID, imageID);
  res.json({ success: true, payload: data })
})

// router.patch("/:id", async function(req, res, next) {
  // const id = Number(req.params.id);
  // const data = await voteForImage(id);
//   res.json({ success: true, payload: data })
// })

export default router;
