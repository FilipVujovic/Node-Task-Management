const express = require('express');
const Task = reqire('../models/task');
const router = new express.Router()

router.delete("/tasks/:id", async (req, res) => {
    try {
      const task = Task.findByIdAndDelete(req.params.id);
  
      if(!task) return res.status(404).send();
  
      res.send(task);
    } catch (error) {
      res.status(500).send();    
    }
  })
  
  router.get("/tasks", async (req, res) => {
    try {
      const allTasks = await Task.find();
      res.send(allTasks);
    } catch (error) {
      res.status(500).send();
    }
  
    //   Task.find({})
    //     .then((tasks) => {
    //       res.send(tasks);
    //     })
    //     .catch((err) => {
    //       res.status(500).send(err);
    //     });
  });
  
  router.get("/task/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const task = await Task.findById(_id);
      if (!task) return res.status(404).send();
    } catch (error) {
      res.status(500).send();
    }
  
    //   Task.findById(req.params.id)
    //     .then((task) => {
    //       if (!task) return res.status(404).send();
    //       res.send(task);
    //     })
    //     .catch((err) => {
    //       res.status(500).send(err);
    //     });
  });
  
  router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [];
  
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation)
      return res.status(400).send({ error: "Invalid update." });
  
    try {
      const task = Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //Returns the updated object
        runValidators: true //Validators from the mongoose model
      });
  
      if (!task) return res.status(404).send();
  
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
  
    try {
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(500).send();
    }
  
    //   task
    //     .save()
    //     .then(() => {
    //       res.status(201).send(task);
    //     })
    //     .catch((err) => {
    //       res.status(400).send(err);
    //     });
  });
  
module.exports = router;