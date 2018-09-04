var express = require('express');
var app = express();
var port = 3000;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.static(__dirname + '/public'));
app.use('/js/underscore', express.static(__dirname + '/node_modules/underscore'));
app.use('/js/backbone', express.static(__dirname + '/node_modules/backbone'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
var middleWare = function (request, response, next) {
    MongoClient.connect(url, { useNewUrlParser:true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("HotelsDatabase");
        dbo.collection("Hotels").find().toArray(function (err, result) {
            if (err) throw err;
            var fs = require('fs');
            fs.writeFileSync("./public/js/data.json", "databaseData='" + JSON.stringify(result) + "';", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
        db.close();
    });
    next();
}
app.use(middleWare);
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});
app.listen(port, function () {
    console.log("Listening on port " + port);
});