import type { PropType } from 'vue'
import pick from 'lodash/pick'
import Preset from '@/utils/Preset'
import { Obj, Filter } from '@/types'

export const propOptions = {
  filter: {
    type: Object as PropType<Filter>,
    default: () => ({}),
  },
  value: {
    type: null,
    default: null,
  },
  filterValue: {
    type: Array,
    required: false,
    default: () => [],
  },
  editable: {
    type: Boolean,
    default: true,
  },
  closeable: {
    type: Boolean,
    default: true,
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
}

export default function useFilterValue(props: Obj<any> = useAttrs()) {
  const filterValue = computed(() => {
    return Preset.isPreset(props.value)
      ? props.filter.presetValueOf(props.value)
      : props.value
  })

  return {
    props: pick(props, Object.keys(propOptions)),
    filterValue,
  }
}
