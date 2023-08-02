<script setup lang="ts">
import { inject } from 'vue'
import useSearchStore from '@/stores'

withDefaults(defineProps<{ icon: string }>(), {
  icon: ''
})

const searchStore = useSearchStore(inject('storeId'))
</script>

<template>
  <div class="modal-dialog">
    <div class="header">
      <v-icon class="icon" :icon="icon" />
      <slot name="header" />
      <v-btn
        icon="mdi-close"
        density="comfortable"
        variant="text"
        class="btn -close"
        @click="searchStore.hideModal"
      />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.modal-dialog {
  @include rs-elevation(6);
  width: 500px;
  max-width: 100%;
  position: absolute;
  z-index: 9;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  > .header {
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 15px;
    background-color: #e9ebf0;
    border-radius: 4px 4px 0 0;
    color: rgb(var(--v-theme-primary));
  }
  > .header > .icon {
    margin-right: 6px;
  }
  > .header > .btn.-close {
    margin: 0 0 0 auto;
  }
}
</style>
