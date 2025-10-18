import mongoose, { Schema , model } from "mongoose";

const logSchema = new Schema({
    customer : {
        type : mongoose.Types.ObjectId,
        ref : 'Customer',
        required : true
    }, 
    startsAt : {
        type : Date,
    },
    endsAt : {
        type : Date,
        
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

mongoose.models = {}

logSchema.pre('save' , function(next){
    this.startsAt = Date.now()
    this.endsAt = Date.now()
    next()
})
const logModel = model('Logs' , logSchema)
export default logModel