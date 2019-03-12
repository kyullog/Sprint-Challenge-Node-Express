const express = require("express");
const db = require("../data/helpers/actionModel");
const actionRouter = express.Router();

actionRouter.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json({ actions });
  } catch (error) {
    res.status(500).json({ err: "There was a problem retrieving the actions" });
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
  } catch (error) {
    res.status(500).json({ err: "There was a problem retrieving action" });
  }
});

actionRouter.post("/", async (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ error: "Please include all required fields" });
  } else {
    const newAction = req.body;
    try {
      const success = await db.insert(newAction);
      if (success) {
        res.status(201).json(success);
      } else {
        res.status(400).json({ error: "Please provide a valid project id" });
      }
    } catch (error) {
      res.status(500).json({ err: "There was a problem adding the action" });
    }
  }
});

actionRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ error: "Please include all required fields" });
  } else {
    const edit = req.body;
    try {
      const edited = await db.update(id, edit);
      if (edited) {
        res.status(201).json(edited);
      } else {
        res.status(400).json({ error: "Action could not be added to project" });
      }
    } catch (error) {
      res.status(500).json({ err: "There was a problem editing that action" });
    }
  }
});

actionRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await db.remove(id);
    res.status(200).json({ message: "Action was successfully deleted" });
  } catch (error) {
    res.status(500).json({ err: "There was a problem deleting the action" });
  }
});

module.exports = actionRouter;
