const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router
  .use(auth)
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Comment.find({}).sort({createdAt: 'desc'});
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
      });
      res.status(201).send(newComment);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router
  .use(auth)
  .route("/:commentId")
  .delete(async (req, res) => {
    try {
      const { commentId } = req.params;
      const removedComment = await Product.findById(commentId);
      await removedComment.remove();
      res.status(200).end();
      return;
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { commentId } = req.params;
      const updatedComment = await Product.findByIdAndUpdate(
        commentId,
        req.body,
        { new: true }
      );
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
