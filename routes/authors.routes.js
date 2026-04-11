import express from "express"
import { getAllAuthors, createAuthor } from "../controllers/authors.controller.js"

const router = express.Router()

// récupérer tous les auteurs
router.get("/", getAllAuthors)

// créer un auteur
router.post("/", createAuthor)

export default router