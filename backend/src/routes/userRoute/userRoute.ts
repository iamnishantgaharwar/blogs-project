// user Routes

import { Router } from 'express'
import { signupFunc } from '../../controller/userController/userController'

const router = Router()

router.post('/signup', signupFunc)

export default router
