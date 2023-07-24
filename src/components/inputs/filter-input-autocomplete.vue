<script setup lang="ts">
import { computed } from 'vue'
import FilterInput from '@/components/utils/filter-input.vue'
import Autocomplete from '@/components/utils/autocomplete.vue'
import useFilterInput from '@/composables/filter-input'

const { inputValue, internalValue, filter } = useFilterInput()

const initLabel = computed(() => {
  const item = filter.value.items.find(
    (item: any) => item.value === inputValue.value
  )
  if (item && item.label) {
    return item.label
  }
  return null
})
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
        :suggestions="filter.items"
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
