import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan('dev')) //Logs
app.use(express.json())
app.use(cors())

app.listen(4004, () => {
  console.log(`'listening' ${4004}`)
})