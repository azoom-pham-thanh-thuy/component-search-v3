import type { Obj, PresetArgs, DateRange } from '@/types'

export default class Preset {
  name: string
  label: string
  create: Function
  __AZ_FILTER_PRESET__: boolean

  constructor(public args: string | PresetArgs) {
    const {
      name,
      label = '',
      create = (): DateRange => ({ start: null, end: null }),
    } = typeof args === 'string' ? { name: args } : args

    this.name = name
    this.label = label
    this.create = create
    this.__AZ_FILTER_PRESET__ = true
  }

  static isPreset(obj: Obj<string | boolean>) {
    return obj && obj.name && obj.__AZ_FILTER_PRESET__
  }
}

export function preset(args: string | PresetArgs) {
  return new Preset(args)
}
