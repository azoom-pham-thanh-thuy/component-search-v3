<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'
import FilterInput from '@/components/utils/filter-input.vue'
import useFilterInput from '@/composables/filter-input'
import type { Obj } from '@/types'

const { filter, inputValue, internalValue } = useFilterInput(inject('storeId'))

const inputVal = computed({
  get: () => inputValue.value ?? [],
  set: (val) => (inputValue.value = val)
})

const options = computed(() => {
  return filter.value.options?.inputCheckbox ?? {}
}) as ComputedRef<Obj<number | boolean>>

const isAllChecked = computed(() => {
  return inputValue.value?.length === filter.value.items.length
})

const allCheckButtonLabel = computed(() => {
  return isAllChecked.value ? 'すべての選択を解除' : '項目を一括選択'
})

const widthStyle = computed(() => {
  return options.value.columnSize
    ? `calc(100% / ${options.value.columnSize} - 10px)`
    : 'auto'
})

function toggleAllCheck() {
  if (isAllChecked.value) {
    inputValue.value = []
  } else {
    inputValue.value = filter.value.items.map(({ value }) => value)
  }
}
</script>

<template>
  <filter-input v-bind="{ internalValue }">
    <div class="filter-checkbox">
      <div class="checkboxes">
        <label
          v-for="item in filter.items"
          :key="item.value"
          class="checkbox-container"
          :style="{ width: widthStyle }"
        >
          <v-checkbox v-model="inputVal" class="checkbox" :value="item.value">
            <template v-slot:label>
              <div class="label">
                <v-icon class="icon" :icon="item.icon"></v-icon>
                <span class="value">{{ item.label }}</span>
              </div>
            </template>
          </v-checkbox>
        </label>
      </div>
      <div v-if="options.checkAllEnabled" class="actions">
        <v-btn
          variant="text"
          color="primary"
          class="button"
          @click="toggleAllCheck"
        >
          {{ allCheckButtonLabel }}
        </v-btn>
      </div>
    </div>
  </filter-input>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.filter-checkbox {
  > .checkboxes {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
  }
}
.checkbox-container {
  box-sizing: border-box;
  position: relative;
  padding-left: 26px;
  margin: 5px;
  cursor: pointer;
  user-select: none;
  @include screen-mobile {
    width: 100% !important;
  }
  > .label {
    display: flex;
    align-items: center;
  }
  > .label > .icon {
    font-size: 1.1rem;
    margin-right: 3px;
  }
  > .label > .value {
    margin-top: 2px;
    font-size: 1rem;
  }
}
.actions {
  width: 100%;
  text-align: right;
  padding-bottom: 5px;
}
</style>
