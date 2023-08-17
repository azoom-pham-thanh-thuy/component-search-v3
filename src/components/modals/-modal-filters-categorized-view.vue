<script setup lang="ts">
import { head } from 'lodash'
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'
import { SortableList } from '@/components'
import type { Obj, Filter } from '@/types'

const props = withDefaults(
  defineProps<{ filterKeyword?: string; sortType?: string }>(),
  {
    filterKeyword: '',
    sortType: 'default',
  }
)

const searchStore = useSearchStore(inject('storeId')!)
const { settings, runtime } = storeToRefs(searchStore)

const activeCategory = ref<string | null | undefined>(null)
const visibleCategorizedFilters = computed(() => {
  if (!props.filterKeyword) {
    return settings.value.categorizedFilters as Obj<Filter[]>
  }
  const keywordRegex = new RegExp(props.filterKeyword, 'i')
  const searchByKeyword = (
    result: Obj<Filter[]>,
    [category, filters]: [string, Filter[]]
  ) => {
    const newFilters = filters.filter((filter) => {
      const normalizedLabel = filter.label.replace(/ /g, '').toLowerCase()
      return keywordRegex.test(normalizedLabel)
    })
    if (newFilters.length) {
      result[category] = newFilters
    }
    return result
  }
  const result = Object.entries(settings.value.categorizedFilters!).reduce(
    searchByKeyword,
    {}
  )
  return result
})

watch(visibleCategorizedFilters, () => {
  selectDefaultCategory()
})

onBeforeMount(() => {
  if (settings.value.categorizedFilters) {
    selectDefaultCategory()
  }
})

function selectDefaultCategory() {
  activeCategory.value = head(Object.keys(visibleCategorizedFilters.value))
}

function isApplied(filter: Obj) {
  return Boolean(
    Object.keys(runtime.value.filterValues).find((name) => filter.name === name)
  )
}
</script>

<template>
  <div class="categorized-view">
    <ul class="category-list">
      <li
        v-for="category in Object.keys(visibleCategorizedFilters)"
        :key="category"
        :class="['category', { active: category === activeCategory }]"
        @click="activeCategory = category"
      >
        <span class="name">{{ category }}</span>
        <v-icon icon="mdi-chevron-right" />
      </li>
    </ul>
    <sortable-list
      class="filter-list"
      :filters="visibleCategorizedFilters[activeCategory!]"
      :filterKeyword="filterKeyword"
      :sortType="sortType"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.categorized-view {
  display: flex;
  > .category-list {
    flex: 1;
    margin: 0;
  }
  > .filter-list {
    flex: 1 20%;
    margin: 0;
  }
}
.category-list {
  padding: 0;
  border-right: solid 1px #ddd;
  height: 100%;
  overflow-y: scroll;
  > .category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    list-style: none;
    line-height: 1.5rem;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    &.active {
      background-color: #e5e5e5;
    }
  }
  > .category > .icon {
    display: none;
  }
  > .category.active > .icon {
    display: initial;
    margin: 0 0 0 auto;
  }
}
</style>
