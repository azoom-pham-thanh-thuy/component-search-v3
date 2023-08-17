<script setup lang="ts">
import { FilterInput, Autocomplete } from '@/components'
import useFilterInput from '@/composables/filter-input'
import type { FilterItem } from '@/types'

const { inputValue, internalValue, filter } = useFilterInput(inject('storeId')!)
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <div class="filter-autocomplete">
      <autocomplete
        v-model="inputValue"
        value-key="value"
        display-key="label"
        identify-key="label"
        :placeholder="filter.label"
        :suggestions="(filter.items as FilterItem[])"
      />
    </div>
  </filter-input>
</template>

<style lang="scss" scoped>
.filter-autocomplete {
  padding: 20px 0;
  text-align: right;
  > .input-autocomplete {
    margin-bottom: 15px;
  }
}
</style>
