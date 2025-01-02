// user Routes

import { Router } from 'express'
import { SUCCESS } from '../utils/constant'

const router = Router()

router.post('/signup', (req, res) => {
  res.send(SUCCESS)
})

export default router
