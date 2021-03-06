const express = require("express");
const db = require("../data/helpers/projectModel");
const projectRouter = express.Router();

projectRouter.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ err: "There was a problem retrieving the projects" });
  }
});

projectRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await db.get(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ err: "There was a problem retrieving the project" });
  }
});

projectRouter.get("/:id/actions", async (req, res) => {
  const id = req.params.id;
  try {
    const actions = await db.getProjectActions(id);
    if (actions.length) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({
        error:
          "Project does not exist, or no actions are associated with project"
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a problem retrieving those actions" });
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
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a proplem creating your project" });
  }
});

projectRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const editProject = req.body;
  try {
    const edited = await db.update(id, editProject);
    if (edited) {
      res.status(201).json(edited);
    } else {
      res.status(400).json({ error: "Please provide a valid id" });
    }
  } catch (error) {
    res.status(500).json({ error: "There was a problem editing the project" });
  }
});

projectRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await db.remove(id);
    if (deleted) {
      res.status(200).json({ message: "Project succesfully deleted." });
    } else {
      res.status(400).json({ error: "Please provide a valid project id" });
    }
  } catch (error) {
    res.status(500).json({ error: "There was a problem deleting the project" });
  }
});

module.exports = projectRouter;
