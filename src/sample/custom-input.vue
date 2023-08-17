<script setup lang="ts">
import { get } from 'lodash'
import { AzFilterInput, useFilterInput } from '@/main'
import { isObject } from '@/utils/app'

const { inputValue, internalValue, filter } = useFilterInput(inject('storeId')!)

const inputVal = computed({
  get: () => {
    return isObject(inputValue.value)
      ? inputValue.value
      : { fruits: [], grade: null }
  },
  set: (value) => (inputValue.value = value)
})

function isEmptyValue(value: object) {
  return !get(value, 'fruits.length') || !get(value, 'grade')
}
</script>

<template>
  <az-filter-input v-bind="{ internalValue }">
    <div class="custom-input">
      <!-- @vue-ignore -->
      <div
        v-for="item in filter.items.fruits"
        :key="item.value"
        class="filter-checkbox"
      >
        <label class="checkbox-container">
          <!-- @vue-ignore -->
          <input
            v-model="inputVal.fruits"
            type="checkbox"
            class="checkbox"
            :name="filter.name"
            :value="item.value"
          />
          <span class="check-mark"></span>
          {{ item.label }}
        </label>
      </div>

      <div>
        <div class="form-field -radio">
          <!-- @vue-ignore -->
          <label
            v-for="grade in filter.items.grades"
            :key="grade.value"
            class="filter-radio"
          >
            <!-- @vue-ignore -->
            <input
              v-model="inputVal.grade"
              type="radio"
              name="grade"
              class="radio"
              :value="grade.value"
            />
            <span class="check-mark"></span>
            {{ grade.label }}
          </label>
        </div>
      </div>
    </div>
  </az-filter-input>
</template>

<style lang="scss" scoped>
.filter-checkbox {
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  &:not(:first-child) {
    margin-left: 20px;
  }
}

.checkbox-container {
  position: relative;
  padding-left: 26px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  > .checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .check-mark {
      background-color: rgb(var(--v-theme-primary));
      border-color: rgb(var(--v-theme-primary));
    }
    &:checked ~ .check-mark:after {
      display: block;
    }
  }
  > .check-mark {
    position: absolute;
    top: 4px;
    left: 0;
    height: 18px;
    width: 18px;
    border: 2px solid #757575;
    border-radius: 2px;
    box-sizing: border-box;
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 4px;
      top: -4px;
      width: 7px;
      height: 14px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}

.filter-radio {
  position: relative;
  padding-left: 26px;
  padding-top: 1px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:not(:first-child) {
    margin-left: 20px;
  }
  > .radio {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .check-mark {
      background-color: rgb(var(--v-theme-primary));
      border-color: rgb(var(--v-theme-primary));
    }
    &:checked ~ .check-mark:after {
      display: block;
    }
  }
  > .check-mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    border: 2px solid #757575;
    border-radius: 50%;
    box-sizing: border-box;
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 4px;
      top: -4px;
      width: 7px;
      height: 14px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
</style>
