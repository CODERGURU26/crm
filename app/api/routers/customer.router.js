import { Router } from 'express'
import { createCustomer, deleteCustomer, fetchCustomer, fetchCustomerByID, updateCustomer } from '../controller/customer.controller.js'

const router = Router()

router.post('/' , createCustomer)
router.get('/', fetchCustomer)
router.get('/:id' , fetchCustomerByID)
router.put('/:id', updateCustomer)
router.delete('/:id' , deleteCustomer)

export default router