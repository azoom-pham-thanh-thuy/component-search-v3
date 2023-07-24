import CustomInput from '@/sample/custom-input.vue'
import CustomValue from '@/sample/custom-value.vue'
import { preset } from '@/main'

const loadStatuses = () => {
  return Promise.resolve([
    { label: '受付', value: 1 },
    { label: 'ヒアリング済', value: 2 },
    { label: '空室有メール送信', value: 3 },
    { label: '満室メール送信', value: 4 },
    { label: '見込み', value: 5 }
  ])
}

const textFilter = {
  name: 'textfield',
  label: 'Text field',
  type: 'text',
  allowEmptyValue: true,
  helperText: 'This is helper text.',
  options: {
    inputTextfield: {
      countable: true,
      maxlength: 20,
      fullwidth: true
    }
  }
}

const numberTextFilter = {
  icon: 'mdi-account-multiple-outline',
  name: 'people',
  label: 'People',
  type: 'text',
  allowEmptyValue: true,
  options: {
    inputTextfield: {
      preText: '約',
      postText: '人'
    }
  }
}

const idFilter = {
  name: 'id',
  label: 'ID',
  type: 'text',
  allowSingleSearch: true
}

const checkboxFilter = {
  name: 'checkbox',
  label: 'Check box',
  items: [
    { label: 'No Color', value: 0, icon: 'mdi-palette' },
    { label: 'Red', value: 1, icon: 'mdi-palette' },
    { label: 'Blue', value: 2, icon: 'mdi-palette' },
    { label: 'Yellow', value: 3, icon: 'mdi-palette' },
    { label: 'White', value: 4, icon: 'mdi-palette' },
    { label: 'Green', value: 5, icon: 'mdi-palette' },
    { label: 'Black', value: 6, icon: 'mdi-palette' },
    { label: 'Purple', value: 7, icon: 'mdi-palette' },
    { label: 'Vivid Green', value: 8, icon: 'mdi-palette' },
    { label: 'British racing green', value: 9, icon: 'mdi-palette' },
    { label: 'Dark jungle green', value: 10, icon: 'mdi-palette' }
  ],
  defaultValue: () => [1, 2],
  type: 'checkbox',
  options: {
    inputCheckbox: {
      checkAllEnabled: true,
      columnSize: 2
    }
  }
}
const radioFilter = {
  name: 'radio',
  label: 'Radio',
  items: [
    { label: '開発を続ける', value: '1' },
    { label: '疲れたので帰って明日やる', value: '2' }
  ],
  defaultValue: () => '2',
  type: 'radio'
}
const selectFilter = {
  name: 'select',
  label: 'Select',
  loadItemsFunc: loadStatuses,
  type: 'select'
}
const dateFilter = {
  name: 'date',
  label: 'Date',
  type: 'date',
  defaultValue: () => '2020-01-01'
}

const dateRangeFilter = {
  name: 'dateRange',
  label: 'Date range',
  type: 'dateRange',
  required: true,
  defaultValue: () => preset('last3Months')
}
const yearMonthFilter = {
  name: 'yearMonth',
  label: 'Year month',
  type: 'yearMonth',
}
const yearMonthRangeFilter = {
  name: 'yearMonthRange',
  label: 'Year month Range',
  type: 'yearMonthRange',
}
const autocompleteFilter = {
  name: 'autocomplete',
  label: 'Autocomplete',
  type: 'autocomplete',
  items: [
    { label: 'auto 1', value: '1' },
    { label: 'auto 2', value: '2' },
    { label: 'auto 3', value: '3' },
    { label: 'auto 4', value: '4' },
    { label: 'auto 5', value: '5' }
  ]
}
const customFilter = {
  name: 'custom',
  label: 'Custom',
  type: {
    input: CustomInput,
    value: CustomValue
  },
  defaultValue: () => ({
    fruits: [1, 2],
    grade: 1
  }),
  items: {
    fruits: [
      { label: 'banana', value: 1 },
      { label: 'orange', value: 2 },
      { label: 'grape', value: 3 }
    ],
    grades: [
      { label: 'Luxury', value: 1 },
      { label: 'Normal', value: 2 }
    ]
  }
}

export const filters = [
  textFilter,
  checkboxFilter,
  radioFilter,
  selectFilter,
  dateFilter,
  dateRangeFilter,
  yearMonthFilter,
  yearMonthRangeFilter,
  autocompleteFilter,
  customFilter
]

export const categorizedFilters = {
  Default: [
    idFilter,
    textFilter,
    numberTextFilter,
    checkboxFilter,
    radioFilter,
    selectFilter,
    dateFilter,
    dateRangeFilter,
    yearMonthFilter,
    yearMonthRangeFilter,
    autocompleteFilter,
  ],
  Custom: [
    customFilter
  ]
}

export const defaultFilterValues = {
  textfield: 'Default Value',
  dateRange: preset('last3Months')
}

export const defaultPinnedFilterNames = ['textfield', 'people', 'date', 'checkbox']