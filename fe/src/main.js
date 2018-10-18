import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify/es5/components/Vuetify'
import VApp from 'vuetify/es5/components/VApp'
import VGrid from 'vuetify/es5/components/VGrid'
import VCard from 'vuetify/es5/components/VCard'
import VToolbar from 'vuetify/es5/components/VToolbar'
import VTooltip from 'vuetify/es5/components/VTooltip'
import VBtn from 'vuetify/es5/components/VBtn'
import VIcon from 'vuetify/es5/components/VIcon'
import VForm from 'vuetify/es5/components/VForm'
import VTextField from 'vuetify/es5/components/VTextField'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VList from 'vuetify/es5/components/VList'
import VDivider from 'vuetify/es5/components/VDivider'
import VSubheader from 'vuetify/es5/components/VSubheader'
import VMenu from 'vuetify/es5/components/VMenu'
import VDataTable from 'vuetify/es5/components/VDataTable'
import VDataIterator from 'vuetify/es5/components/VDataIterator'
import VDialog from 'vuetify/es5/components/VDialog'
import VSelect from 'vuetify/es5/components/VSelect'
import VAutocomplete from 'vuetify/es5/components/VAutocomplete'
import VSnackbar from 'vuetify/es5/components/VSnackbar'
import VImg from 'vuetify/es5/components/VImg'
import transitions from 'vuetify/es5/components/transitions'
import { Ripple } from 'vuetify/es5/directives'

import '@mdi/font/css/materialdesignicons.css'
import '@/styles/app.styl'

// plugins
import Axios from '@/plugins/axios'
Vue.use(Axios)
import Feathers from '@/plugins/feathers'
Vue.use(Feathers)

// vuetify
import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify, {
  iconfont: 'mdi',
  components: {
    VApp,
    VGrid,
    VCard,
    VToolbar,
    VTooltip,
    VBtn,
    VIcon,
    VForm,
    VTextField,
    VNavigationDrawer,
    VDivider,
    VList,
    VSubheader,
    VMenu,
    VDataTable,
    VDataIterator,
    VDialog,
    VSelect,
    VAutocomplete,
    VSnackbar,
    VImg,
    // VFooter,
    // VBtn,
    // VIcon,
    // VGrid,
    // VToolbar,
    transitions,
  },
  directives: { Ripple },

  theme: {
    primary: {
      base: colors.blue.lighten2,
      lighten1: colors.grey.base,
    },
    secondary: colors.cyan.lighten4,
    accent: colors.purple.lighten3,
    error: colors.red.lighten2,
    warning: colors.amber.lighten2,
    info: colors.brown.lighten1,
    success: colors.green.lighten1,
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
