const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const express = require('express');
const fileupload = require('express-fileupload');
const {productsRouter, usersRouter, authorizationRouter} = require('./routes');


const dataBase = require(`./DataBase`).getInstance();
dataBase.setModels();

const morgan = require(`morgan`);

const {PORT} = require('./config');
const {cronRun} = require('./cron');
cronRun();


const myApp = express();

myApp.use(fileupload({}));
myApp.use(express.json());
// myApp.use(express.urlencoded());

myApp.use(express.static(path.join(__dirname, `public`)));

myApp.use(morgan(`dev`));
myApp.use(morgan(`tiny`));
myApp.use(morgan(`combined`));


myApp.use(`/products`, productsRouter);
myApp.use(`/users`, usersRouter);
myApp.use(`/authorization`, authorizationRouter);


myApp.use('*', (err, req, res) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message || `page no found`,
            code: err.customCode
        })
})


myApp.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`PORT ${PORT} work`);
    }
})


