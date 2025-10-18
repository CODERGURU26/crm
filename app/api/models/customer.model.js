import {model , Schema} from 'mongoose'

const customerSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    }
} , {timestamps : true})

const customerModel = model("Customer" , customerSchema)
export default customerModel