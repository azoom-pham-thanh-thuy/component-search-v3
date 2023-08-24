import {
  FilterInputTextfield,
  FilterInputCheckbox,
  FilterInputRadio,
  FilterInputSelect,
  FilterInputDate,
  FilterInputDateRange,
  FilterInputYearMonth,
  FilterInputYearMonthRange,
  FilterInputAutocomplete,
  FilterValueBoolean,
  FilterValueString,
  FilterValueArray,
  FilterValueDate,
  FilterValueDateRange,
  FilterValueYearMonth,
  FilterValueYearMonthRange,
  ModalFilters,
  ModalFilterInput,
  ModalHistories,
  ModalBookmarks,
  ModalBookmarkEdit,
} from '@/components'

import {
  createLastNMonthRange,
  createNMonthRange,
  createNQuarterRange,
  createNHalfPeriodRange,
} from '@/utils/date'

const FILTER_INPUT_COMPONENTS = {
  text: FilterInputTextfield,
  checkbox: FilterInputCheckbox,
  radio: FilterInputRadio,
  select: FilterInputSelect,
  date: FilterInputDate,
  dateRange: FilterInputDateRange,
  yearMonth: FilterInputYearMonth,
  yearMonthRange: FilterInputYearMonthRange,
  autocomplete: FilterInputAutocomplete,
}

const FILTER_VALUE_COMPONENTS = {
  string: FilterValueString,
  array: FilterValueArray,
  date: FilterValueDate,
  dateRange: FilterValueDateRange,
  yearMonth: FilterValueYearMonth,
  yearMonthRange: FilterValueYearMonthRange,
  boolean: FilterValueBoolean,
}

const FILTER_ICONS = {
  text: 'mdi-text-shadow',
  checkbox: 'mdi-checkbox-multiple-marked',
  radio: 'mdi-radiobox-marked',
  select: 'mdi-list-box-outline',
  date: 'mdi-calendar-blank',
  dateRange: 'mdi-calendar-range',
  yearMonth: 'mdi-calendar-blank',
  yearMonthRange: 'mdi-calendar-range',
  autocomplete: 'mdi-text-shadow',
  default: 'mdi-wrench',
}

const DATE_RANGE_PRESETS = [
  {
    name: 'last1Month',
    label: '過去1ヶ月',
    create: () => createLastNMonthRange(1),
  },
  {
    name: 'last3Months',
    label: '過去3ヶ月',
    create: () => createLastNMonthRange(3),
  },
  {
    name: 'last6Months',
    label: '過去6ヶ月',
    create: () => createLastNMonthRange(6),
  },
  { name: 'thisMonth', label: '今月', create: () => createNMonthRange(0) },
  { name: 'prevMonth', label: '前月', create: () => createNMonthRange(-1) },
  { name: 'nextMonth', label: '来月', create: () => createNMonthRange(1) },
  {
    name: 'thisQuarter',
    label: '今四半期',
    create: () => createNQuarterRange(0),
  },
  {
    name: 'prevQuarter',
    label: '前四半期',
    create: () => createNQuarterRange(-1),
  },
  {
    name: 'nextQuarter',
    label: '来四半期',
    create: () => createNQuarterRange(1),
  },
  {
    name: 'thisHalf',
    label: '今半期',
    create: () => createNHalfPeriodRange(0),
  },
  {
    name: 'prevHalf',
    label: '前半期',
    create: () => createNHalfPeriodRange(-1),
  },
  {
    name: 'nextHalf',
    label: '来半期',
    create: () => createNHalfPeriodRange(1),
  },
]

const FILTER_TYPES = {
  text: { input: FILTER_INPUT_COMPONENTS.text, value: FilterValueString },
  checkbox: {
    input: FILTER_INPUT_COMPONENTS.checkbox,
    value: FilterValueArray,
  },
  radio: { input: FilterInputRadio, value: FilterValueString },
  select: { input: FilterInputSelect, value: FilterValueString },
  date: { input: FilterInputDate, value: FilterValueDate },
  dateRange: {
    input: FilterInputDateRange,
    value: FilterValueDateRange,
    presets: DATE_RANGE_PRESETS,
  },
  yearMonth: { input: FilterInputYearMonth, value: FilterValueYearMonth },
  yearMonthRange: {
    input: FilterInputYearMonthRange,
    value: FilterValueYearMonthRange,
  },
  autocomplete: { input: FilterInputAutocomplete, value: FilterValueString },
}

const MODAL_COMPONENTS = {
  filters: ModalFilters,
  filterInput: ModalFilterInput,
  bookmarks: ModalBookmarks,
  bookmarkEdit: ModalBookmarkEdit,
  history: ModalHistories,
}

const SORT_ICONS = {
  default: 'mdi-sort-variant',
  pinned: 'mdi-pin-outline',
  collated: 'mdi-sort-alphabetical-variant',
}

export {
  FILTER_INPUT_COMPONENTS,
  FILTER_VALUE_COMPONENTS,
  FILTER_ICONS,
  FILTER_TYPES,
  MODAL_COMPONENTS,
  SORT_ICONS,
  DATE_RANGE_PRESETS,
}
