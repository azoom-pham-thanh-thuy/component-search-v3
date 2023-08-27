import {
  isEmpty,
  isNull,
  isUndefined,
  isArray,
  isObject as _isObject,
  isDate
} from 'lodash'

export function isObject(obj: any): boolean {
  return !isArray(obj) && _isObject(obj)
}

export function isEmptyValue(value: any): boolean {
  if (isArray(value) || (_isObject(value) && !isDate(value))) {
    return isEmpty(value)
  }
  return isNull(value) || isUndefined(value) || value === ''
}

export function generateRandomString(length: number): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
