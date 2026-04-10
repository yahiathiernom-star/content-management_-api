import express from "express";
import db from "./db.js";

const app = express();

app.use(express.json());

/*
GET /authors
*/
app.get("/authors", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM authors").all();
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur DB" });
  }
});

/*
POST /authors
*/
app.post("/authors", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Le champ name est obligatoire"
    });
  }

  try {
    const result = db
      .prepare("INSERT INTO authors (name) VALUES (?)")
      .run(name);

    res.status(201).json({
      id: result.lastInsertRowid,
      name
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur DB" });
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});