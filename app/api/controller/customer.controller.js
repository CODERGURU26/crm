import customerModel from "../models/customer.model.js"

export const createCustomer = async(req , res)=>{
   try{
     const customer = await customerModel.create(req.body)
    await customer.save()
    res.json(customer)
   }catch(err){
        res.status(500).json(err)
   }
}

export const fetchCustomer = async (req , res)=>{
    const customer = await customerModel.find().sort({createdAt : -1})
    res.json(customer)
}

export const fetchCustomerByID = async(req , res)=>{
    try{    
        const customer = await customerModel.findById(req.params.id)

        if(!customer)
            res.status(404).json({message : "Customer Not Found"})
        res.json(customer)
    }catch(err){
        res.status(500).json(err)
    }
}

export const updateCustomer =  async (req , res)=>{
    try{
        const customer = await customerModel.findByIdAndUpdate(req.params.id , req.body , {new : true})
         
        if(!customer)
            res.status(404).json({message : "Customer Not Found"})

        res.json(customer)
    }catch(err){
        res.status(500).json(err)
    }
}

export const deleteCustomer = async(req , res)=>{
    try{
        const customer = await customerModel.findByIdAndDelete(req.params.id)
        if(!customer)
            res.status(404).json({Message : "Customer Not Found !"})

        res.json(customer)
    }   
    catch(err){
        res.status(500).json(err)
    } 
}