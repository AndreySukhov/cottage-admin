import {HTTP_ERROR_CODES, USER_ROLES} from './constants'

const httpErrorCodeToMessage = (code) => {
  return HTTP_ERROR_CODES[code] || HTTP_ERROR_CODES.defaultError
}

const isAdmin = (role) => {
  return role === USER_ROLES.Admin.value
}

const getLocalCurrencyStr = (num) => (
  num.toLocaleString('ru-RU', {
    style: 'currency', currency: 'rub',
  }).replace(',00', '')
);

const declension = (nounArray, number) => {
  const num = Math.floor(number);
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (num % 100 > 4 && num % 100 < 20)
    ? 2
    : cases[(num % 10 < 5) ? num % 10 : 5];
  return nounArray[index];
}

export {
  httpErrorCodeToMessage,
  isAdmin,
  getLocalCurrencyStr,
  declension,
}
