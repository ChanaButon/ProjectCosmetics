const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const userTypeSchema = mongoose.Schema({
    userNameType: { type: String, require }
    
    
    




})
module.exports = mongoose.model("UserType", userTypeSchema)