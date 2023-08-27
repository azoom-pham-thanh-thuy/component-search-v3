import AzSearchStore from '@/stores'
import * as dateUtil from '@/utils/date'
import { preset } from '@/utils/Preset'
import {
  AzSearch,
  FilterInput as AzFilterInput,
  FilterValue as AzFilterValue,
} from '@/components'
import useFilterInput from '@/composables/filter-input'
import useFilterValue from '@/composables/filter-value'

/** In the development environment, uncomment the lines below **/
// import { createApp } from 'vue'
// import vuetify from '@/plugins/vuetify'
// import AppComponent from '@/App.vue'

// const app = createApp(AppComponent)
// app.use(vuetify)
// app.mount('#app')

export * from '@/types'
export {
  AzSearch,
  AzFilterInput,
  AzFilterValue,
  dateUtil,
  AzSearchStore,
  preset,
  useFilterInput,
  useFilterValue
}
