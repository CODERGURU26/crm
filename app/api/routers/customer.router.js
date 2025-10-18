import { Router } from 'express'
import { createCustomer, deleteCustomer, fetchCustomer, fetchCustomerByID, updateCustomer } from '../controller/customer.controller.js'

const customerRouter = Router()

customerRouter.post('/' , createCustomer)
customerRouter.get('/', fetchCustomer)
customerRouter.get('/:id' , fetchCustomerByID)
customerRouter.put('/:id', updateCustomer)
customerRouter.delete('/:id' , deleteCustomer)

export default customerRouter