<script setup lang="ts">
import { computed } from 'vue'
import { orderBy } from 'lodash'
import { format, parse } from 'date-fns'
import ModalDialog from '@/components/utils/modal-dialog.vue'
import CopyButton from '@/components/utils/copy-button.vue'
import useSearchStore from '@/stores'
import { storeToRefs } from 'pinia'
import { Obj } from '@/types'

const searchStore = useSearchStore()
const { settings, preference } = storeToRefs(searchStore)

const sortedHistories = computed<Obj<any>[]>(() => {
  return orderBy(preference.value.histories, ['timestamp'], ['desc'])
})

function withFilter(filterValues: object = {}) {
  return orderBy(
    Object.entries(filterValues).map(([filterName, filterValue]) => {
      const filter = settings.value.filters.find((x) => x.name === filterName)
      return { filter, filterValue }
    }),
    ['filter.required'],
    ['desc']
  )
}

function searchWith(filterValues: object) {
  searchStore.updateFilterValues(filterValues)
  searchStore.callSearch({ recordable: false })
  searchStore.hideModal()
}

function addToBookmarks(filterValues: object) {
  searchStore.showBookmarkEdit({ filterValues })
}

function formatTimestamp(timestamp: string) {
  return format(parse(timestamp), 'YYYY/MM/DD HH:mm:ss')
}
</script>

<template>
  <modal-dialog icon="mdi-history" class="-histories">
    <template v-slot:header>検索履歴</template>
    <div class="modal-histories">
      <div
        v-for="history in sortedHistories"
        :key="history.timestamp"
        class="history"
      >
        <div class="filters">
          <template
            v-for="{ filter, filterValue } in withFilter(history.filterValues)"
            :key="filter?.name"
          >
            <component
              v-if="filter"
              class="filter"
              :is="typeof filter.type == 'object' && filter.type.value()"
              :editable="false"
              :closeable="false"
              :highlighted="filter.required"
              :filter="filter"
              :value="filterValue"
            />
          </template>
        </div>
        <div class="footer">
          <div class="date">{{ formatTimestamp(history.timestamp) }}</div>
          <div class="buttons">
            <copy-button :value="history.filterValues" class="button -copy" />
            <v-btn
              variant="outlined"
              size="small"
              class="button -bookmark"
              @click="addToBookmarks(history.filterValues)"
            >
              ブックマーク
            </v-btn>
            <v-btn
              size="small"
              class="button -search"
              @click="searchWith(history.filterValues)"
            >
              検索
            </v-btn>
          </div>
        </div>
      </div>
      <div v-if="!preference.histories.length" class="empty-message">
        検索履歴が保存されていません。
      </div>
    </div>
  </modal-dialog>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.modal-dialog.-histories {
  top: 40px;
  right: 0;
  @include screen-mobile {
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.modal-histories {
  height: calc(80vh - 64px);
  overflow-y: scroll;
  min-height: 300px;
  > .history {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    &:not(:last-child) {
      border-bottom: solid 1px #d8d8d8;
    }
  }
  > .history > .filters {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 4px;
    margin-bottom: 10px;
  }
  > .history > .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  > .history > .footer > .date {
    padding-right: 20px;
    text-align: right;
    font-size: 12px;
    list-style: none;
  }
  > .history > .footer > .buttons {
    list-style: none;
    display: flex;
    align-items: center;
  }
  > .history > .footer > .buttons > .button.-copy {
    margin-right: 5px;
  }
  > .history > .footer > .buttons > .button.-bookmark {
    margin-right: 5px;
  }
}
.empty-message {
  padding: 20px;
  color: #888;
  text-align: center;
}
</style>
