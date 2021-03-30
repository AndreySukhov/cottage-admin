import {HTTP_ERROR_CODES, USER_ROLES} from './constants'

const httpErrorCodeToMessage = (code) => {
  return HTTP_ERROR_CODES[code] || HTTP_ERROR_CODES.defaultError
}

const isAdmin = (role) => {
  return role === USER_ROLES.Admin.value
}

export {
  httpErrorCodeToMessage,
  isAdmin,
}
