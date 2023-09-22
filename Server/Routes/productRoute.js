
const router=require('express').Router()
const productController = require('../Controllers/producrController')




router.post('/newProduct', productController.newProduct)
router.get('/getProducts',productController.getAllProduct)


// router.get('__',userControllers.)







module.exports=router
