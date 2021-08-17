const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var pixels = require('image-pixels')
var Promise = require('promise');
const { port } = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(fileUpload());

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.get("/", function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.post("/upload", function (req, res) {
    console.log('upload started');
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files were uploaded.');
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.file;
    console.log(file);
    parseImage(file)
        .then(result => {
            var {data, width, height} = result;
            console.log(width);
            console.log(height);
            return res.status(200).send(result);
        })
});

app.listen(port, () => {
    console.log(`Server running at port:${port}`);
});

async function parseImage(image) {
    return new Promise(function (resolve, reject) {
        var data = pixels(image)
        resolve(data);
    })
}
