const router=require('express').Router()
const queueControllers=require('../Controllers/QueueControllers')


router.post('/newQueue',queueControllers.newQueue)
// router.delete('/deleteUserById/:id',userControllers.deleteUserById)
router.get('/getQueueDate',queueControllers.getQueuesByDateAndStatus)
// router.post('/getUser',userControllers.findUserByIdAndCode)
router.get('/getQueue',queueControllers.getAllQueue)
router.get('/getQueueByCustomer:id',queueControllers.getQueueByIdCustomer)




module.exports=router