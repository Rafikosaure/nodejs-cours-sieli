import ModelAvis from "./avis.model";
import ModelArticle from './article.model';
import express from 'express'
import { verifyToken } from "./auth";

const router = express.Router();

// Poster un avis
router.post('/avis/:articleId', verifyToken, async (req, res) => {
    try {
        const avis = await ModelAvis.create({ ...req.body, user: req.user.id })
        const article = await ModelArticle.findByIdAndUpdate(
            req.params.articleId, 
            { $push: { avis: avis._id }}, 
            { new: true }
        )
        res.status(201).json("Notice posted!")
    } catch(error) {
        res.status(500).json({ error: "Error during notice creation!" })
    }
})

// Récupérer les avis d'un article
router.get('/avis/:articleId', async (req, res) => {
    try {
        const article = await ModelArticle.findById(req.params.id)
        res.status(200).json(article.avis)
    } catch(error) {
        res.status(500).json({ error: "Error!" })
    }
})


export default router