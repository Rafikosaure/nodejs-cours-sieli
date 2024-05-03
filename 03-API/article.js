import express from 'express'
import ModelArticle from './article.model.js'
import { verifyToken } from './auth.js'

const router = express.Router()

// Récupération de tous les articles
router.get("/", async (req, res) => {
    try {
        const articles = await ModelArticle.find()
        res.status(200).json(articles)
    } catch(error) {
        res.status(500).json({ error: "Error during recovery!" })
    }
})

// Récupération d'un article par son id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const article = await ModelArticle.findById(id)
        res.status(200).json(article)
    } catch(error) {
        res.status(500).json({ error: "Error during recovery!" })
    }
})

// Création d'un article par un utilisateur
router.post("/", verifyToken, async (req, res) => {
    try {
        const article = await ModelArticle.create({
            ...req.body
        })
        res.status(201).json(article)
    } catch(error) {
        res.status(500).json({ error: "Creation error!" })
    }
})

// Mettre à jour un article
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (req.user.id === req.body.user) {

            // { new: true } en fin de ligne permet de récupérer l'article avec la modification
            const article = await ModelArticle.findByIdAndUpdate(id, req.body, { new: true })
            
            if (!article) return res.status(404).json("Article not found!")
            res.status(200).json(article)
        } else {
            res.status(403).json({ error: "Modification forbidden!" })
        }
    } catch(error) {
        res.status(500).json({ error: "Error during recovery!" })
    }
})

// Supprimer un article par son id
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        if (req.user.id === req.body.user) {
            const article = await ModelArticle.findByIdAndDelete(id);
            if (!article) return res.status(404).json("Article not found!")
            res.status(200).json("Article deleted!")
        } else {
            res.status(500).json("Only the creator of the article can delete it!")
        }       
    } catch(error) {
        res.status(200).json({ error: "Error during recovery!" })
    }
})

// Trier les articles par prix (ordre croissant)
router.get("/sort/asc", async (req, res) => {
    try {
        const articles = await ModelArticle.find().sort('price')
        res.status(200).json(articles)
    } catch(error) {
        res.status(500).json({ error: "Error during recovery!" })
    }
})

// Trier les articles par prix (ordre décroissant)
router.get("/sort/desc", async (req, res) => {
    try {
        // Remarquez le "-" avant "price", spécifié pour le tri décroissant !
        const articles = await ModelArticle.find().sort('-price')
        res.status(200).json(articles)
    } catch(error) {
        res.status(500).json({ error: "Error during recovery!" })
    }
})


export default router