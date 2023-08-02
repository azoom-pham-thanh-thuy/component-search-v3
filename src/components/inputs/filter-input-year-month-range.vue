<script setup lang="ts">
import { ref, watch, onMounted, inject } from 'vue'
import { get } from 'lodash'
import { isObject } from '@/utils/app'
import FilterInput from '@/components/utils/filter-input.vue'
import Datepicker from '@/components/utils/datepicker.vue'
import useFilterInput from '@/composables/filter-input'
import type { InputType } from '@/types'

const { inputValue, internalValue } = useFilterInput(inject('storeId'))
const dateRange = ref<InputType>({ start: null, end: null })

watch(dateRange, (newRange) => (inputValue.value = newRange), { deep: true })

onMounted(() => {
  if (isObject(inputValue.value)) {
    dateRange.value = inputValue.value
  }
})

function isEmptyValue(value: object) {
  return !get(value, 'start') || !get(value, 'end')
}
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <div class="filter-date-range">
      <!-- @vue-ignore -->
      <datepicker
        v-model="dateRange.start"
        type="month"
        placeholder="開始月"
        tabindex="1"
        class="month"
      />
      <!-- @vue-ignore -->
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
