// server.js

// set up ======================================================================
// get all the tools we need
var path = require('path');
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var expressValidator = require('express-validator');

var configDB = require('./config/database.js');

app.use(express.static(path.join(__dirname, 'public')));

// configuration ===============================================================
mongoose.connect(configDB.url,{ useMongoClient: true }); // connect to our 
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'teamcache' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

var projectSchema = mongoose.Schema({
    title: String,
    steps: [{type: String}],
    media: {
        video: {type: String},
        picture: {type: String}
    }
}, 
{
    collection:'projects'
});

app.post('/getallprojects', function(req, res) {
    var projectModel = mongoose.model('projects', projectSchema);
    
    projectModel.find().exec().then(function(projectObj){
        console.log(projectObj);
        res.send(projectObj);
    });
});
