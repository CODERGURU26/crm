import { Router } from "express";
import { createLog, deleteLog, fetchLog, fetchLogById, updateLog } from "../controller/logs.controller.js";

const logRouter = Router()

logRouter.post('/' , createLog)
logRouter.get('/' , fetchLog)
logRouter.get('/:id' , fetchLogById)
logRouter.put('/:id' , updateLog)
logRouter.delete('/:id' , deleteLog)

export default logRouter