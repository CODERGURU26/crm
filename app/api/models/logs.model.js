import mongoose, { Schema , model } from "mongoose";

const logSchema = new Schema({
    customer : {
        type : mongoose.Types.ObjectId,
        ref : 'Customer',
        required : true
    }, 
    startsAt : {
        type : Date,
        required : true
    },
    endsAt : {
        type : Date,
        required : true
    }, 
    followUp : {
        type : Date
    },
    status : {
        type : String,
        enum : ['calling','busy' , 'waiting' , 'not received' , 'switched off' , 'denied' ],
        default : 'calling'
    }
} , {timestamps : true})

const logModel = model('Logs' , logSchema)
export default logModel