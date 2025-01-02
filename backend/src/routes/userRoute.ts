// user Routes

import { Router } from 'express'

const router = Router()

router.post('/signup', (req, res) => {
  res.send('Signup successful')
})

export default router
