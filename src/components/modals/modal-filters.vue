<script setup lang="ts">
import { ModalDialog, CategorizedView, SortableList } from '@/components'
import { SORT_ICONS } from '@/constants/settings'
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'

const searchStore = useSearchStore(inject('storeId')!)
const { settings, categoryEnabled } = storeToRefs(searchStore)

type IconKeys = keyof typeof SORT_ICONS
const sortTypes = ref<IconKeys[]>(['default', 'pinned', 'collated'])
const filterKeyword = ref('')
const activeSortType = ref('default')

function iconOf(sortType: IconKeys) {
  return SORT_ICONS[sortType]
}
</script>

<template>
  <modal-dialog icon="mdi-filter-variant" class="-filters">
    <template v-slot:header>
      <v-form class="form-field -search">
        <v-text-field
          hide-details
          variant="filled"
          density="compact"
          label="項目を検索"
          bg-color="white"
          class="input -outlined"
          @input="filterKeyword = $event.target.value"
        />
      </v-form>
      <div class="sorts">
        <span
          v-for="sortType in sortTypes"
          :key="sortType"
          :class="['sort', { '-active': activeSortType === sortType }]"
          @click="activeSortType = sortType"
        >
          <v-icon
            :icon="iconOf(sortType)"
            :class="['icon', { '-pinned ': !iconOf(sortType) }]"
          />
        </span>
      </div>
    </template>
    <categorized-view
      v-if="categoryEnabled"
      class="filter-view"
      :filterKeyword="filterKeyword"
      :sortType="activeSortType"
    />
    <sortable-list
      v-else
      class="filter-view"
      :filterKeyword="filterKeyword"
      :sortType="activeSortType"
      :filters="settings.filters"
    />
  </modal-dialog>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.modal-dialog.-filters {
  top: 40px;
  right: 0;
  @include screen-mobile {
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.modal-dialog > .header {
  > .sorts {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  > .sorts > .sort {
    padding: 5px;
    cursor: pointer;
  }
  > .sorts > .sort:hover {
    background-color: rgba(#cdd1db, 0.4);
  }
  > .sorts > .sort.-active {
    background-color: #cdd1db;
  }
  > .sorts > .sort > .icon.-pinned {
    @include pin-icon();
  }
}
.form-field {
  margin-bottom: 0;
  width: 275px;
}
.filter-view {
  height: calc(80vh - 64px);
  min-height: 300px;
}
</style>
