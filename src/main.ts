import { createApp, type App } from 'vue'
import vuetify from '@/plugins/vuetify'
import AzSearchStore from '@/stores'
import * as dateUtil from '@/utils/date'
import { preset } from '@/utils/Preset'
import AppComponent from '@/App.vue'
import {
  AzSearch,
  FilterInput as AzFilterInput,
  FilterValue as AzFilterValue,
} from '@/components'
import useFilterInput from '@/composables/filter-input'
import useFilterValue from '@/composables/filter-value'

const app = createApp(AppComponent)
app.use(vuetify)
app.mount('#app')

// export default {
//   install: (app: App) => {
//     app.component('AzSearch', AzSearch)
//     app.component('AzFilterInput', AzFilterInput)
//     app.component('AzFilterValue', AzFilterValue)
//   },
// }

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
