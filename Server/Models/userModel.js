const { type } = require('express/lib/response')
const mongoose = require('mongoose')




const userSchema = mongoose.Schema({
    Name: { type: String, require },
    FamilyName: { type: String, require },
    ID:{type: String, require },
    Password:{type: String, require },
    Mail:{type: String, require },
    Phone:{type: String, require },
    
    // UserType: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" }
    



    

})
module.exports = mongoose.model("User", userSchema)