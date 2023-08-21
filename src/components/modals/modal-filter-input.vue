<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ModalDialog } from '@/components'
import useSearchStore from '@/stores'

const searchStore = useSearchStore(inject('storeId')!)
const { selectedFilter } = storeToRefs(searchStore)
</script>

<template>
  <modal-dialog :icon="selectedFilter.icon" class="-filter-input">
    <template v-slot:header>
      {{ selectedFilter.label }}
      <b v-if="selectedFilter.allowSingleSearch">*</b>
    </template>
    <component
      :is="
        typeof selectedFilter.type == 'object' && (selectedFilter.type.input as Function)()
      "
      :key="selectedFilter.name"
      class="filter-input-content"
    />
  </modal-dialog>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.modal-dialog.-filter-input {
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  @include screen-mobile {
    width: 100%;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.filter-input-content {
  padding: 15px;
}
</style>
