const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const waitList = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",require },
    treatmentId: {type: mongoose.Schema.Types.ObjectId, ref: "Treatmant",require },
    preferredDate:{type: Date, require },
    preferredTime:{type: String, require },
    userMail:{type:String,require},
    serviceId:{type: mongoose.Schema.Types.ObjectId, ref: "User",require }
})
module.exports = mongoose.model("WaitList", waitList)