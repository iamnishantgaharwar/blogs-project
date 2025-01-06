// Success response structure
export const successResponseFunc = (
  message: string,
  code: number,
  type: string,
  data: object | null,
  details: string
) => {
  return {
    status: 'success',
    message: message,
    code: code,
    type: type,
    data: data,
    details: details,
  }
}

// Error response structure
export const errorResponseFunc = (
  message: string,
  details: string | null,
  code: number,
  type: string
) => {
  return {
    status: 'error',
    message: message,
    details: details,
    code: code,
    type: type,
  }
}
