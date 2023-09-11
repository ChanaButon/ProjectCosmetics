const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const TreatmantSchema = mongoose.Schema({

    TreatmantName: {type:String, require},
    Price:{type:Number},
    TreatmantTime:{type: Number},
    //Status:{type:Boolean},


})
module.exports = mongoose.model("Treatmant", TreatmantSchema)
