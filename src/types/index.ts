import {
  FILTER_INPUT_COMPONENTS,
  FILTER_VALUE_COMPONENTS,
  FILTER_ICONS,
  FILTER_TYPES,
  MODAL_COMPONENTS
} from '@/constants/settings'

export type IconKeys = keyof typeof FILTER_ICONS
export type TypeKeys = keyof typeof FILTER_TYPES
export type InputCompKeys = keyof typeof FILTER_INPUT_COMPONENTS
export type ValueCompKeys = keyof typeof FILTER_VALUE_COMPONENTS
export type ModalComponentKeys = keyof typeof MODAL_COMPONENTS

export type InputType = null | string | { [key: string]: any } | Array<number>

export type Obj<T = unknown> = Record<string | number, T>

export interface Filter {
  name: string
  label: string
  type: string | Obj<any>
  icon: string
  allowEmptyValue?: boolean
  allowSingleSearch?: boolean
  required?: boolean
  options?: Obj
  items: Obj<any>[]
  helperText?: string
  defaultValue: () => any
  presetValueOf: (param?: Obj) => any
  presetLabelOf: (param?: Obj) => any
  loadItemsFunc: () => Promise<Obj[]>
}

export interface Settings {
  categorizedFilters: null | Obj<any>
  filters: Filter[]
  searchAfterFilterChanged: boolean
  searchAfterInit: boolean
  allowEmptyFilters: boolean
  historySize: number
  isMinimalMode: boolean
  searchWithQueryStringOnInit: boolean
}

export interface Bookmark {
  id: number | string
  name: string
  isDefault: boolean
  filterValues: object
}

export interface Runtime {
  modal: null | string
  isCompactView: boolean
  selectedFilterName: null | string
  selectedBookmark: null | Bookmark
  searchCall: null
  filterValues: Obj<any>
  searching: boolean
}

export interface Preference {
  initialized: boolean
  pinnedFilterNames: string[]
  histories: Obj[]
  bookmarks: Bookmark[]
}

export interface Config
  extends Partial<Omit<Settings, 'filters'>>,
    Partial<Runtime>,
    Partial<Preference> {
  filters: Filter[] | Obj
  defaultPinnedFilterNames: string[]
  defaultFilterValues?: Obj
}
