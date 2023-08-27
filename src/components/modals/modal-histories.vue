<script setup lang="ts">
import { orderBy } from 'lodash'
import { storeToRefs } from 'pinia'
import { ModalDialog, CopyButton } from '@/components'
import useSearchStore from '@/stores'
import { parseDate, formatDate, DATE_FORMAT, TIME_FORMAT } from '@/utils/date'

const searchStore = useSearchStore(inject('storeId')!)
const { settings, preference } = storeToRefs(searchStore)

const sortedHistories = computed(() => {
  return orderBy(preference.value.histories, ['timestamp'], ['desc'])
})

function withFilter(filterValues: object = {}) {
  return orderBy(
    Object.entries(filterValues).map(([filterName, filterValue]) => {
      const filter = settings.value.filters.find(
        ({ name }) => name === filterName
      )
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
  return formatDate(
    parseDate(timestamp, `${DATE_FORMAT} ${TIME_FORMAT}`),
    `yyyy/MM/dd ${TIME_FORMAT}`
  )
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
              :is="typeof filter.type === 'object' && (filter.type.value as Function)()"
              :editable="false"
              :closeable="false"
              :highlighted="filter.required"
              :filter="filter"
              :value="filterValue"
              :filterValue="null"
            />
          </template>
        </div>
        <div class="footer">
          <div class="date">{{ formatTimestamp(history.timestamp) }}</div>
          <div class="buttons">
            <copy-button class="button -copy" :value="history.filterValues" />
            <v-btn
              variant="outlined"
              size="small"
              color="primary"
              class="button -bookmark"
              @click="addToBookmarks(history.filterValues)"
            >
              ブックマーク
            </v-btn>
            <v-btn
              size="small"
              color="primary"
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
