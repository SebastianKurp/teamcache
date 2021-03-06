var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

//log in stuff
module.exports = require('mongoose');
module.exports = mongoose.model('User',{
    username: String,
password: String,
email: String
});
var Schema = mongoose.Schema;

var projectSchema = new Schema({
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


var projectModel = mongoose.model('projects', projectSchema);

// db.collection('projects').find({}).toArray(function(err, result) {
//     if(err) throw error;
//     console.log(result);
//     db.close();
// });
//had an  error with this block.


app.use(express.static(__dirname + '/MainPagev3'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/MainPagev3/mainpage.html");
});

app.post("/addproject", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Project saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});