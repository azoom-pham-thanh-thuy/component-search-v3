<script setup lang="ts">
import { computed } from 'vue'
import { format, parse, endOfMonth } from 'date-fns'
import FilterValue from '@/components/utils/filter-value.vue'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  const startDate = parse(filterValue.value.start)
  const endDate = parse(filterValue.value.end)
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

  const startStr = format(startDate, startFormat)
  const endStr = format(endDate, endFormat)

  return sameYear && sameMonth ? `${startStr}` : `${startStr}~${endStr}`
})

function createFormat(hideYear: boolean, hideDay: boolean) {
  return `${hideYear ? '' : 'YY年'}M月${hideDay ? '' : 'D日'}`
}

const tooltipValue = computed(() => {
  const startDate = parse(filterValue.value.start)
  const endDate = parse(filterValue.value.end)
  const formatDate = (d: Date) => format(d, 'yyyy年M月DD日')
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`
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
