<script setup lang="ts">
import { inject } from 'vue'
import FilterInput from '@/components/utils/filter-input.vue'
import useFilterInput from '@/composables/filter-input'

const { filter, inputValue, internalValue } = useFilterInput(inject('storeId'))
</script>

<template>
  <filter-input class="-radio" v-bind="{ internalValue }">
    <v-radio-group v-model="inputValue" inline class="radio-list">
      <v-radio
        v-for="item in filter.items"
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
