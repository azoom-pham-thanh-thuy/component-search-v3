<script lang="ts" setup>
import { computed } from 'vue'
import DatePickerNext from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import 'vue-datepicker-next/locale/ja'

interface Props {
  modelValue?: any
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'date',
  placeholder: ''
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: null | string): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <date-picker-next
    v-model:value="internalValue"
    value-type="format"
    input-class="input"
    :type="type"
    :placeholder="placeholder"
  />
</template>

<style lang="scss">
// @import '~vue-datepicker-next/scss/index.scss';

.mx-datepicker {
  padding: 10px 16px;
  border-radius: 3px;
  border: 1px solid rgb(var(--v-theme-primary));
  font-size: 16px;
}
.mx-input-wrapper input {
  outline: 0 none;
  border: none;
}
</style>
