const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs")
const uuidv4 = require('uuid/v4');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function (req, res) {

    //find all episodes
    fs.readdir("data", function (err, files) {
        if (err) {
            throw err;
        }

        let promises = [];

        files.forEach(function (file) {
            let p = new Promise((resolve, reject) => {
                fs.readFile("data/" + file, (err, data) => {
                    resolve(JSON.parse(data));
                });
            });
            promises.push(p);
        })

        Promise.all(promises)
            .then((data) => {
                res.send(data);
            }, () => { res.send("Erreur recupération"); });
    });
});

router.post('/', function (req, res) {
    let uuid = uuidv4();
    fs.writeFile("data/" + "episode" + uuid + ".json", JSON.stringify(req.body), function (error) {
        throw error;
    });
    res.send(req.body);
});

router.put('/:id', function (req, res) {
    let id = req.param('id');

    fs.writeFile("data/" + "episode" + id + ".json", JSON.stringify(req.body), function (error) {
        throw error;
    });
    res.send(req.body);
});

router.get('/:id', function (req, res) {
    let id = req.param('id');

    //find one episode by id
    let p = new Promise((resolve, reject) => {
        fs.readFile("data/" + "episode" + id + ".json", (err, data) => {
            resolve(JSON.parse(data))
        });
    }).then((data) => {
        res.send(data);
    }, () => { res.send("Erreur recupération"); });

});

router.delete('/:id', function (req, res) {
    let id = req.param('id');

    fs.unlink("data/" + "episode" + id + ".json", (err) => {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
    });

    res.send("deleted");
});

module.exports = router

