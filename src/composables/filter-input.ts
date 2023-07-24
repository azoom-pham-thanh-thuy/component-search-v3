import { ref, watch, nextTick, onBeforeMount } from 'vue'
import { cloneDeep } from 'lodash'
import { isObject } from '@/utils/app'
import Preset from '@/utils/Preset'
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'
import type { InputType } from '@/types'

export default function useFilterInput() {
  const searchStore = useSearchStore()
  const {
    selectedFilter: filter,
    selectedFilterValue: filterValue
  } = storeToRefs(searchStore)

  const inputValue = ref<InputType>(null)
  const internalValue = ref<InputType>(null)
  const internalPreset = ref<InputType>(null)

  onBeforeMount(() => {
    const watchStart = () => {
      watch(
        () => inputValue.value,
        (newValue) => {
          internalPreset.value = null
          internalValue.value = newValue
        },
        { deep: true }
      )
    }

    if (Preset.isPreset(filterValue.value)) {
      inputValue.value = filter.value?.presetValueOf(filterValue.value)
      internalPreset.value = filterValue.value
      internalValue.value = filterValue.value
      watchStart()
      return
    }

    if (filterValue.value) {
      inputValue.value = cloneDeep(filterValue.value)
      internalValue.value = cloneDeep(filterValue.value)
      watchStart()
      return
    }

    if (filter.value?.defaultValue) {
      inputValue.value = filter.value.defaultValue()
      internalValue.value = filter.value.defaultValue()
      watchStart()
      return
    }

    watchStart()
  })

  function togglePreset(preset: unknown) {
    if (isSelectedPreset(preset)) {
      unselectePreset()
    } else {
      selectPreset(preset)
    }
  }

  function selectPreset(preset: any) {
    inputValue.value = preset.create()
    nextTick(() => {
      internalValue.value = preset
      internalPreset.value = preset
    })
  }

  function unselectePreset() {
    internalPreset.value = null
    internalValue.value = inputValue.value
  }

  function isSelectedPreset(preset: unknown) {
    return (
      isObject(internalPreset.value) &&
      // @ts-ignore
      internalPreset.value.name === preset.name
    )
  }

  return {
    inputValue,
    internalValue,
    internalPreset,
    filter,
    togglePreset,
    isSelectedPreset
  }
}
