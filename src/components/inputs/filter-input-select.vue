<script setup lang="ts">
import { FilterInput } from '@/components'
import useFilterInput from '@/composables/filter-input'
import { FilterItem } from '@/types'

const { filter, inputValue, internalValue } = useFilterInput(inject('storeId')!)
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <div class="filter-select">
      <v-select
        v-model="inputValue"
        item-title="label"
        item-value="value"
        class="select"
        :items="(filter.items as FilterItem[])"
        :label="filter.label"
      />
    </div>
  </filter-input>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.filter-select {
  display: flex;
  justify-content: center;
  width: 100%;
  > .select {
    flex: unset;
    grid-template-columns: max-content 180px max-content;
    @include screen-mobile {
      flex: 1 1 auto;
      grid-template-columns: max-content minmax(0, 1fr) max-content;
    }
  }
}
</style>
