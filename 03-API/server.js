import express from 'express'
import mongoose, { mongo } from 'mongoose'
import { env } from './config.js'

// ROUTES
import routerUser from './router.user.js'

// APP
const app = express()

// PORT
const PORT = 8080

// DATABASE MONGOOSE
mongoose
    .connect(env.mongoURI, {dbName: 'Utilisateur'})
    .then(() => console.log("Connexion à Mongoose réussie !"))
    .catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json())

// MIDDLEWARE TO ROUTE
app.use("/api/user", routerUser)

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})