import express from 'express';
import { CollectionController } from '../Controllers/CollectionController';

const router = express.Router()

const collectionController = new CollectionController()

router.get('/getCollections', collectionController.getCollections)

export default router