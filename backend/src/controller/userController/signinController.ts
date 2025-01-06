import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
  errorResponseFunc,
  successResponseFunc,
} from '../../utils/responseFunction'
import responseMessage from '../../utils/responseMessages'
import statusCode from '../../utils/statusCode'

const prisma = new PrismaClient()

export const signInFunc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    // Input validation
    if (!email || !password) {
      res.send(
        errorResponseFunc(
          responseMessage.incompleteFields,
          null,
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
      res.send(
        errorResponseFunc(
          responseMessage.notExist,
          'User not found',
          statusCode.notFound,
          'User Not Found'
        )
      )
      return
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.send(
        errorResponseFunc(
          responseMessage.incorrectPassword,
          'Incorrect password',
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

    // Send success response with token
    res.send(
      successResponseFunc(
        responseMessage.success,
        statusCode.success,
        'Success',
        { token },
        'User logged in successfully'
      )
    )
  } catch (e: any) {
    console.error('Error during signin:', e)

    res.send(
      errorResponseFunc(
        responseMessage.internalServerError,
        e.message,
        statusCode.internalServerError,
        'Internal Server Error'
      )
    )
  }
}
