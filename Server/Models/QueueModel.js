const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const QueueSchema = mongoose.Schema({

    DateTime: {type:Date,require},
    TreatmantType: { type: mongoose.Schema.Types.ObjectId, ref: "Treatmant",require },
    Customer: {type: mongoose.Schema.Types.ObjectId, ref: "User",require },
    //Status:{type:Boolean,require},




    


})
module.exports = mongoose.model("Queue", QueueSchema)