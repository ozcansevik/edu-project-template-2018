const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
var bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const ep = require('./api')

app.use('/api/episodes', ep)

app.listen(config.port, function () {
    console.log('Example app listening on port ' + config.port + '!')
})
