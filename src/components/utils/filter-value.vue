<script setup lang="ts">
import { propOptions } from '@/composables/filter-value'
import Preset from '@/utils/Preset'
import useSearchStore from '@/stores'
import { Obj } from '@/types'

const props = defineProps({ ...propOptions })
const slots = useSlots()

const searchStore = useSearchStore(inject('storeId')!)
const tooltip = ref<null | Obj<number>>(null)
const tooltipShown = computed(() => {
  if (!slots.tooltip) return false
  if (props.filterValue?.length < 2) return false
  return Boolean(tooltip.value)
})

const hasPreset = computed(() => {
  return Preset.isPreset(props.value)
})

function editFilter() {
  if (props.editable) {
    searchStore.showFilter(props.filter.name)
  }
}

function showTooltip(event: Event) {
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  tooltip.value = {
    positionTop: rect.bottom + window.pageYOffset + 14,
    positionLeft: rect.left + window.pageXOffset - 4
  }
}

function hideTooltip() {
  tooltip.value = null
}
</script>

<template>
  <div class="filter-value">
    <v-chip
      variant="outlined"
      color="primary"
      :closable="closeable"
      :class="['filter-chip', { '-highlighted': highlighted }]"
      @click="editFilter"
      @click:close="searchStore.removeFilterValue(filter.name)"
    >
      <div class="label">
        {{ filter.label }}
        <b v-if="filter.allowSingleSearch">*</b>：
      </div>
      <div
        class="value"
        @mouseenter.stop="showTooltip"
        @mouseleave.stop="hideTooltip"
      >
        <slot v-if="!hasPreset" />
        <div v-if="hasPreset">[{{ filter.presetLabelOf?.(value) }}]</div>
      </div>
    </v-chip>
    <div
      v-if="tooltipShown"
      class="filter-tooltip"
      :style="{
        top: `${tooltip && tooltip.positionTop}px`,
        left: `${tooltip && tooltip.positionLeft}px`
      }"
    >
      <slot name="tooltip" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-chip {
  --v-chip-height: 26px;
  white-space: nowrap;
  &.-highlighted {
    background-color: rgba(var(--v-theme-primary), 0.1);
  }
  > :deep(.v-chip__content) > .value {
    font-weight: bold;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.filter-tooltip {
  position: fixed;
  border-radius: 6px;
  background-color: rgba(#000, 0.7);
  color: #fff;
  padding: 8px;
  margin: 0;
  z-index: 3;
  font-size: 0.8rem;
  min-width: 50px;
  &:before {
    content: '';
    position: absolute;
    top: -12px;
    left: 20px;
    border: 6px solid transparent;
    border-bottom: 6px solid rgba(#000, 0.7);
    z-index: 2;
  }
}
</style>
