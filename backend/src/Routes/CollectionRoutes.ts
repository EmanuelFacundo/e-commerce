import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer'
import { CollectionController } from '../Controllers/CollectionController';

const router = express.Router()

const collectionController = new CollectionController()

router.get('/showCollections', collectionController.showCollections)
router.post('/createCollection', collectionController.createCollections)
router.delete('/deleteCollection/:_id', collectionController.deleteById)
router.put('/updateNameCollection', collectionController.updateNameById)
router.put('/updateACBI', collectionController.updateACBI)
router.put('/addClothing', multer(multerConfig).array("file"), collectionController.addClothing)
router.put('/deleteClothing', collectionController.deleteClothing)

export default router