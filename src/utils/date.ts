import {
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  format,
  parse,
} from 'date-fns'

type DateRange = { start: string; end: string }

const QUARTER_MONTHS: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
]
const HALF_PERIOD_MONTHS: number[][] = [
  [10, 11, 12, 1, 2, 3],
  [4, 5, 6, 7, 8, 9],
]

export const TIME_FORMAT = 'HH:mm:ss'
export const DATE_FORMAT = 'yyyy-MM-dd'
export const JP_DATE_FORMAT = 'yyyy年M月dd日'

export function formatDate(
  date: number | Date,
  dateFormat: string = DATE_FORMAT
): string {
  return format(date, dateFormat)
}

export function createLastNMonthRange(n: number, now = new Date()) {
  const start = format(subMonths(now, n), DATE_FORMAT)
  const end = format(now, DATE_FORMAT)
  return { start, end }
}

export function createNMonthRange(n: number, now = new Date()): DateRange {
  const nMonth = addMonths(now, n)
  const start = format(startOfMonth(nMonth), DATE_FORMAT)
  const end = format(endOfMonth(nMonth), DATE_FORMAT)
  return { start, end }
}

export function createNQuarterRange(n: number, now = new Date()): DateRange {
  return createNPeriodRange(n, QUARTER_MONTHS, 3, now)
}

export function createNHalfPeriodRange(n: number, now = new Date()): DateRange {
  return createNPeriodRange(n, HALF_PERIOD_MONTHS, 6, now)
}

export function createNPeriodRange(
  n: number,
  monthRanges: number[][],
  size: number,
  now: Date = new Date()
): DateRange {
  const targetDate = addMonths(now, n * size)
  const targetMonth = targetDate.getMonth() + 1

  const months = monthRanges.find((months) => months.includes(targetMonth))
  const monthIndex = months!.indexOf(targetMonth)

  const start = startOfMonth(addMonths(targetDate, -monthIndex))
  const end = endOfMonth(addMonths(targetDate, size - monthIndex - 1))

  return { start: formatDate(start), end: formatDate(end) }
}

export function parseDate(
  dateString: string,
  formatString: string = DATE_FORMAT,
  referenceDate: number | Date = new Date()
): Date {
  return parse(dateString, formatString, referenceDate)
}
