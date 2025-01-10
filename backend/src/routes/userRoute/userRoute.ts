// user Routes
import { Router } from 'express'
import {
  signInFunc,
  signupFunc,
} from '../../controller/userController/userIndex'
import { logWithContext } from '../../utils/logger'

const router = Router()

router.post('/signup', signupFunc)
router.post('/signin', signInFunc)

export default router
