<script setup lang="ts">
import { FilterValue } from '@/components'
import useFilterValue from '@/composables/filter-value'
import { Obj } from '@/types'

const { props, filterValue } = useFilterValue()

const grade = computed(() => {
  return props.filter.items.grades.find((grade: Obj) => {
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
