<script setup lang="ts">
import { endOfMonth } from 'date-fns'
import { JP_DATE_FORMAT, parseDate, formatDate } from '@/utils/date'
import { FilterValue } from '@/components'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  const startDate = parseDate(filterValue.value.start)
  const endDate = parseDate(filterValue.value.end)
  const now = new Date()

  const sameYear = startDate.getFullYear() === endDate.getFullYear()
  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const startIsCurrentYear = startDate.getFullYear() === now.getFullYear()

  const justStart = startDate.getDate() === 1
  const justEnd = endOfMonth(endDate).getDate() === endDate.getDate()
  const justMonth = justStart && justEnd

  const hideStartYear = startIsCurrentYear && sameYear
  const hideStartDay = justMonth

  const hideEndYear = sameYear
  const hideEndDay = justMonth

  const startFormat = createFormat(hideStartYear, hideStartDay)
  const endFormat = createFormat(hideEndYear, hideEndDay)

  const startStr = formatDate(startDate, startFormat)
  const endStr = formatDate(endDate, endFormat)

  return sameYear && sameMonth ? `${startStr}` : `${startStr}~${endStr}`
})

function createFormat(hideYear: boolean, hideDay: boolean) {
  return `${hideYear ? '' : 'yy年'}M月${hideDay ? '' : 'd日'}`
}

const tooltipValue = computed(() => {
  const startDate = parseDate(filterValue.value.start)
  const endDate = parseDate(filterValue.value.end)
  return `${formatDate(startDate, JP_DATE_FORMAT)} ~ ${formatDate(endDate, JP_DATE_FORMAT)}`
})
</script>

<template>
  <FilterValue class="-date-range" v-bind="{ ...props, filterValue }">
    <span class="value">{{ displayValue }}</span>
    <template v-slot:tooltip>
      <div class="tooltip-value">{{ tooltipValue }}</div>
    </template>
  </FilterValue>
</template>

<style lang="scss" scoped>
.tooltip-value {
  margin: 0;
  padding: 0;
}
</style>
