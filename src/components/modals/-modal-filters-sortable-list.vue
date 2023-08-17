<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'
import type { Filter } from '@/types'

const props = defineProps({
  filters: {
    type: Array as PropType<Filter[]>,
    default: () => [],
  },
  filterKeyword: {
    type: String,
    default: '',
  },
  sortType: {
    type: String,
    default: 'default',
  },
})

const searchStore = useSearchStore(inject('storeId')!)
const { runtime, preference } = storeToRefs(searchStore)

const sortedFilters = computed<Filter[]>(() => {
  if (props.sortType === 'pinned') {
    return props.filters.slice().sort((filterA, filterB) => {
      const pinnedA = preference.value.pinnedFilterNames.includes(filterA.name)
      const pinnedB = preference.value.pinnedFilterNames.includes(filterB.name)
      if (!pinnedA && !pinnedB) return 0
      if (pinnedA && !pinnedB) return 1
      return -1
    })
  } else if (props.sortType === 'collated') {
    const collator = new Intl.Collator('ja')
    return props.filters.slice().sort((filterA, filterB) => {
      return collator.compare(filterA.label, filterB.label)
    })
  } else {
    return props.filters
  }
})

function isApplied(filter: Filter) {
  return Boolean(
    Object.keys(runtime.value.filterValues).find((name) => filter.name === name)
  )
}
</script>

<template>
  <ul class="sortable-list">
    <li
      v-for="filter in sortedFilters"
      :key="filter.name"
      :class="[
        'filter',
        { pinned: preference.pinnedFilterNames.includes(filter.name) },
      ]"
      @click="searchStore.showFilter(filter.name)"
    >
      <div class="name" :class="{ '-applied': isApplied(filter) }">
        <v-icon :icon="filter.icon" class="icon"></v-icon>
        <span class="value">
          {{ filter.label }}
          <b v-if="filter.allowSingleSearch">*</b>
        </span>
      </div>
      <v-btn
        icon
        variant="text"
        class="pin"
        @click.stop="searchStore.togglePinnedFilter(filter.name)"
      >
        <v-icon icon="mdi-pin-outline" color="black"></v-icon>
      </v-btn>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.sortable-list {
  flex: 1;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: scroll;
  > .filter {
    display: flex;
    justify-content: space-between;
    list-style: none;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  > .filter > .name {
    padding: 10px 0 10px 15px;
    width: 100%;
    text-align: left;
    &.-applied {
      color: rgb(var(--v-theme-primary));
    }
  }
  > .filter > .name > .icon {
    margin-right: 5px;
  }
  > .filter > .name > .value {
    vertical-align: middle;
  }
  > .filter .pin {
    padding: 10px 20px;
    opacity: 0.2;
  }
  > .pinned > .pin {
    opacity: 1;
  }
}
</style>
