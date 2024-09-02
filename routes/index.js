const express = require('express')
const cors = require('cors')
const fs = require('fs')
const https = require('https')
const http = require('http')


let options ={
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

let corsOptions = {
    origin: 'https://localhost:80'
}

let app = express()

app.use(cors(corsOptions))

app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

const HTTP_PORT = process.env.HTTP_PORT || 80
const HTTPS_PORT = process.env.HTTPS_PORT || 443

let httpServer = http.createServer(app)
let httpsServer = https.createServer(options, app)

httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP Server running on port ${HTTP_PORT}`)
})
httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`)
}) 