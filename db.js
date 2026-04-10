import Database from "better-sqlite3";

const db = new Database("./database.db");

console.log("Connecté à SQLite");

db.exec(`
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

export default db;