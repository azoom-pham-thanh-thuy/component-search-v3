<script setup lang="ts">
import { get } from 'lodash'
import { FilterInput, Datepicker } from '@/components'
import useFilterInput from '@/composables/filter-input'
import { isObject } from '@/utils/app'

const PRESET_GROUPS = {
  lastMonth: ['last1Month', 'last3Months', 'last6Months'],
  month: ['thisMonth', 'prevMonth', 'nextMonth'],
  quarter: ['thisQuarter', 'prevQuarter', 'nextQuarter'],
  half: ['thisHalf', 'prevHalf', 'nextHalf']
}

const {
  filter,
  inputValue,
  internalValue,
  isSelectedPreset,
  togglePreset
} = useFilterInput(inject('storeId')!)

const dateRange = computed({
  get: () => {
    return isObject(inputValue.value)
      ? inputValue.value
      : { start: null, end: null }
  },
  set: (value) => (inputValue.value = value)
})

const appliedPresets = computed(() => {
  return Object.entries(PRESET_GROUPS).map(([group, presetNames]) => {
    // @ts-ignore
    const presets = filter.value.type.presets.filter(
      (preset: { name: string }) => presetNames.includes(preset.name)
    )
    return [group, presets]
  })
})

provide('isEmptyValue', function isEmptyValue(value: object) {
  return !get(value, 'start') || !get(value, 'end')
})
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <div class="filter-date-range">
      <div class="form">
        <!-- @vue-ignore -->
        <datepicker
          v-model="dateRange.start"
          type="date"
          placeholder="開始日"
          class="date"
        />
        <!-- @vue-ignore -->
        <datepicker
          v-model="dateRange.end"
          type="date"
          placeholder="終了日"
          class="date"
        />
      </div>
      <div class="presets">
        <div
          class="group"
          v-for="[group, presets] in appliedPresets"
          :key="group"
        >
          <v-chip
            v-for="preset in presets"
            :key="preset.name"
            :class="['preset', { '-selected': isSelectedPreset(preset) }]"
            @click="togglePreset(preset)"
          >
            {{ preset.label }}
          </v-chip>
        </div>
      </div>
    </div>
  </filter-input>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.filter-date-range {
  width: 100%;
  padding: 10px 0;
  > .form {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    align-items: center;
    justify-content: center;
  }
  > .form > .date {
    margin: 5px;
  }
  > .presets {
    display: flex;
    flex-direction: column;
    row-gap: 3px;
  }
  > .presets > .group > .preset {
    $opacity: 1;
    margin: 2px;
    font-size: 13px;
    color: rgba(var(--v-theme-on-surface), $opacity) !important;
    background-color: rgba(var(--v-theme-gray), $opacity);
    &.-selected {
      color: rgba(var(--v-theme-surface), $opacity) !important;
      background-color: rgba(var(--v-theme-primary), $opacity);
    }
  }
}
</style>
