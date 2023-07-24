import {
  isEmpty,
  isNull,
  isUndefined,
  isArray,
  isObject as _isObject
} from 'lodash'

export function isObject(obj: any): boolean {
  return !isArray(obj) && _isObject(obj)
}

export function isEmptyValue(value: any): boolean {
  if (isArray(value) || _isObject(value)) {
    return isEmpty(value)
  }
  return isNull(value) || isUndefined(value) || value === ''
}

export function generateRandomString(length: number): string {
  const baseNumber = 2
  return Math.random().toString(36).slice(baseNumber, baseNumber + length)
}
