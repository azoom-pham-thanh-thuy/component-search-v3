<script setup lang="ts">
import { head } from 'lodash'
import { FilterValue } from '@/components'
import useFilterValue, { propOptions } from '@/composables/filter-value'
import type { FilterItem } from '@/types'

const props = defineProps({ ...propOptions })
const { filterValue } = useFilterValue(props)

const tooltip = ref(null)

const tailIcon = computed(() => {
  if (!filterValue.value.length) return undefined
  if (filterValue.value.length > 9)
    return 'mdi-numeric-9-plus-box-multiple-outline'
  return `mdi-numeric-${filterValue.value.length}-box-multiple-outline`
})

const tooltipShown = computed(() => {
  if (filterValue.value.length < 2) return false
  return tooltip.value
})

const allItems = computed(() => {
  return (props.filter.items as FilterItem[]).filter((item) =>
    filterValue.value.includes(item.value)
  )
})

const headItem = computed(() => {
  return head(allItems.value) ?? { icon: undefined, label: '' }
})
</script>

<template>
  <FilterValue class="-array" v-bind="{ ...props, filterValue }">
    <div class="array-value">
      <div class="head">
        <v-icon v-if="headItem.icon" class="icon" :icon="headItem.icon" />
        <span class="value">{{ headItem.label }}</span>
      </div>
      <template v-if="filterValue.length > 1">
        <span class="hastail">など</span>
        <v-icon class="tailicon" :icon="tailIcon" />
      </template>
    </div>
    <template v-slot:tooltip>
      <ul class="tooltip-labels">
        <li v-for="item in allItems" :key="item.value" class="label">
          <v-icon v-if="item.icon" class="icon" :icon="item.icon" />
          <span class="value">{{ item.label }}</span>
        </li>
      </ul>
    </template>
  </FilterValue>
</template>

<style lang="scss" scoped>
.array-value {
  display: flex;
  align-items: center;
  > .head {
    display: flex;
    align-items: center;
    margin-right: 2px;
  }
  > .head > .icon {
    font-size: 1.1rem;
    margin-right: 5px;
  }
  > .hastail {
    font-weight: normal;
    font-size: 0.7rem;
    margin-right: 5px;
  }
  > .tailicon {
    font-size: 1.2rem;
  }
}
.tooltip-labels {
  list-style: none;
  padding: 0;
  margin: 0;
  > .label {
    display: flex;
    align-items: center;
    margin: 2px 0;
  }
  > .label > .icon {
    font-size: 1.1rem;
    margin-right: 3px;
  }
}
</style>
