import express from 'express'

const router = express.Router()

router.get("/all", (req, res) => {
    res.status(200).json({ message: "all user" })
})


export default router