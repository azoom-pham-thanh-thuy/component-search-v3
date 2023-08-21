<script setup lang="ts">
import { FilterValue } from '@/components'
import useFilterValue, { propOptions } from '@/composables/filter-value'
import { formatDate } from '@/utils/date'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  return formatDate(new Date(filterValue.value), 'yy年M月')
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span class="filter-value-year-month">{{ displayValue }}</span>
  </FilterValue>
</template>
