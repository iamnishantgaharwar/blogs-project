import express, { Request, Response } from 'express'
import userRoutes from './routes/userRoute'

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

app.use('/api', userRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
