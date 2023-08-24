import type { Component } from 'vue'
import { flatten } from 'lodash'
import {
  FILTER_INPUT_COMPONENTS,
  FILTER_VALUE_COMPONENTS,
  FILTER_ICONS,
  FILTER_TYPES,
} from '@/constants/settings'
import Preset from '@/utils/Preset'
import type {
  IconKeys,
  TypeKeys,
  InputCompKeys,
  ValueCompKeys,
  Filter,
  Config,
  PresetArgs,
} from '@/types'

export const buildConfig = async (config: Config) => {
  if (!Array.isArray(config.filters)) {
    config.categorizedFilters = config.filters
    config.filters = flatten(Object.values(config.filters))
  }
  await Promise.all(
    config.filters.map(async (filter: Filter) => {
      // items
      if (filter.loadItemsFunc) {
        filter.items = await filter.loadItemsFunc()
      }

      // icon
      if (!filter.icon) {
        filter.icon =
          FILTER_ICONS[filter.type as IconKeys] || FILTER_ICONS['default']
      }

      // allowEmptyValue
      if (typeof filter.allowEmptyValue === 'undefined') {
        filter.allowEmptyValue = false
      }

      // required
      if (typeof filter.required === 'undefined') {
        filter.required = false
      }

      // options
      if (!filter.options) {
        filter.options = {}
      }

      // filter type
      let type: {
        input?: Component
        value?: Component
        presets?: PresetArgs[]
      } = {}

      if (typeof filter.type === 'string') {
        type = FILTER_TYPES[filter.type as TypeKeys]
      } else {
        type.input =
          typeof filter.type.input === 'string'
            ? FILTER_INPUT_COMPONENTS[filter.type.input as InputCompKeys]
            : filter.type.input
        type.value =
          typeof filter.type.value === 'string'
            ? FILTER_VALUE_COMPONENTS[filter.type.value as ValueCompKeys]
            : filter.type.value
      }
      filter.type = {
        input: () => type.input,
        value: () => type.value,
        presets: type.presets
          ? type.presets.map((preset) => new Preset(preset))
          : null,
      }

      filter.presetValueOf = type.presets
        ? (value) => {
            const preset = type.presets?.find(
              ({ name }) => name === value?.name
            )
            return preset ? preset.create() : null
          }
        : () => null
      filter.presetLabelOf = type.presets
        ? (value) => {
            const preset = type.presets?.find(
              ({ name }) => name === value?.name
            )
            return preset ? preset.label : null
          }
        : () => null
    })
  )
}
