<script setup lang="ts">
import { inject } from 'vue'
import ModalDialog from '@/components/utils/modal-dialog.vue'
import useSearchStore from '@/stores'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore(inject('storeId'))
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
        typeof selectedFilter.type == 'object' && selectedFilter.type.input()
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
