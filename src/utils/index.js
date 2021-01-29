const HTTP_ERROR_CODES = {
  defaultError: ' Произошла ошибка, попробуйте позднее',
  500: ' Произошла внутренняя ошибка сервиса, пожалуйста, сообщите разработчикам',
  413: 'Размер файла превышает максимально допустимый'
}

const httpErrorCodeToMessage = (code) => {
  return HTTP_ERROR_CODES[code] || HTTP_ERROR_CODES.defaultError
}

const USER_ROLES = [
  {value: 'Admin', label: 'администратор'},
  {value: 'Disigner', label: 'дизайнер'},
  {value: 'Editor', label: 'редактор'}
]

export {
  httpErrorCodeToMessage,
  USER_ROLES
}
