import {
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  format
} from 'date-fns'

const DATE_FORMAT = 'YYYY-MM-DD'

const QUARTER_MONTHS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12]
]
const HALF_PERIOD_MONTHS = [
  [10, 11, 12, 1, 2, 3],
  [4, 5, 6, 7, 8, 9]
]

export const formatDate = (d: string | number | Date) => format(d, DATE_FORMAT)

export const createLastNMonthRange = (n: number, now = new Date) => {
  const start = format(subMonths(now, n), DATE_FORMAT)
  const end = format(now, DATE_FORMAT)
  return { start, end }
}

export const createNMonthRange = (n: number, now = new Date) => {
  const nMonth = addMonths(now, n)
  const start = format(startOfMonth(nMonth), DATE_FORMAT)
  const end = format(endOfMonth(nMonth), DATE_FORMAT)
  return { start, end }
}

export const createNQuarterRange = (n: number, now = new Date) => {
  return createNPeriodRange(n, QUARTER_MONTHS, 3, now)
}

export const createNHalfPeriodRange = (n: number, now = new Date) => {
  return createNPeriodRange(n, HALF_PERIOD_MONTHS, 6, now)
}

export const createNPeriodRange = (n: number, monthRanges: number[][], size: number, now = new Date) => {
  const targetDate = addMonths(now, n * size)
  const targetMonth = targetDate.getMonth() + 1

  const months = monthRanges.find((months) => months.includes(targetMonth))
  const monthIndex = months!.indexOf(targetMonth)

  const start = startOfMonth(addMonths(targetDate, -monthIndex))
  const end = endOfMonth(addMonths(targetDate, size - monthIndex - 1))

  return { start: formatDate(start), end: formatDate(end) }
}
