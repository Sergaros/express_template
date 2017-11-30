## Express4 Tempalte application
This app cam be used as start point of any **Express4** application.

Don't forget install all needed dependencies before run/test application:

```
 project_folder> npm install
```
***
#### Start application:

```
 project_folder> npm start
```
***
#### Start application tests:

```
 project_folder> npm test
```
***
#### Project Structure:
```
    [project_folder]
                    |___[client]    //folder contains all client
                    |___[config]    //this folder used by config package
                    |          |___default.json     //default properties configuration
                    |          |___test.json        //test properties configuration
                    |___[routes]    //routes modules
                    |___[tests]     //bdd tests files
                    |___server.js   //main app file
```
***
#### Main points

* Create express app:
    ```javascript
    const express = require('express');
    const app = express();
    ```
* Use middlewares:
    For this template I used packeges from [this page](http://expressjs.com/ru/guide/migrating-4.html).
    Connect middlewares:
    ```javascript
    const favicon = require('serve-favicon');
    const serveStatic = require('serve-static');
    const bodyParser = require('body-parser');
    const errorhandler = require('errorhandler');
    const session = require('express-session');
    const morgan = require('morgan');

    app.use(morgan('tiny'));
    app.use(favicon('client/src/favicon.ico'));
    app.use(serveStatic('client'));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.text({ type: 'text/html' }));
    app.use(bodyParser.json())

    if (process.env.NODE_ENV === 'development') {
      // only use in development
      app.use(errorhandler())
    }

    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
      secret: config.get('secret'),
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));
    ```
* Use routes:

    Routes modules structure:
    ```javascript     
    'use strict'

    const express = require('express');
    const router = express.Router();

    module.exports = ()=>{
        return router.get('/', function(req, res) {
            ...
            res.send(content);
        })
        .post('/', function(req, res) {
            ...
        })
        ...
    ```
    Routes Connect:
    ```javascript
    app.use('/content', require('./routes/content')());
    ```
