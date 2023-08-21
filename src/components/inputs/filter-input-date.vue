<script setup lang="ts">
import { Datepicker, FilterInput } from '@/components'
import useFilterInput from '@/composables/filter-input'

const { inputValue, internalValue, filter } = useFilterInput(inject('storeId')!)
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <!-- @vue-ignore -->
    <datepicker
      v-model="inputValue"
      type="date"
      class="filter-date"
      :placeholder="filter.label"
    />
  </filter-input>
</template>
