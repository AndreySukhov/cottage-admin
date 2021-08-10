const USER_ROLES = {
  Admin: {value: 'Admin', label: 'администратор'},
  Owner:  {value: 'Owner', label: 'Владелец'},
};

const HTTP_ERROR_CODES = {
  defaultError: ' Произошла ошибка, попробуйте позднее',
  500: ' Произошла внутренняя ошибка сервиса, пожалуйста, сообщите разработчикам',
  400: 'Недопустимый запрос',
  413: 'Размер файла превышает максимально допустимый',
};

const USER_ROLES_ARRAY = Object.values(USER_ROLES).map((role) => role);


export {
  USER_ROLES,
  USER_ROLES_ARRAY,
  HTTP_ERROR_CODES,
};
