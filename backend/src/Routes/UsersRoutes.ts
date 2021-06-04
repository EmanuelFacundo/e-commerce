import express from 'express';
import { UsersController } from '../Controllers/UsersController'

const router = express.Router();

const usersController = new UsersController()

router.get('/allUsers', usersController.getUsers)

export default router