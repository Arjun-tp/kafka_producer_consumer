'use strict'
const fs = require('fs');
const mongoose = require('mongoose');
const _ = require('lodash');
const ObjectId = mongoose.Types.ObjectId;
const gridfs = require('mongoose-gridfs');
// let config = require('./config')
let filesSchema = require('./filesSchema')
let chunksSchema = require('./chunksSchema')
let kafkaProducer = require('./producer')


const { model: Attachment } = gridfs({
    collection: 'attachments',
    model: 'Attachment',
  });

async function putMongo() {
    const readStream = fs.createReadStream('video');
    const attachment = new Attachment({
      filename: 'video',
      contentType: 'video/3gpp'
    });
    attachment.write(readStream, (error, attachment) => {
       readMongo(attachment._id)
     });
}

async function readMongo(id) {
    try{
        let filesData = await filesSchema.findOne({"_id" : ObjectId(id)})
        let videoInChunks= await chunksSchema.find({files_id : id});
        (async () => {
          await sendDataToConsumer(filesData,videoInChunks)
        })();
    }catch(e){
        console.log("error",e)
    }

}

  async function sendDataToConsumer(filesData,videoInChunks){
    try {
     let abc = await kafkaProducer.producerFunc(null, 'data', filesData);
    //  console.log("filesData==Response",filesData.length);
        let resPro = await kafkaProducer.producerFunc(JSON.stringify(videoInChunks), 'chunk');
        // console.log("videoInChunks==Response",videoInChunks);
    } catch (e) { 
      console.log("Error",e);
    }
  }



module.exports.putMongo = putMongo;
// module.exports.fetchMongo = fetchMongo;
