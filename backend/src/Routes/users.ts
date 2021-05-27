import express from 'express';
import controller from '../Controllers/users'

const router = express.Router();

router.get('/allUsers', controller.getUsers)

export default router