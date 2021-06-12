import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer'
import { CollectionController } from '../Controllers/CollectionController';

const router = express.Router()

const collectionController = new CollectionController()

router.get('/showCollections', collectionController.showCollections)
router.post('/createCollection', collectionController.createCollections)
router.delete('/deleteCollection', collectionController.deleteById)
router.put('/updateNameCollection', collectionController.updateNameById)
router.put('/updateACBI', collectionController.updateACBI)

router.put('/testeImage', multer(multerConfig).single("file"), collectionController.updateClothes)

// (req, res) => {
//   console.log(req.file)

//   return res.status(200).json({
//     image: "Hello image"
//   })
// }

export default router