'use strict'
const mongoose = require('mongoose');
// const consConfig = require('./config/developmentConsumer')
console.log("consConfig===",consConfig)
let kafka = require('kafka-node');
let HighLevelConsumer = kafka.HighLevelConsumer;
let client = new kafka.Client();
let filesConsumerSchema = require('./filesConsumerSchema')
let chunksConsumerSchema = require('./chunksConsumerSchema')
// let client = new kafka.KafkaClient({kafkaHost: '3.0.197.157:9092'})

async function consumerFunc() {
    let consumer = new HighLevelConsumer(
        client,
        [
            { topic : 'data' , offset : 0},
            { topic : 'chunk' , offset : 0},
        ],
        {
            autoCommit: false,
            fromOffset : false
        }
    );
    consumer.on('message', (message) => {
        let a = JSON.parse(message.value);
        let b = JSON.parse(a.data);
        console.log("message-b",JSON.stringify(b));
            // let responseObject = {
            //     "length" : response.length,
            //     "chunkSize" : response.chunkSize,
            //     "uploadDate" : response.uploadDate,
            //     "filename" : response.filename,
            //     "md5" : response.md5,
            //     "contentType" : response.contentType,
            //     "aliases" : response.aliases,
            // }
            // filesConsumerSchema.create(responseObject).then((result) => {
            //     console.log("responseeeeeeeee",JSON.stringify(result));
            // }).catch((err) => {
            //     console.log("err",err);
            // });;
           
        // console.log("message==", JSON.stringify(message))
        // try{
        //     let filesConsumerData = await filesConsumerSchema.create({"_id" : ObjectId(id)})  
        //     console.log("filesConsumerData---",filesConsumerData);
        //     // let videoConsumerChunks= await chunksConsumerSchema.find({files_id : id});
        // }catch(e){
        //     console.log("error",e)
        // }


  });
  
}

// async function saveToMongo(id) {
//     try{

//         let 

//         let filesConsumerData = await filesConsumerSchema.create({"_id" : ObjectId(id)})

//         console.log("filesConsumerData---",filesConsumerData);
//         // let videoConsumerChunks= await chunksConsumerSchema.find({files_id : id});
//     }catch(e){
//         console.log("error",e)
//     }

// }




    
module.exports.consumerFunc = consumerFunc;