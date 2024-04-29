const http = require("http")

const server = http.createServer((req, res) => {
    res.end("hello world")
    console.log("Si le chien aboie, c'est qu'il n'est pas assez cuit. -Proverbe chinois")
})

server.listen(3000)