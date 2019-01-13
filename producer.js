'use strict'
let kafka = require('kafka-node');
 async function producerFunc(chunk, topicName, data){
      return new Promise(function(resolve,reject){
        try{
            let payloads = [];
            if(chunk === null){
                payloads.push({topic: topicName, messages: JSON.stringify({data : JSON.stringify(data)}) })
                producerCall(payloads).then((result) => {
                    resolve(result);
                  })
            }
            if (chunk !== null){
                payloads.push({ topic: topicName, messages: {chunk : chunk} })
                producerCall(payloads).then((result) => {
                  resolve(result);
                })
            } 
        }catch (e){
            reject(e)
        }
     })

     function producerCall(payloads){
        return new Promise((resolve,reject) => {

            try{
                let HighLevelProducer = kafka.HighLevelProducer;
                let client = new kafka.Client();
                // let client = new kafka.KafkaClient({kafkaHost: '3.0.197.157:9092'})


let producerClient = new HighLevelProducer(client);
                producerClient.on('ready', function () {
                    producerClient.send(payloads, function (err, data) {
                        console.log("producer_Data",data);
                        resolve(data);
                    });
                });   
            }catch(e){
                reject(e)
            }
        })
        
        
    }
    
}



module.exports.producerFunc = producerFunc;
