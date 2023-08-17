<script setup lang="ts">
import { format } from 'date-fns'
import { FilterValue } from '@/components'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  return format(filterValue.value, 'YY年M月D日')
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span class="filter-value-date">{{ displayValue }}</span>
  </FilterValue>
</template>
