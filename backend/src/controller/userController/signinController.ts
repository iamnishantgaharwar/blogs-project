import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {
  errorResponseFunc,
  successResponseFunc,
} from '../../utils/responseFunction'
import responseMessage from '../../utils/responseMessages'
import statusCode from '../../utils/statusCode'
import { logWithContext } from '../../utils/util'

const prisma = new PrismaClient()

export const signInFunc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body
    logWithContext('info', 'sign-in', 'Sign-In Request Received')
    // Input validation
    if (!email || !password) {
      res.send(
        errorResponseFunc(
          responseMessage.incompleteFields,
          statusCode.badRequest,
          'Validation Error'
        )
      )
      return
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      logWithContext('error', 'sign-in', 'User Not Found')
      res.send(
        errorResponseFunc(
          responseMessage.notExist,
          statusCode.notFound,
          'User Not Found'
        )
      )

      return
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      logWithContext('error', 'sign-in', 'Incorrect Password')
      res.send(
        errorResponseFunc(
          responseMessage.incorrectPassword,
          statusCode.unauthorized,
          'Unauthorized'
        )
      )
      return
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string, // Ensure you have a valid JWT_SECRET environment variable
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    logWithContext('info', 'sign-in', 'User Logged In Successfully')

    // Send success response with token
    res.send(
      successResponseFunc(
        'User logged in successfully',
        statusCode.success,
        'Success',
        { token }
      )
    )
  } catch (e: any) {
    console.error('Error during signin:', e)
    logWithContext('error', 'sign-in', e)
    res.send(
      errorResponseFunc(
        responseMessage.internalServerError,
        statusCode.internalServerError,
        'Internal Server Error'
      )
    )
  }
}
