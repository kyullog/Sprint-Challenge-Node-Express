const express = require("express");
const db = require("../data/helpers/projectModel");
const projectRouter = express.Router();

projectRouter.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch {
    res
      .status(500)
      .json({ error: "There was a problem retrieving the projects" });
  }
});

module.exports = projectRouter;
