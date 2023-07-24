<template>
  <filter-input v-bind="{ internalValue }">
    <datepicker
      v-model="inputValue"
      type="month"
      :placeholder="filter.label"
      class="filter-year-month"
    />
  </filter-input>
</template>
<script setup lang="ts">
import FilterInput from '@/components/utils/filter-input.vue'
import Datepicker from '@/components/utils/datepicker.vue'
import useFilterInput from '@/composables/filter-input'

const { inputValue, internalValue, filter } = useFilterInput()
</script>
