const express = require('express')

let router = express.Router()

router.get('/', (request, response) => {
    response.render('index')
}
)

module.exports = router