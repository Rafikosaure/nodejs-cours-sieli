import express from 'express'

// ROUTES
import routerUser from './router.user.js'

// APP
const app = express()

// PORT
const PORT = 8080

// MIDDLEWARE
app.use(express.json())

// MIDDLEWARE TO ROUTE
app.use("/api/user", routerUser)

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})