import express from "express"
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  getArticlesByAuthor
} from "../controllers/authors.controller.js"

const router = express.Router()

router.get("/", getAllAuthors)
router.post("/", createAuthor)
router.get("/:id", getAuthorById)          // 👈 ajouté
router.get("/:id/articles", getArticlesByAuthor)

export default router