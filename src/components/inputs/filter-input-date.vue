<script setup lang="ts">
import { inject } from 'vue'
import Datepicker from '@/components/utils/datepicker.vue'
import FilterInput from '@/components/utils/filter-input.vue'
import useFilterInput from '@/composables/filter-input'

const { inputValue, internalValue, filter } = useFilterInput(inject('storeId'))
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
