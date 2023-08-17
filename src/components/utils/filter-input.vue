<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import useSearchStore from '@/stores'
import Preset from '@/utils/Preset'
import { isEmptyValue } from '@/utils/app'
import type { InputType } from '@/types'

const props = defineProps({
  internalValue: {
    type: [null, Object] as PropType<InputType>,
    required: true
  }
})

const searchStore = useSearchStore(inject('storeId')!)
const { selectedFilter: filter, runtime } = storeToRefs(searchStore)

const addButtonLabel = computed(() => {
  return Object.keys(runtime.value.filterValues).includes(
    String(filter.value?.name)
  )
    ? '絞り込みを変更'
    : '絞り込みに追加'
})

const canApply = computed(() => {
  if (!filter.value?.allowEmptyValue) {
    return !isEmpty(props.internalValue)
  }
  return true
})

function isEmpty(value: any) {
  if (Preset.isPreset(value)) return false
  return (inject<Function>('isEmptyValue') ?? isEmptyValue)(value)
}

function apply() {
  const value = cloneDeep(props.internalValue)
  searchStore.updateFilterValue([filter.value?.name, value])
  searchStore.hideModal()
}

function searchWithThis() {
  searchStore.updateFilterValues({ [filter.value!.name]: props.internalValue })
  searchStore.callSearch()
  searchStore.hideModal()
}
</script>

<template>
  <div class="filter-input">
    <div class="content">
      <slot />
    </div>
    <div class="footer">
      <div v-if="filter" class="helper">{{ filter.helperText }}</div>
      <div class="actions">
        <v-btn
          v-if="filter?.allowSingleSearch"
          class="button -search"
          color="primary"
          :disabled="!canApply"
          @click="searchWithThis"
        >
          この項目のみで検索
        </v-btn>
        <v-btn
          class="button -add"
          variant="outlined"
          color="primary"
          :disabled="!canApply"
          @click="apply"
        >
          {{ addButtonLabel }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.filter-input {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  > .footer > .helper {
    margin-top: 10px;
    color: rgba(var(--v-theme-black), 0.38);
  }
  > .footer > .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  > .footer > .actions > .button {
    margin: 0 3px;
  }
}
</style>
