<script setup lang="ts">
import { computed } from 'vue'
import FilterValue from '@/components/utils/filter-value.vue'
import useFilterValue, { propOptions } from '@/composables/filter-value'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const grade = computed(() => {
  return props.filter.items.grades.find((grade: { value: unknown }) => {
    return filterValue.value.grade === grade.value
  })
})

const fruits = computed(() => {
  return filterValue.value.fruits
})
</script>

<template>
  <FilterValue v-bind="{ ...props, filterValue }">
    <span>{{ grade.label }} {{ fruits.length }}</span>
  </FilterValue>
</template>
