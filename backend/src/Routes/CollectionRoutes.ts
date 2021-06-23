import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer'
import { CollectionController } from '../Controllers/CollectionController';
import { ClothingController } from '../Controllers/ClothingController';

const router = express.Router()

const collectionController = new CollectionController()
const clothingController = new ClothingController()

router.get('/showCollections', collectionController.showCollections)
router.post('/createCollection', collectionController.createCollections)
router.delete('/deleteCollection/:_id', collectionController.deleteById)
router.put('/updateNameCollection', collectionController.updateNameById)
router.put('/updateClothing', clothingController.updateClothingInCollection)
router.post('/addClothing', multer(multerConfig).array("file"), clothingController.addClothingInCollection)
router.delete('/deleteClothing', clothingController.deleteClothingInCollection)

export default router