// Success response structure
interface SuccessResponse {
  status: 'success'
  message: string
  code: number
  type: string
  data: object | null
}

export const successResponseFunc = (
  message: string,
  code: number,
  type: string,
  data: object | null
): SuccessResponse => {
  return {
    status: 'success',
    message: message,
    code: code,
    type: type,
    data: data,
  }
}

// Error response structure
interface ErrorResponse {
  status: 'error'
  message: string
  code: number
  type: string
}

export const errorResponseFunc = (
  message: string,
  code: number,
  type: string
): ErrorResponse => {
  return {
    status: 'error',
    message: message,
    code: code,
    type: type,
  }
}
