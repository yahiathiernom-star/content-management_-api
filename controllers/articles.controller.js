import db from "../db.js"

// tous les articles avec auteur
const getAllArticles = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT articles.id, articles.title, articles.content, authors.name as author
      FROM articles
      JOIN authors ON articles.author_id = authors.id
    `).all()

    res.json(rows)
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// un article
const getArticleById = (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" })
  }

  try {
    const row = db.prepare(`
      SELECT articles.id, articles.title, articles.content, authors.name as author
      FROM articles
      JOIN authors ON articles.author_id = authors.id
      WHERE articles.id = ?
    `).get(id)

    if (!row) {
      return res.status(404).json({ message: "Article non trouvé" })
    }

    res.json(row)
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// créer
const createArticle = (req, res) => {
  const { title, content, author_id } = req.body

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "title obligatoire" })
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "content obligatoire" })
  }

  if (!author_id) {
    return res.status(400).json({ message: "author_id obligatoire" })
  }

  try {
    const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(author_id)

    if (!author) {
      return res.status(400).json({ message: "Auteur invalide" })
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
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// modifier
const updateArticle = (req, res) => {
  const id = parseInt(req.params.id)
  const { title, content } = req.body

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" })
  }

  if (!title || !content) {
    return res.status(400).json({ message: "Champs manquants" })
  }

  try {
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id)

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" })
    }

    db.prepare("UPDATE articles SET title = ?, content = ? WHERE id = ?")
      .run(title, content, id)

    res.json({ id, title, content })
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// supprimer
const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" })
  }

  try {
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id)

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" })
    }

    db.prepare("DELETE FROM articles WHERE id = ?").run(id)

    res.json({ message: "Article supprimé" })
  } catch {
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