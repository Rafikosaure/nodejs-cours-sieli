const express = require("express")
const app = express()

app.use((req, res, next) => {
    console.log('First middleware')
    next()
})

app.use((req, res, next) => {
    console.log('Second middleware')
    next()
})

app.use((req, res, next) => {
    res.status(201).json({ message: "Le middleware fonctionne !" })
})


module.exports = app