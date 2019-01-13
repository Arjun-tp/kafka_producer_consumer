'use strict'
let req = require("express");
let express = req();
let mongoose = require('mongoose');

let router = req.Router();
let config    = require('./config/development'); //change db to developmentConsumer
let consumer = require('./consumer')
let db = config.db;

// let models = require('./config/api/models/check')

let app = {
    config : config
}

function endProcess() {
    console.log(new Date() + ' @ endProcess is invoked... ');
    process.exit();
}

mongoose.connection.on('connected', function () {
    console.log('channel connected -----');
    let port = process.env.PORT || 6020;
    express.use('/api', router);
    express.listen(port);
    console.log('Server started successfully.. !!! PORT - ' + port + '\n\n\n');
    let services = require('./services')
    services.putMongo();
    let consumer = require('./consumer')
    consumer.consumerFunc()
});

mongoose.connection.on('error', function (mongoError) {
    console.log(new Date() + ' @ MongoDB: ERROR connecting to: ' + 'mongodb://' + db.mongo.host + '/' + db.mongo.db + ' - ' + mongoError);
    endProcess();
});

mongoose.connection.on('close', function () {
    console.log(new Date() + ' @ MongoDB: Connection Closed');
    console.log('DataBase down!! Please restart your DB and Server!!');
    // endProcess();
});


console.log('db.mongo : '+JSON.stringify(db.mongo));
mongoose.connect('mongodb://' + db.mongo.host + ':' + db.mongo.port + '/' + db.mongo.db);




// function checkMongo(){

//     models.create(query).then(function(data,err){

//         if(!err){
//             client.index({
//                 index : 'users',
//                 id :data._id.toString(),
//                 type : "users",
//                 body : {
//                     firstName : data.firstName,
//                     lastName : data.lastName
//                 }
//             },function(err,resp,status){

//                 console.log("Response",resp);
//                 console.log("Error",err);
//                 console.log("Status",status);

//             })

//         }else{
//             console.log("Error in else",err);

//         }




//     })
// }


module.exports.default = app;
