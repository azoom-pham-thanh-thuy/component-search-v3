<script setup lang="ts">
import { computed } from 'vue'
import { format, parse } from 'date-fns'
import FilterValue from '@/components/utils/filter-value.vue'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  const startDate = parse(filterValue.value.start)
  const endDate = parse(filterValue.value.end)

  const endStrFormat =
    startDate.getFullYear() === endDate.getFullYear() ? 'M月' : 'YY年M月'

  const startStr = format(startDate, 'YY年M月')
  const endStr = format(endDate, endStrFormat)

  return `${startStr} ~ ${endStr}`
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span class="filter-value-year-month-range">{{ displayValue }}</span>
  </FilterValue>
</template>
