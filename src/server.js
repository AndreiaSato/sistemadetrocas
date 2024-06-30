const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const PORT = 3000;

const server = express();

server.use(cors());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/', routes);
server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})
