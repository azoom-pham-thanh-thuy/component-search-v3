<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import qs from 'qs'
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'
import AppliedFilterValues from '@/components/-applied-filter-values.vue'
import PinnedFilters from '@/components/-pinned-filters.vue'
import { MODAL_COMPONENTS } from '@/constants/settings'
import { decoder } from '@/utils/decoder'
import { type ModalComponentKeys } from '@/types'

const props = withDefaults(defineProps<{ storeId: string }>(), {
  storeId: 'searchStore'
})

const emit = defineEmits<{
  (e: 'filter-change', filterValue: object): void
}>()

const searchStore = useSearchStore(props.storeId)
const { settings, runtime, preference, canSearch, pinnedFilters } =
  storeToRefs(searchStore)
const {
  showFilters,
  showBookmarks,
  showHistory,
  hideModal,
  callSearch,
  toggleCompactView,
  clearFilterValues,
  updateFilterValues
} = searchStore

const modalComponent = computed(
  () => MODAL_COMPONENTS[runtime.value.modal as ModalComponentKeys]
)

const backDropShown = computed(() => Boolean(runtime.value.modal))
const searchButtonText = computed(() =>
  runtime.value.searching ? '...' : '検索'
)

watch(
  () => preference.value.initialized,
  (bool) => {
    if (bool) {
      if (settings.value.searchAfterInit) {
        callSearch({ recordable: false })
      }
      if (settings.value.searchWithQueryStringOnInit && location.search) {
        const condition = qs.parse(location.search, {
          ignoreQueryPrefix: true,
          decoder
        })
        updateFilterValues(condition)
        callSearch()
        history.replaceState(null, '', location.pathname)
      }

      watch(runtime.value.filterValues, () => {
        emit('filter-change', runtime.value.filterValues)
        if (settings.value.searchAfterFilterChanged) {
          callSearch()
        }
      })
    }
  }
)

provide('storeId', props.storeId)
</script>
<template>
  <div class="search-component">
    <div class="main">
      <div class="form-area">
        <applied-filter-values class="filter-values" />
        <pinned-filters class="pinned-filters" />
      </div>
      <div class="control-area">
        <div class="settings">
          <v-btn
            variant="outlined"
            density="comfortable"
            color="primary"
            class="button -mode"
            :icon="`mdi-unfold-${
              runtime.isCompactView ? 'more' : 'less'
            }-horizontal`"
            @click="toggleCompactView"
          />
          <v-btn
            v-if="!settings.isMinimalMode"
            icon="mdi-filter-variant"
            variant="outlined"
            density="comfortable"
            color="primary"
            class="button -filter"
            @click="showFilters"
          />
          <v-btn
            v-if="!settings.isMinimalMode"
            icon="mdi-star"
            variant="outlined"
            density="comfortable"
            color="primary"
            class="button -bookmarks"
            @click="showBookmarks"
          />
          <v-btn
            v-if="!settings.isMinimalMode"
            icon="mdi-history"
            variant="outlined"
            density="comfortable"
            color="primary"
            class="button -history"
            @click="showHistory"
          />
        </div>
        <div class="actions">
          <v-btn
            icon="mdi-delete"
            variant="text"
            color="primary"
            class="button -clear"
            :disabled="!canSearch"
            @click="clearFilterValues"
          />
          <v-btn
            class="button -search"
            color="primary"
            :disabled="!canSearch || runtime.searching"
            @click="callSearch"
          >
            {{ searchButtonText }}
          </v-btn>
        </div>
      </div>
    </div>

    <component :is="modalComponent" />
    <div v-show="backDropShown" class="backdrop" @click="hideModal"></div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.search-component {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  // color: rgb(var(--v-theme-primary));
  > .main {
    display: flex;
    width: 100%;
    @include screen-mobile {
      flex-direction: column;
    }
  }
  > .backdrop {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    background: #000;
    top: 0;
    left: 0;
    opacity: 0.3;
    z-index: 5;
  }
}
.form-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 2px;
  > .filter-values {
    width: 100%;
    margin-bottom: 5px;
  }
  > .pinned-filters {
    width: 100%;
    margin-bottom: 5px;
  }
}
.control-area {
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  @include screen-mobile {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  > .settings {
    display: flex;
    column-gap: 6px;
  }
  > .settings > .button {
    border-radius: 5px;
  }
  > .settings > .button.-mode {
    display: none;
    @include screen-mobile {
      display: inline-block;
    }
  }
  > .actions {
    display: flex;
    justify-content: space-between;
    margin: 3px 0;
  }
  > .actions > .button.-search {
    padding: 0 23.5px;
  }
  > .actions > .button.-clear {
    --v-btn-height: 24px;
    @include screen-mobile {
      margin: 0 3px;
    }
  }
}
</style>
