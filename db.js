import Database from "better-sqlite3"

const db = new Database("./database.db")

// table auteurs
db.exec(`
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`)

// table articles
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id)
  )
`)

export default db