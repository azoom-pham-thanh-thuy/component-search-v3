<script setup lang="ts">
import { computed } from 'vue'
import FilterValue from '@/components/utils/filter-value.vue'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })

const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  if (props.filter.items) {
    const item = props.filter.items.find(
      (item: { value: unknown }) => item.value == filterValue.value
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
