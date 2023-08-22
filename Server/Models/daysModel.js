const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const DaysSchema = mongoose.Schema({

    DayName: {type:String,require}


})
module.exports = mongoose.model("weekDay", DaysSchema)
