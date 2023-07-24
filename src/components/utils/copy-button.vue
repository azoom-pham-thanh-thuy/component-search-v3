<script setup lang="ts">
import { ref, computed } from 'vue'
import qs from 'qs'
import { storeToRefs } from 'pinia'
import useSearchStore from '@/stores'

defineProps({
  value: {
    type: Object,
    default: () => ({})
  }
})

const searchStore = useSearchStore()
const { settings } = storeToRefs(searchStore)
const message = ref('')
const tooltip = ref<null | { [key: string]: number }>(null)
const tooltipShown = computed(() => Boolean(tooltip.value))

async function copySearchCondition(event: Event, value: object) {
  message.value = await copyLinkToClipboard(value)
  showTooltip(event)
}

function showTooltip(event: any) {
  const rect = event.target.getBoundingClientRect()
  tooltip.value = {
    positionTop: rect.bottom + window.pageYOffset + 5,
    positionLeft: rect.left + window.pageXOffset - 8
  }
  setTimeout(() => {
    tooltip.value = null
  }, 1000)
}

function copyLinkToClipboard(filterValues: object) {
  if (!document || !location) {
    console.error('Clipboard is not available')
    return 'Copy failed!'
  }
  let el = document.createElement('input')
  document.body.appendChild(el)
  el.value = `${location.href}?${qs.stringify(filterValues)}`
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return 'Copied!'
}
</script>

<template>
  <div class="copy-button">
    <v-btn
      v-if="settings.searchWithQueryStringOnInit"
      icon="mdi-link"
      variant="text"
      density="comfortable"
      class="button -copylink material-icons"
      @click="copySearchCondition($event, value)"
    >
    </v-btn>
    <div
      class="tooltip"
      v-if="tooltipShown"
      :style="{
        top: `${tooltip && tooltip.positionTop}px`,
        left: `${tooltip && tooltip.positionLeft}px`
      }"
    >
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.copy-button {
  > .button {
    --v-btn-height: 28px;
    border: none;
    cursor: pointer;
    outline: none;
  }
  > .tooltip {
    position: fixed;
    border-radius: 6px;
    background-color: rgba(var(--v-theme-on-surface), 0.8);
    color: rgb(var(--v-theme-surface));
    padding: 8px;
    margin: 0;
    z-index: 3;
    font-size: 0.7rem;
    min-width: 50px;
    &:before {
      content: '';
      position: absolute;
      top: -12px;
      left: 20px;
      border: 6px solid transparent;
      border-bottom: 6px solid rgba(var(--v-theme-on-surface), 0.8);
      z-index: 2;
    }
  }
}
</style>
