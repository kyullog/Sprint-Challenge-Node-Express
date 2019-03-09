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

projectRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await db.get(id);
    res.status(200).json(project);
  } catch {
    res
      .status(500)
      .json({ error: "There was a problem retrieving the project" });
  }
});

projectRouter.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.description) {
      res.status(400).json({
        error: "Please provide a valid name and description for project"
      });
    } else {
      const newProject = req.body;
      const success = await db.insert(newProject);
      if (success) {
        res.status(201).json(success);
      } else {
        res.status(400).json({ error: "Please check your request fields" });
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "There was a proplem creating your project" });
  }
});

module.exports = projectRouter;
