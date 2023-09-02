const { type } = require('express/lib/response')
const mongoose = require('mongoose')


// Define a custom schema type for time as a string
const TimeType = {
    type: String,
    validate: {
        validator: (value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
        message: 'Invalid time format (HH:mm)',
    },
};

const TimeDaySchema = mongoose.Schema({
    Day: { type: mongoose.Schema.Types.ObjectId, ref: "weekDay", required: true },
    Start: TimeType, 
    End: TimeType,  
    Status: { type: Boolean, required: true },
});
module.exports = mongoose.model("TimeDay", TimeDaySchema)