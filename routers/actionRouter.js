const express = require("express");
const db = require("../data/helpers/actionModel");
const actionRouter = express.Router();

actionRouter.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json({ actions });
  } catch {
    res
      .status(500)
      .json({ error: "There was a problem retrieving the actions" });
  }
});

module.exports = actionRouter;
