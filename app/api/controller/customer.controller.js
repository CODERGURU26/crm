import customerModel from "../models/customer.model.js"

export const createCustomer = async (req, res) => {
    try {
        const body = Array.isArray(req.body) ? req.body : [req.body]
        const customers = await customerModel.insertMany(body)
        res.json(customers)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const fetchCustomer = async (req, res) => {
    try {
        const customer = await customerModel.find().sort({ createdAt: -1 })
        res.json(customer)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const fetchCustomerByID = async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)
        if (!customer)
            return res.status(404).json({ message: "Customer Not Found" })
        res.json(customer)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!customer)
            return res.status(404).json({ message: "Customer Not Found" })
        res.json(customer)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndDelete(req.params.id)
        if (!customer)
            return res.status(404).json({ message: "Customer Not Found!" })
        res.json(customer)
    } catch (err) {
        res.status(500).json(err)
    }
}
