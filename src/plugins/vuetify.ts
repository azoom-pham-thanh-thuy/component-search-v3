import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  defaults: {
    VBtn: {
      color: 'primary',
    },
    VCheckbox: {
      hideDetails: 'auto',
      color: 'primary',
      density: 'compact'
    },
    VRadio: {
      hideDetails: 'auto',
      color: 'primary',
      density: 'compact'
    },
    VRadioGroup: {
      hideDetails: 'auto',
      color: 'primary',
      density: 'compact'
    },
    VSelect: {
      hideDetails: 'auto',
      color: 'primary',
      density: 'compact',
      variant: 'outlined'
    },
    VAutocomplete: {
      hideDetails: 'auto',
      color: 'primary',
      density: 'compact',
      variant: 'outlined'
    },
    VTextarea: {
      hideDetails: 'auto',
      color: 'primary',
      variant: 'outlined'
    },
    VTextField: {
      hideDetails: 'auto',
      color: 'primary',
      density: 'compact',
      variant: 'outlined'
    },
    VList: {
      bgColor: '#FFFFFF',
      color: 'primary'
    },
    VChip: {
      color: 'primary',
      bgColor: '#FFFFFF'
    },
  },
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme: {
        dark: false,
        colors: {
          primary: '#6200ee',
          white: '#fff',
          gray: '#dfdfdf',
          black: '#000'
        }
      }
    }
  }
})
