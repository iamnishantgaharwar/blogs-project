import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { hashPassword } from '../../utils/hashUtils'

const prisma = new PrismaClient()

export const signupFunc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, phone, email, password } = req.body
    const strongPass = await hashPassword(password)
    if (!firstName || !email || !password) {
      res
        .status(400)
        .json({ message: 'First name, email, and password are required.' })
      return
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: strongPass,
        phone,
      },
    })

    console.log('Added New User ==>', newUser)

    res.status(201).json({
      success: true,
    })
  } catch (e) {
    console.error('Error during signup:', e)
  }
}
