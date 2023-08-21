<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ModalDialog, CopyButton } from '@/components'
import useSearchStore from '@/stores'

const searchStore = useSearchStore(inject('storeId')!)
const { runtime, preference } = storeToRefs(searchStore)

function searchWith(filterValues: object = {}) {
  searchStore.updateFilterValues(filterValues)
  searchStore.callSearch({ recordable: false })
  searchStore.hideModal()
}
function bookmarkCurrent() {
  searchStore.showBookmarkEdit({ filterValues: runtime.value.filterValues })
}
</script>

<template>
  <modal-dialog icon="mdi-star" class="-bookmarks">
    <template v-slot:header>ブックマーク</template>
    <div class="modal-bookmarks">
      <div class="bookmark-list">
        <div
          v-for="bookmark in preference.bookmarks"
          :key="bookmark.id"
          :class="['bookmark', { '-default': bookmark.isDefault }]"
        >
          <div class="name">
            <span class="value">{{ bookmark.name }}</span>
            <v-icon
              v-if="bookmark.isDefault"
              icon="mdi-check-circle"
              size="x-small"
              color="primary"
              class="icon"
            />
          </div>
          <div class="actions">
            <copy-button class="button" :value="bookmark.filterValues" />
            <v-btn
              variant="outlined"
              size="small"
              color="primary"
              class="button -edit"
              @click="searchStore.showBookmarkEdit(bookmark)"
            >
              編集
            </v-btn>
            <v-btn
              size="small"
              color="primary"
              class="button -search"
              @click="searchWith(bookmark.filterValues)"
            >
              検索
            </v-btn>
          </div>
        </div>
        <div v-if="!preference.bookmarks.length" class="empty-message">
          ブックマークが保存されていません。
        </div>
      </div>
      <div class="footer">
        <v-btn
          variant="text"
          color="primary"
          class="button -bookmark-current"
          @click="bookmarkCurrent"
        >
          現在の検索をブックマークする
        </v-btn>
      </div>
    </div>
  </modal-dialog>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.modal-dialog.-bookmarks {
  top: 40px;
  right: 0;
  @include screen-mobile {
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.modal-bookmarks {
  > .bookmark-list {
    height: calc(80vh - 106px);
    min-height: 300px;
    overflow-y: scroll;
  }
  > .footer {
    padding: 5px;
    text-align: right;
    width: 100%;
    box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.1);
  }
  > .footer > .button {
    --v-btn-height: 32px;
  }
}
.bookmark-list {
  position: relative;
  padding: 15px;
  > .bookmark {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      padding-bottom: 15px;
    }
  }
  > .bookmark.-default > .name {
    display: flex;
    align-items: center;
    color: rgb(var(--v-theme-primary));
    font-weight: bold;
  }
  > .bookmark.-default > .name > .icon {
    margin-left: 5px;
  }
  > .bookmark > .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  > .bookmark > .actions > .button {
    margin-left: 10px;
  }
}
.empty-message {
  padding: 20px;
  color: #888;
  text-align: center;
}
</style>
