import path from 'path';
import http from 'http'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import config from './config'
import userRouter from './Routes/UsersRoutes'
import collectionRouter from './Routes/CollectionRoutes'
import process from 'process';
import clothingRoutes from './Routes/ClothingRoutes';

dotenv.config()

// Connect to Mongo
mongoose.connect(config.mongo.url, config.mongo.options)
  .then(res => {
    console.log(`Connected to Mongo DB`)
  })
  .catch(err => {
    console.log(err)
  })

const app = express()

app.use(morgan('dev')) //Logs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', userRouter)
app.use('/collections', collectionRouter)
app.use('/clothes', clothingRoutes)
app.use('/files', 
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
)

const httpServer = http.createServer(app)

httpServer.listen(process.env.APP_PORT, () => {
  console.log(`Server is online at port: ${process.env.APP_PORT}`)
})
