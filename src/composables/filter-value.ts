import { computed } from 'vue'
import Preset from '@/utils/Preset'

export const propOptions = {
  filter: {
    type: Object,
    default: () => ({})
  },
  value: {
    type: null,
    default: null
  },
  filterValue: {
    type: null,
    required: false
  },
  editable: {
    type: Boolean,
    default: true
  },
  closeable: {
    type: Boolean,
    default: true
  },
  highlighted: {
    type: Boolean,
    default: false
  }
}

export default function useFilterValue(props: any) {
  const filterValue = computed(() => {
    return Preset.isPreset(props.value)
      ? props.filter.presetValueOf(props.value)
      : props.value
  })

  return {
    filterValue
  }
}
