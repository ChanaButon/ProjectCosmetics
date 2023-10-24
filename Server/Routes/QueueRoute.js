const router=require('express').Router()
const queueControllers=require('../Controllers/QueueControllers')


router.post('/newQueue',queueControllers.newQueue)
router.get('/getQueueDate',queueControllers.getQueuesByDateAndStatus)
router.get('/getQueueDateCancelled',queueControllers.getQueuescancelled)
router.get('/getQueue',queueControllers.getAllQueue)
router.get('/getQueueByCustomer:id',queueControllers.getQueueByIdCustomer)
router.put('/updateQueue',queueControllers.updateQueue)
router.delete('/deleteQueueById:id',queueControllers.deleteQueueById)
router.get('/getQueueById:id',queueControllers.getQueueById)





module.exports=router