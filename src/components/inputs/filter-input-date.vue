<script setup lang="ts">
import { Datepicker, FilterInput } from '@/components'
import useFilterInput from '@/composables/filter-input'

const { inputValue, internalValue, filter } = useFilterInput(inject('storeId')!)
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <datepicker
      v-model="inputValue"
      type="date"
      class="filter-date"
      :placeholder="filter.label"
    />
  </filter-input>
</template>
