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

actionRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const actions = await db.get(id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ error: "Actions could not be found" });
    }
  } catch {
    res.status(500).json({ error: "There was a problem retrieving actions" });
  }
});

module.exports = actionRouter;
