import db from "../db.js"

// tous les auteurs
const getAllAuthors = (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM authors").all()
    res.json(rows)
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// un auteur par id
const getAuthorById = (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" })
  }

  try {
    const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(id)

    if (!author) {
      return res.status(404).json({ message: "Auteur non trouvé" })
    }

    res.json(author)
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// créer auteur
const createAuthor = (req, res) => {
  const { name } = req.body

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "name obligatoire" })
  }

  try {
    const result = db
      .prepare("INSERT INTO authors (name) VALUES (?)")
      .run(name)

    res.status(201).json({
      id: result.lastInsertRowid,
      name
    })
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// articles d’un auteur
const getArticlesByAuthor = (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" })
  }

  try {
    const rows = db.prepare(`
      SELECT articles.id, articles.title, articles.content
      FROM articles
      WHERE author_id = ?
    `).all(id)

    res.json(rows)
  } catch {
    res.status(500).json({ message: "Erreur DB" })
  }
}

export { getAllAuthors, getAuthorById, createAuthor, getArticlesByAuthor }