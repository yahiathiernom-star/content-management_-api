# 📚 Content Management API

API REST développée avec Node.js et Express permettant de gérer des **articles** et leurs **auteurs**.

---

## 🚀 Lancer le projet

```bash
node server.js
```

Serveur disponible sur :

```
http://localhost:3000
```

---

## 🧠 Technologies utilisées

* Node.js
* Express
* SQLite (better-sqlite3)

---

## 📂 Structure du projet

```
controllers/
routes/
middlewares/
screenshots/
db.js
server.js
```

---

## 🔗 Endpoints principaux

### 👤 Authors

* GET `/authors`
* GET `/authors/:id`
* POST `/authors`
* GET `/authors/:id/articles`

---

### 📄 Articles

* GET `/articles`
* GET `/articles/:id`
* POST `/articles`
* PUT `/articles/:id`
* DELETE `/articles/:id`

---

## 📸 Screenshots

### 📚 Articles

#### 🔹 GET /articles

![GET ARTICLES](./screenshots/get_articles.png)

#### 🔹 POST /articles (succès)

![POST ARTICLES](./screenshots/post_articles.png)

#### 🔹 POST /articles (titre obligatoire)

![ERROR TITLE](./screenshots/post_aticles_titre_obligatoire.png)

#### 🔹 POST /articles (auteur invalide)

![ERROR AUTHOR](./screenshots/post_articles_auteur_invalide.png)

#### 🔹 PUT /articles/:id

![PUT ARTICLES](./screenshots/put_modifier_articles.png)

#### 🔹 DELETE /articles/:id

![DELETE ARTICLES](./screenshots/delete_articles.png)

---

### 👤 Authors

#### 🔹 GET /authors

![GET AUTHORS](./screenshots/get_authors.png)

#### 🔹 GET /authors/:id

![GET AUTHOR](./screenshots/get_authors_by_id.png)

#### 🔹 GET /authors/:id (erreur)

![ERROR AUTHOR](./screenshots/get_authors_by_id_erreur.png)

#### 🔹 GET /authors/:id (inexistant)

![NOT FOUND](./screenshots/get_authors's_articles.png)

#### 🔹 GET /authors/:id/articles

![AUTHOR ARTICLES](./screenshots/get_authors_articles.png)

#### 🔹 POST /authors

![POST AUTHOR](./screenshots/post_author.png)

#### 🔹 POST /authors (name obligatoire)

![ERROR NAME](./screenshots/post_auteurs_nom_obligatoire.png)

---

## ✅ Fonctionnalités

* CRUD complet pour les articles
* Gestion des auteurs
* Relation articles ↔ auteurs
* Validation des champs
* Gestion des erreurs (400, 404, 500)
* Middleware de logs

---

## 👨‍💻 Auteur

Projet réalisé par **Yahia**
