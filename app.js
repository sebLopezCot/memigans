var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var connectAssets = require('connect-assets');

var routes = require('./routes');

// Set server port and listener
app.set('port', process.env.PORT || 5000);

server.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Server listening at port %d', app.get('port'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(connectAssets({
    paths: [
      'public/css',
      'public/js'
    ],
    // The following parameters allow for versioning
    // when deciding to cache files and file compression
    // when users pull down static files.
    build: true,
    buildDir: "builtAssets",
    //compress: true,
    fingerprinting: true
}));

// Error handlers ----------------------------------------------------------

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



// Socket Events ----------------------------------------------------------

require('./socket/socket-server')(io);


module.exports = app;




