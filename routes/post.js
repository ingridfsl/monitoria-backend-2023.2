import { Router } from "express";
import { prisma } from "../prisma.js";

export const postRouter = Router();

postRouter.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Could not create post" });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ error: "Could not get posts" });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({ error: "Could not get post" });
  }
});