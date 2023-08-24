<script lang="ts" setup>
import type { InputType, FilterItem } from '@/types'

const props = defineProps({
  modelValue: {
    type: String as PropType<InputType>,
    required: true,
  },
  valueKey: {
    type: String,
    required: true,
  },
  displayKey: {
    type: String,
    required: true,
  },
  identifyKey: {
    type: String as PropType<keyof FilterItem>,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  suggestions: {
    type: Array as PropType<FilterItem[]>,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: InputType): void
}>()

const selectionSearch = ref<string>('')
const selection = computed<InputType>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const matches = computed(() => {
  return props.suggestions.filter((obj) =>
    String(obj[props.identifyKey]).includes(selectionSearch.value)
  )
})
</script>

<template>
  <div :class="['input-autocomplete', { '-error': error }]">
    <v-autocomplete
      v-model="selection"
      v-model:search="selectionSearch"
      hide-no-data
      variant="outlined"
      :label="placeholder"
      :items="matches"
      :item-title="displayKey"
      :item-value="valueKey"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-autocomplete {
  width: var(--input-autocomplete-width, 250px);
  min-width: 100px;
}
</style>
