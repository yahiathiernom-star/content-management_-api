import express from "express"
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from "../controllers/articles.controller.js"

const router = express.Router()

// récupérer tous les articles
router.get("/", getAllArticles)

// récupérer un article
router.get("/:id", getArticleById)

// créer un article
router.post("/", createArticle)

// modifier un article
router.put("/:id", updateArticle)

// supprimer un article
router.delete("/:id", deleteArticle)

export default router