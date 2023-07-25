import { createApp } from 'vue'
import vuetify from '@/plugins/vuetify'
// import { createPinia } from 'pinia'
import AzSearchStore from '@/stores'
import * as dateUtil from '@/utils/date'
import { preset } from '@/utils/Preset'
import App from '@/App.vue'
import AzSearch from '@/components/search.vue'
import AzFilterInput from '@/components/utils/filter-input.vue'
import AzFilterValue from '@/components/utils/filter-value.vue'
import useFilterInput from '@/composables/filter-input'
import useFilterValue from '@/composables/filter-value'

// createApp(App).use(vuetify).use(createPinia()).mount('#app')
createApp(App).use(vuetify).mount('#app')

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
