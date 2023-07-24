<script setup lang="ts">
import { computed } from 'vue'
import FilterValue from '@/components/utils/filter-value.vue'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const displayValue = computed(() => {
  return String(filterValue.value) === 'true' ? '○' : '✕'
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span class="filter-value-boolean">{{ displayValue }}</span>
  </FilterValue>
</template>
