<script setup lang="ts">
import { FilterInput, Datepicker } from '@/components'
import useFilterInput from '@/composables/filter-input'

const { inputValue, internalValue, filter } = useFilterInput(inject('storeId')!)
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <datepicker
      v-model="inputValue"
      type="month"
      class="filter-year-month"
      :placeholder="filter.label"
    />
  </filter-input>
</template>
