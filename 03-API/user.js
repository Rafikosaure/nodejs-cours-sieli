import express from 'express'
import ModelUser from './user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from './config.js'

const router = express.Router()

router.get("/all", async (req, res) => {
  const users = await ModelUser.find()
  res.status(200).json(users)
})

router.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id
    const user = await ModelUser.findById(id)
    if (!user) return res.status(404).json("User not found!")
    res.status(200).json({ message: "User found!", user })
  } catch(error) {
    console.log(error)
  }
})

router.post('/sign', async (req, res) => {
  try {
    const user = await ModelUser.findOne({ email: req.body.email })
    if (!user) return res.status(404).json("User not found!")

    // Puis on compare le mot de passe entré avec celui présent dans la bdd:
    const comparedPassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparedPassword) return res.status(400).json("Wrong credentials!")

    const token = jwt.sign({ id: user._id }, env.token, { expiresIn: "24h" })

    // Supprime le mot de passe de l'user pour des raisons de sécurité
    const { password, ...other } = user._doc

    // Envoi du jeton JWT sous la forme d'un cookie HTTPOnly
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(other)

  } catch(error) {
    console.log(error)
  }
})

router.post("/add", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await ModelUser.create({
      ...req.body,
      password: hashedPassword
    })

    res.status(201).json({
      message: "User created!",
      user
    })
  } catch(error) {
    console.log(error)
  }
})

router.put("/update/:id", async (req, res) => {
  const id = req.params.id
  try {
    const updatedUser = await ModelUser.findByIdAndUpdate(
      id,
      req.body, 
      { new: true }
    )
    if (!updatedUser) return res.status(404).json("User not found!")
    res.status(200).json({
      message: "User updated!",
      updatedUser
    })
  } catch(error) {
    console.log(error)
  }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await ModelUser.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).json("User not found!")
    res.status(200).json({ 
      message: "User deleted!" 
    })
  } catch(error) {
    console.log(error)
  }
})

export default router