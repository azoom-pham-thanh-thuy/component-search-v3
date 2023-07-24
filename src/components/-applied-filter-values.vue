<script setup lang="ts">
import { computed } from 'vue'
import { orderBy } from 'lodash'
import CopyButton from '@/components/utils/copy-button.vue'
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'

const searchStore = useSearchStore()
const { settings, runtime, appliedFilters } = storeToRefs(searchStore)

const sortedAppliedFilters = computed(() =>
  orderBy(appliedFilters.value, ['required'], ['desc'])
)

const emptyMessage = computed(() =>
  settings.value.allowEmptyFilters
    ? '検索項目が指定されていません'
    : '検索項目を指定してください'
)
</script>

<template>
  <div
    :class="[
      'applied-filter-values',
      { '-compact-view': runtime.isCompactView }
    ]"
  >
    <div class="values">
      <template v-for="filter in sortedAppliedFilters" :key="filter.name">
        <component
          v-if="filter"
          class="value"
          :is="typeof filter.type === 'object' && filter.type.value()"
          :closeable="!filter.required"
          :editable="true"
          :highlighted="filter.required"
          :filter="filter"
          :value="runtime.filterValues[filter.name]"
        />
      </template>
      <div v-if="!appliedFilters.length" class="value -empty">
        {{ emptyMessage }}
      </div>
    </div>
    <copy-button :value="runtime.filterValues" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.applied-filter-values {
  display: flex;
  justify-content: space-between;
  background-color: #f2f4f7;
  border-radius: 3px;
  box-shadow: inset 0px 0px 5px 0px rgba(var(--v-theme-black), 0.1);
  padding: 4px;
  min-height: 36px;

  &.-compact-view > .values {
    @include screen-mobile {
      flex-wrap: nowrap;
      overflow-x: scroll;
    }
  }

  > .values {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px 2px;
  }

  > .values > .value.-empty {
    font-size: 0.9rem;
    color: rgba(var(--v-theme-black), 0.38);
    padding: 0 5px;
  }
}
</style>
