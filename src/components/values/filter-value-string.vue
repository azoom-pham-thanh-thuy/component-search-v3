<script setup lang="ts">
import { FilterValue } from '@/components'
import useFilterValue, { propOptions } from '@/composables/filter-value'
import { FilterItem } from '@/types'

const props = defineProps({ ...propOptions })

const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  if (props.filter.items) {
    const item = (props.filter.items as FilterItem[]).find(
      ({ value }) => value == filterValue.value
    )
    if (item && item.label) {
      return item.label
    }
  }
  return String(filterValue.value)
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span>{{ displayValue }}</span>
  </FilterValue>
</template>
