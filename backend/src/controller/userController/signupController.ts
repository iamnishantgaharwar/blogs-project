import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { hashPassword } from '../../utils/hashUtils'
import {
  errorResponseFunc,
  successResponseFunc,
} from '../../utils/responseFunction'
import responseMessage from '../../utils/responseMessages'
import statusCode from '../../utils/statusCode'

const prisma = new PrismaClient()

export const signupFunc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, phone, email, password } = req.body

    // Input validation
    if (!firstName || !email || !password) {
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

    // Hash password
    const strongPass = await hashPassword(password)

    // Create user in the database
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: strongPass,
        phone,
      },
    })

    // Send success response
    res.send(
      successResponseFunc(
        responseMessage.created,
        statusCode.created,
        'Success',
        { userId: newUser.id },
        `${newUser.firstName} ${newUser.lastName} created`
      )
    )
  } catch (e: any) {
    console.error('Error during signup:', e)

    if (e.code === 'P2002') {
      // Handle unique constraint violation error (e.g., email already exists)
      res.send(
        errorResponseFunc(
          responseMessage.exists,
          e.message,
          statusCode.conflict,
          'Conflict Error'
        )
      )
    } else {
      // Handle internal server error
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
}
