const express = require("express");

const Comment = require("../models/Comment");

const router = express.Router();


// ADD COMMENT

router.post("/:postId", async (req, res) => {

  try {

    const { userId, text } = req.body;

    const comment = await Comment.create({
      postId: req.params.postId,
      userId,
      text
    });

    res.status(201).json({
      message: "Comment added",
      comment
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }

});


// GET COMMENTS

router.get("/:postId", async (req, res) => {

  try {

    const comments = await Comment.find({
      postId: req.params.postId
    }).populate("userId", "username");

    res.status(200).json(comments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }

});

module.exports = router;