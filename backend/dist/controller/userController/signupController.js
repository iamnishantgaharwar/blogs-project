'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.signupFunc = void 0
const client_1 = require('@prisma/client')
const hashUtils_1 = require('../../utils/hashUtils')
const responseFunction_1 = require('../../utils/responseFunction')
const responseMessages_1 = __importDefault(
  require('../../utils/responseMessages')
)
const statusCode_1 = __importDefault(require('../../utils/statusCode'))
const prisma = new client_1.PrismaClient()
const signupFunc = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { firstName, lastName, phone, email, password } = req.body
      // Input validation
      if (!firstName || !email || !password) {
        res.send(
          (0, responseFunction_1.errorResponseFunc)(
            responseMessages_1.default.incompleteFields,
            null,
            statusCode_1.default.badRequest,
            'Validation Error'
          )
        )
        return
      }
      // Hash password
      const strongPass = yield (0, hashUtils_1.hashPassword)(password)
      // Create user in the database
      const newUser = yield prisma.user.create({
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
        (0, responseFunction_1.successResponseFunc)(
          responseMessages_1.default.created,
          statusCode_1.default.created,
          'Success',
          { userId: newUser.id },
          `${newUser.firstName} ${newUser.lastName} created`
        )
      )
    } catch (e) {
      console.error('Error during signup:', e)
      if (e.code === 'P2002') {
        // Handle unique constraint violation error (e.g., email already exists)
        res.send(
          (0, responseFunction_1.errorResponseFunc)(
            responseMessages_1.default.exists,
            e.message,
            statusCode_1.default.conflict,
            'Conflict Error'
          )
        )
      } else {
        // Handle internal server error
        res.send(
          (0, responseFunction_1.errorResponseFunc)(
            responseMessages_1.default.internalServerError,
            e.message,
            statusCode_1.default.internalServerError,
            'Internal Server Error'
          )
        )
      }
    }
  })
exports.signupFunc = signupFunc
