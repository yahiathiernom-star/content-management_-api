import express from "express"
import db from "./db.js"
import articlesRoutes from "./routes/articles.routes.js"
import authorsRoutes from "./routes/authors.routes.js"

const app = express()

// lire le JSON
app.use(express.json())


// ---------------- AUTHORS ----------------
// connecter les routes autheurs
app.use("/authors", authorsRoutes)

// ---------------- ARTICLES ----------------

// connecter les routes articles
app.use("/articles", articlesRoutes)

// lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000")
})