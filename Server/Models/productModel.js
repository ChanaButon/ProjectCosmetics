const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const productSchema = mongoose.Schema({

    UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Describe:{type:String},
    Addres:{type:String},
    TreatmantID:[{type:mongoose.Schema.Types.ObjectId, ref: "Treatmant" }],
    Customers:[{type:mongoose.Schema.Types.ObjectId, ref: "User" }],
    WorkingDay:[{type:mongoose.Schema.Types.ObjectId, ref: "Days" }],
    HoliDay:[{type:String}],
    BrakeTime:{type:Number},
    QueueList:[{type:mongoose.Schema.Types.ObjectId, ref: "Queue" }],
    // Status:{type:Boolean,require},


})
module.exports = mongoose.model("Product", productSchema)
