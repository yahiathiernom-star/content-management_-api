import express from "express"
import articlesRoutes from "./routes/articles.routes.js"
import authorsRoutes from "./routes/authors.routes.js"
import logger from "./middlewares/logger.js"

const app = express()

// lire le JSON
app.use(express.json())

// logs
app.use(logger)

// routes
app.use("/authors", authorsRoutes)
app.use("/articles", articlesRoutes)

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000")
})