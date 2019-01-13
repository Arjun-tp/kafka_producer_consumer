const mongoose = require('mongoose');
const { Schema } = mongoose;

const filesSchema = new Schema ({
    length : {
        type : Number,
    },
    chunkSize : {
        type : Number,
    },
    uploadDate : {
        type : Date,
    },
    filename : {
        type : String,
	},
	md5 : {
        type : String,
	},
	contentType : {
        type : String,
	},
	aliases : {
        type : mongoose.Mixed,
	},
},
{timestamps : true})
    




module.exports = mongoose.model("attachments.files",filesSchema)