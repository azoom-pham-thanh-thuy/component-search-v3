<script setup lang="ts">
import { get } from 'lodash'
import { isObject } from '@/utils/app'
import { FilterInput, Datepicker } from '@/components'
import useFilterInput from '@/composables/filter-input'
import type { DateRange } from '@/types'

const { inputValue, internalValue } = useFilterInput(inject('storeId')!)
const dateRange = ref<DateRange>({ start: null, end: null })

watch(dateRange, (newRange) => (inputValue.value = newRange), { deep: true })

onMounted(() => {
  if (isObject(inputValue.value)) {
    dateRange.value = inputValue.value as DateRange
  }
})

provide('isEmptyValue', function isEmptyValue(value: object) {
  return !get(value, 'start') || !get(value, 'end')
})
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <div class="filter-date-range">
      <datepicker
        v-model="dateRange.start"
        type="month"
        placeholder="開始月"
        tabindex="1"
        class="month"
      />
      <datepicker
        v-model="dateRange.end"
        type="month"
        placeholder="終了月"
        tabindex="2"
        class="month"
      />
    </div>
  </filter-input>
</template>

<style lang="scss" scoped>
.filter-date-range {
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  > .month {
    &:first-child {
      margin-right: 20px;
    }
    &:first-child:after {
      content: '~';
      position: absolute;
      right: -15px;
      top: 10px;
    }
  }
}
</style>
