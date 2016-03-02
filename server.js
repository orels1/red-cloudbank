/**
 * Created by orel- on 06/Dec/15.
 */

// Babel ES6/JSX Compiler
require('babel-core/register');

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment');
moment.locale('ru');

// DB
var mongoose = require('mongoose');
var User = require('./models/user');
var Cog = require('./models/cog');
var config = require('./config');

var express = require('express');
var _ = require('underscore');

// Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// APP
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var app = express();

// Connect to DB
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// PassportJS configs
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// App Middleware
app.set('port', process.env.PORT || 80);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ secret: 'sinon', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

/* ACCOUNTS */

/**
 * POST /api/login
 * Checks the crenetials through passport.js
 */
app.post('/api/login', passport.authenticate('local'), function(req, res){
    res.status(200).send('logged in!');
});

/**
 * GET /api/logout
 * Logs user out of the system
 */
app.get('/api/logout', function(req, res, next){
    req.logout();
    res.sendStatus(200);
});

/**
 * POST /api/signup
 * Creates new entry in Users collection, if username is free
 */
app.post('/api/signup', function(req, res, next) {
    User.findOne({username: new RegExp(req.body.username, 'i')}, function(err, user){
        if (err) next(err);

        //Check if username is taken
        if (user) return res.status(400).send('username taken');

        //Add new user if username is free
        User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) return next(err);

            //Authenticate if everyghing is fine
            passport.authenticate('local')(req, res, function () {
                res.status(200).send('signed up and logged in!');
            });


        });
    });
});

/**
 * GET /api/users/profile
 * Returns user info for Navbar
 * */
app.get('/api/users/profile', function(req, res, next){
    if (req.user == undefined){
        res.status(200).send({auth: false});
    }else{
        res.status(200).send({auth:true, username: req.user.username, userId: req.user._id});
    }
});

/* APP */

/**
 * GET /api/cogs/list
 * Universal finder.
 * Accepts limit as a payload parameter along with others
 */
app.get('/api/cogs/list', function(req, res, next) {
    var params = req.query;

    //Extract limit and delete it from request
    var limit = params.limit;
    delete params.limit;

    //Extract sorting order and delete it from request
    var order = params.order;
    delete params.order;

    Cog
        .find(params)
        .sort(order == undefined ? {time : -1} : {time: order})
        .limit(limit == undefined ? 150 : parseInt(limit))
        .exec(function(err, feedItems) {
            if (err) return next(err);
            res.send(feedItems);
        });
});

/**
 * POST /api/cogs/add
 * Post to Cogs collection.
 */
app.post('/api/feed', function(req, res, next){
    if(req.user == undefined){
        res.status(400).send("You have to be authorized")
    }else{
        req.body.time = moment().utcOffset(3).format('x');
        var cog = new Cog(req.body);
        cog.save(function(err){
            if(err) return next(err);

            res.status(200).end();
        });
    }

});


// React Middleware
app.use(function(req, res) {
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', { html: html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

