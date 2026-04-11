import db from "../db.js"


// récupérer tous les articles
const getAllArticles = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT articles.id, articles.title, articles.content, authors.name as author
      FROM articles
      JOIN authors ON articles.author_id = authors.id
    `).all()

    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// récupérer un article,
const getArticleById = (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const row = db
      .prepare("SELECT * FROM articles WHERE id = ?")
      .get(id)

    if (!row) {
      return res.status(404).json({ message: "Article non trouvé" })
    }

    res.json(row)
  } catch (err) {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// créer un article
const createArticle = (req, res) => {
  const { title, content, author_id } = req.body

  if (!title || !content || !author_id) {
    return res.status(400).json({
      message: "Champs manquants"
    })
  }

 try {
  // vérifier que l'auteur existe
  const author = db
    .prepare("SELECT * FROM authors WHERE id = ?")
    .get(author_id)

  if (!author) {
    return res.status(400).json({
      message: "Auteur invalide"
    })
  }

  const result = db
    .prepare("INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)")
    .run(title, content, author_id)

  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    content,
    author_id
  })
} catch (err) {
  res.status(500).json({ message: "Erreur DB" })
}
}

// modifier un article
const updateArticle = (req, res) => {
  const id = parseInt(req.params.id)
  const { title, content } = req.body

  try {
    db
      .prepare("UPDATE articles SET title = ?, content = ? WHERE id = ?")
      .run(title, content, id)

    res.json({ id, title, content })
  } catch (err) {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// supprimer un article
const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id)

  try {
    db.prepare("DELETE FROM articles WHERE id = ?").run(id)
    res.json({ message: "Article supprimé" })
  } catch (err) {
    res.status(500).json({ message: "Erreur DB" })
  }
}

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
}

