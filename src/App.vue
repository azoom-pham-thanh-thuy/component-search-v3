<script setup lang="ts">
import useSearchStore from '@/stores'
import AzSearch from '@/components/search.vue'
import {
  categorizedFilters,
  defaultPinnedFilterNames,
  defaultFilterValues
} from '@/sample/config'

const searchStore = useSearchStore()
searchStore.init({
  filters: categorizedFilters,
  defaultPinnedFilterNames,
  searchWithQueryStringOnInit: true,
  defaultFilterValues,
  allowEmptyFilters: false,
  searchAfterInit: false,
  searchAfterFilterChanged: true,
  historySize: 20,
  isMinimalMode: false
})
</script>

<template>
  <div class="app-content">
    <az-search class="search" />
  </div>
</template>

<style scoped lang="scss">
.app-content {
  margin: 0 auto;
  padding: 2%;
  max-width: 1200px;
}
</style>
