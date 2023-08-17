<script setup lang="ts">
import { FilterInput } from '@/components'
import useFilterInput from '@/composables/filter-input'
import { FilterItem } from '@/types';

const { filter, inputValue, internalValue } = useFilterInput(inject('storeId')!)
</script>

<template>
  <filter-input class="-radio" v-bind="{ internalValue }">
    <v-radio-group v-model="inputValue" inline class="radio-list">
      <v-radio
        v-for="item in (filter.items as FilterItem[])"
        :key="item.value"
        class="radio"
        :label="item.label"
        :value="item.value"
      />
    </v-radio-group>
  </filter-input>
</template>

<style lang="scss" scoped>
.radio-list {
  flex: unset;
  > :deep(.v-input__control) > .v-selection-control-group {
    column-gap: 10px;
  }
}
</style>
