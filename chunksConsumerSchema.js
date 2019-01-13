const mongoose = require('mongoose');
const { Schema } = mongoose;

const consumerChunks = new Schema ({
    files_id : {
        type : Schema.Types.ObjectId,
    },
    n : {
        type : Number,
    },
    data : {
        type : Buffer,
    }
},
{timestamps : true})
    




module.exports = mongoose.model("attachments.consumerChunks",consumerChunks)