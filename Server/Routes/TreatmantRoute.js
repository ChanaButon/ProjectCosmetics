const router=require('express').Router()
const  treatmantControllers=require('../Controllers/TreatmantControllers')



router.post('/newTreatmant',treatmantControllers.newTreatmant)
router.delete('/deleteTreatmant/:id',treatmantControllers.deleteTreatmantById)
//router.get('/findTreatmant',treatmantControllers.findTreatmantfindTreatmantById)
router.put('/updateTreatmant',treatmantControllers.updateTreatmant)




module.exports=router