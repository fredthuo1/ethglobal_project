const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/mydb";

MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");
    db.close();
});
