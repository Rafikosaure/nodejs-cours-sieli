import express from 'express'

const router = express.Router()


const data = [
    {
      id: 1,
      name: "Izuku",
      email: "Izuku@yahoo.com"
    },
    {
      id: 2,
      name: "Drake",
      email: "Drake@yahoo.com",
    },
    {
      id: 3,
      name: "Marion",
      email: "Marion@yahoo.com",
    },
];

// GET (Récupérer des données)
// Ajouter POST (Ajouter une donnée en bdd)
// Ajouter PUT (Pour modifier des données, name)
// Ajouter DELETE (Pour supprimer une donnée)

router.get("/all", (req, res, next) => {
    res.status(200).json(data)
    next()
})

router.post("/add", (req, res) => {
    console.log(req.body)
    data.push(req.body)
    res.status(201).json(data)
})

router.put("/update/:id", (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const checkIsExist = data.some(user => user.id == id)
    if (checkIsExist) {
      let result = data.map(user => {
        if (user.id == id) {
          user.name = name
        }
        return user
      })
      res.status(200).json(result)
    }
    if (!checkIsExist) res.status(404).json({ message: "User not found !" })
})

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    const checkIsExist = data.some(user => user.id == id)
    if (checkIsExist) {
      const result = data.filter(user => user.id != id)
      res.status(200).json(result)
    }
    if (!checkIsExist) res.status(404).json({ message: "User not found !" })
})

export default router