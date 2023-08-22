const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const TimeDaySchema = mongoose.Schema({

    Day: { type: mongoose.Schema.Types.ObjectId, ref: "weekDay",require },
    Start: [{type:Date,require}],
    End: [{type:Date,require}],
    Status:{type:Boolean,require},




    


})
module.exports = mongoose.model("TimeDay", TimeDaySchema)