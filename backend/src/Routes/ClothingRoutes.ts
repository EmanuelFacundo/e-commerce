import express from 'express';

import { ClothingController } from '../Controllers/ClothingController';

const router = express.Router()

const clothingController = new ClothingController()

router.get('/showClothes', clothingController.showClothes)

export default router