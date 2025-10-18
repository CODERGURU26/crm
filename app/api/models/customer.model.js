import mongoose, {model , Schema} from 'mongoose'

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
    },
    status : {
        type : String,
        enum : ['pending' , 'cold' , 'hot' , 'closed' , 'denied'],
        default : 'pending'
    }
} , {timestamps : true})

mongoose.models = {}
const customerModel = model("Customer" , customerSchema)
export default customerModel