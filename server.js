const express = require('express');
const app = express();

const config = require('config');

//middlewares
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
app.use(bodyParser.json());

//for uploading files use multer https://github.com/expressjs/multer

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

//routes
app.use('/content', require('./routes/content')());
app.use('/error', require('./routes/error')());


const port = process.env.PORT || config.get('port');
if(require.main === module)
    app.listen(port, () => console.log('Server listening on', port))
else
    module.exports = app;
