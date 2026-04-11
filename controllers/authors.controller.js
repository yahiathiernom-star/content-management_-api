import db from "../db.js"

// récupérer tous les auteurs
const getAllAuthors = (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM authors").all()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: "Erreur DB" })
  }
}

// créer un auteur
const createAuthor = (req, res) => {
  const { name } = req.body

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Le champ name est obligatoire"
    })
  }

  try {
    const result = db
      .prepare("INSERT INTO authors (name) VALUES (?)")
      .run(name)

    res.status(201).json({
      id: result.lastInsertRowid,
      name
    })
  } catch (err) {
    res.status(500).json({ message: "Erreur DB" })
  }
}

export { getAllAuthors, createAuthor }