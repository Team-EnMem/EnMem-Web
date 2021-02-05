const express = require('express');
const app = express();
//const cors = require('cors');
const bodyParser = require('body-parser');
const port = 80;
const path = require('path');
const fs = require('fs');

const {DOMAIN} = require('../src/config');

app.set('port', port);
//app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    const indexHtmlPath = path.resolve(__dirname, '../build', 'index.html');
    fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }
        res.send(data)
    })
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})