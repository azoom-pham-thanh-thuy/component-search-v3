<script setup lang="ts">
import { FilterValue } from '@/components'
import useFilterValue, { propOptions } from '@/composables/filter-value'
import { parseDate, formatDate } from '@/utils/date'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  const startDate = parseDate(filterValue.value.start, 'yyyy-MM')
  const endDate = parseDate(filterValue.value.end, 'yyyy-MM')

  const endStrFormat =
    startDate.getFullYear() === endDate.getFullYear() ? 'M月' : 'yy年M月'

  const startStr = formatDate(startDate, 'yy年M月')
  const endStr = formatDate(endDate, endStrFormat)

  return `${startStr} ~ ${endStr}`
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span class="filter-value-year-month-range">{{ displayValue }}</span>
  </FilterValue>
</template>
