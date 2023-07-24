import type { Obj } from '@/types'

export default class Preset {
  name: string
  label: string
  create: string
  __AZ_FILTER_PRESET__: boolean

  constructor(public args: string | Obj<string>) {
    const { name, label = '', create = '' } =
      typeof args === 'string' ? { name: args } : args

    this.name = name
    this.label = label
    this.create = create
    this.__AZ_FILTER_PRESET__ = true
  }

  static isPreset(obj: Obj<null | string>) {
    return obj && obj.name && obj.__AZ_FILTER_PRESET__
  }
}

export function preset(args: string | Obj<string>) {
  return new Preset(args)
}
