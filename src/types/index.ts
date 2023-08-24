import type { Component } from 'vue'
import {
  FILTER_INPUT_COMPONENTS,
  FILTER_VALUE_COMPONENTS,
  FILTER_ICONS,
  FILTER_TYPES,
  MODAL_COMPONENTS,
} from '@/constants/settings'
import Preset from '@/utils/Preset'

export type IconKeys = keyof typeof FILTER_ICONS
export type TypeKeys = keyof typeof FILTER_TYPES
export type InputCompKeys = keyof typeof FILTER_INPUT_COMPONENTS
export type ValueCompKeys = keyof typeof FILTER_VALUE_COMPONENTS
export type ModalComponentKeys = keyof typeof MODAL_COMPONENTS

export type InputType =
  | null
  | string
  | { [key: string]: any }
  | Array<number | string>
  | Preset

export type Obj<T = unknown> = Record<string | number, T>

export interface StoreAdditional {
  state?: Obj
  actions?: Obj<Function>
}

export interface DateRange {
  start: string | null
  end: string | null
}

export interface PresetArgs {
  name: string
  label: string
  create: () => DateRange
}

export interface FilterType {
  input: string | Component | (() => Component)
  value: string | Component | (() => Component)
  presets?: null | Preset[]
}

export interface TextfieldOptions {
  fullwidth?: boolean
  countable?: true
  maxlength?: number
  preText?: string
  postText?: string
}

export interface CheckboxOptions {
  checkAllEnabled?: boolean
  columnSize?: number
}

export interface FilterItem {
  label: string
  value: string | number
  icon?: string
}

export interface Filter {
  name: string
  label: string
  type: string | FilterType
  icon?: string
  allowEmptyValue?: boolean
  allowSingleSearch?: boolean
  required?: boolean
  options?: Obj<TextfieldOptions | CheckboxOptions | Obj>
  items?: FilterItem[] | Obj<FilterItem[]>
  helperText?: string
  defaultValue?: () => InputType
  presetValueOf?: (param?: Obj) => null | DateRange
  presetLabelOf?: (param?: Obj) => null | string
  loadItemsFunc?: () => Promise<FilterItem[]>
}

export interface Settings {
  categorizedFilters: null | Obj<Filter[]>
  filters: Filter[]
  searchAfterFilterChanged: boolean
  searchAfterInit: boolean
  allowEmptyFilters: boolean
  historySize: number
  isMinimalMode: boolean
  searchWithQueryStringOnInit: boolean
}

export interface Bookmark {
  id?: string
  name?: string
  isDefault?: boolean
  filterValues: object
}

export interface Runtime {
  modal: null | ModalComponentKeys
  isCompactView: boolean
  selectedFilterName: null | string
  selectedBookmark: null | Bookmark
  searchCall: null
  filterValues: Obj<any>
  searching: boolean
}

export interface History {
  id?: number | string
  timestamp: string
  filterValues: Obj
}

export interface Preference {
  initialized: boolean
  pinnedFilterNames: string[]
  histories: History[]
  bookmarks: Bookmark[]
}

export interface Config
  extends Partial<Omit<Settings, 'filters'>>,
    Partial<Runtime>,
    Partial<Preference> {
  filters: Filter[] | Obj<Filter[]>
  defaultPinnedFilterNames: string[]
  defaultFilterValues?: Obj
}
