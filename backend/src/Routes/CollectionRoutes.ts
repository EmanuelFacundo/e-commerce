import express from 'express';
import { CollectionController } from '../Controllers/CollectionController';

const router = express.Router()

const collectionController = new CollectionController()

router.get('/showCollections', collectionController.showCollections)
router.post('/createCollection', collectionController.createCollections)
router.delete('/deleteCollection', collectionController.deleteById)
router.put('/updateNameCollection', collectionController.updateNameById)
router.put('/updateACBI', collectionController.updateACBI)

export default router