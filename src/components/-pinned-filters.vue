<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'

const searchStore = useSearchStore(inject('storeId')!)
const { settings, runtime, pinnedFilters } = storeToRefs(searchStore)
</script>

<template>
  <div :class="['pinned-filters', { '-compact-view': runtime.isCompactView }]">
    <div
      v-for="filter in pinnedFilters"
      :key="filter.name"
      class="filter-wrapper"
    >
      <v-chip
        color="primary"
        class="filter"
        @click="searchStore.showFilter(filter.name)"
      >
        <v-icon size="x-small" class="icon" :icon="filter.icon" />
        <span class="label">
          {{ filter.label }}
          <b v-if="filter.allowSingleSearch">*</b>
        </span>
      </v-chip>
      <i v-if="!settings.isMinimalMode" class="icon -pin" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.pinned-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  &.-compact-view {
    @include screen-mobile {
      flex-wrap: nowrap;
      overflow-x: scroll;
    }
  }
}
.filter-wrapper {
  position: relative;
  > .filter {
    --v-chip-height: 28px;
    margin: 0 2px;
  }
  > .filter > :deep(.v-chip__underlay) {
    background-color: rgba(var(--v-theme-primary), 0.0549);
    opacity: unset;
  }
  > .filter > .label {
    color: rgb(var(--v-theme-primary));
    white-space: nowrap;
  }
  > .filter > :deep(.v-chip__content) .icon {
    margin-right: 4px;
  }
  > .icon.-pin {
    top: 0;
    right: 0;
    position: absolute;
    height: 14px;
    width: 14px;
    padding: 0;
    opacity: 0.6;
    transform: rotate(45deg);
    cursor: default;
    background-color: rgb(var(--v-theme-primary, #6200ee));
    -webkit-mask: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNyAyaDEwdjJsLTIgMXY1bDMgM3YzaC01djRsLTEgM2wtMS0zdi00SDZ2LTNsMy0zVjVMNyA0VjJ6bTYgMmgtMnY2LjgyOGwtMyAzVjE0aDh2LS4xNzJsLTMtM1Y0eiIvPjwvc3ZnPg==')
      no-repeat center center;
    -webkit-mask-size: cover;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
