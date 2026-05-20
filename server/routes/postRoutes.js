const express = require("express");

const Post = require("../models/Post");

const router = express.Router();


// CREATE POST

router.post("/", async (req, res) => {

  try {

    const { userId, title, story, lesson } = req.body;

    if (!userId || !title || !story || !lesson) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newPost = await Post.create({
      userId,
      title,
      story,
      lesson
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }

});

//GET ROUTE

router.get("/", async (req, res) => {

  try {

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username email");

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }

});

module.exports = router;
router.put("/like/:id", async (req, res) => {

  try {

    const { userId } = req.body;

    // Check login
    if (!userId) {
      return res.status(401).json({
        message: "Login required"
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    // Already liked?
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {

      return res.status(400).json({
        message: "You already liked this post"
      });
    }

    // Add like
    post.likes.push(userId);

    await post.save();

    res.status(200).json({
      message: "Post liked",
      likes: post.likes.length
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }

});

router.get("/user/:userId", async (req, res) => {

  try {

    const posts = await Post.find({
      userId: req.params.userId
    });

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }

});