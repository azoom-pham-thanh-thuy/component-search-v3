<script setup lang="ts">
import { ModalDialog } from '@/components'
import { get, orderBy } from 'lodash'
import useSearchStore from '@/stores'
import { storeToRefs } from 'pinia'
import { type Filter } from '@/types'

const searchStore = useSearchStore(inject('storeId')!)
const { settings, runtime } = storeToRefs(searchStore)

const name = ref<string>('')
const bookmark = computed(() => runtime.value.selectedBookmark!)
const isNewBookmark = computed(() => {
  return !bookmark.value.id
})

onBeforeMount(() => (name.value = get(bookmark.value, 'name', '')))

function save() {
  if (!name.value) return
  searchStore.saveBookmark({ ...bookmark.value, name: name.value })
  searchStore.showBookmarks()
}

function saveAsDefault() {
  if (!name.value) return
  searchStore.saveBookmark({
    ...bookmark.value,
    name: name.value,
    isDefault: true
  })
  searchStore.showBookmarks()
}

function remove() {
  searchStore.removeBookmark(bookmark.value)
  searchStore.showBookmarks()
}

function withFilter(filterValues: object = {}) {
  return orderBy(
    Object.entries(filterValues).map(([filterName, filterValue]) => {
      const filter = settings.value.filters.find(
        (filter: Filter) => filter.name === filterName
      )
      return { filter, filterValue }
    }),
    ['filter.required'],
    ['desc']
  )
}
</script>

<template>
  <modal-dialog icon="mdi-star" class="-bookmark-edit">
    <template v-slot:header>
      {{ isNewBookmark ? 'ブックマークの登録' : 'ブックマークの編集' }}
    </template>
    <div class="bookmark-edit">
      <v-form class="form">
        <v-text-field v-model="name" class="input" label="ブックマーク名" />
      </v-form>
      <div class="filters">
        <div
          v-for="{ filter, filterValue } in withFilter(bookmark.filterValues)"
          :key="filter?.name"
          class="filter"
        >
          <component
            v-if="filter"
            :is="typeof filter.type == 'object' && (filter.type.value as Function)()"
            :editable="false"
            :closeable="false"
            :filter="filter"
            :highlighted="filter.required"
            :value="filterValue"
          />
        </div>
      </div>
      <div class="footer">
        <v-btn
          v-if="!isNewBookmark"
          variant="text"
          color="primary"
          class="btn -remove"
          :disabled="bookmark.isDefault"
          @click="saveAsDefault"
        >
          デフォルトに設定
        </v-btn>
        <v-btn
          v-if="!isNewBookmark"
          variant="text"
          color="primary"
          class="btn -remove"
          @click="remove"
        >
          削除
        </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          class="btn -save"
          @click="save"
          >保存</v-btn
        >
      </div>
    </div>
  </modal-dialog>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.modal-dialog.-bookmark-edit {
  top: 40px;
  right: 0;
  @include screen-mobile {
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.bookmark-edit {
  padding: 15px;
  .form {
    margin-top: 10px;
    width: 100%;
    margin: 20px 0;
  }
  > .filters {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 4px;
  }
  > .footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    column-gap: 5px;
    width: 100%;
  }
}
</style>
