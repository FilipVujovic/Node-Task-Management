const express = require('express');
const User = reqire('../models/user');
const router = new express.Router()

router.get("/users", async (req, res) => {
    try {
      const allUsers = await User.find();
      res.send(allUsers);
    } catch (error) {
      res.status(400).send(error);
    }
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
  });
  
  router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const user = User.findById(_id);
  
      if (!user) return res.status(404).send();
      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
    //   User.findById(req.params.id)
    //     .then((user) => {
    //       if (!user) return res.status(404).send();
    //       res.send(user);
    //     })
    //     .catch((err) => {
    //       res.status(500).send(err);
    //     });
  });
  
  router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
  
    //If even one update is missing from allowedUpdated every will return false
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation)
      return res.status(400).send({ error: "Invalid update." });
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!user) {
        return res.status(404).send();
      }
  
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.post("/users", async (req, res) => {
    const user = new User(req.body);
  
    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
  });
  
  router.delete("/users/:id", async (req, res) => {
    try {
      const user = User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
  });

  module.exports = router;