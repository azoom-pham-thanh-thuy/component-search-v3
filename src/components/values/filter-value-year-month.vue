<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import FilterValue from '@/components/utils/filter-value.vue'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  return format(filterValue.value, 'YY年M月')
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span class="filter-value-year-month">{{ displayValue }}</span>
  </FilterValue>
</template>
