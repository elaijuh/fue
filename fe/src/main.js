import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import '@/plugins/axios'
import '@/api/feathers'

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
import VDataIterator from 'vuetify/es5/components/VDataIterator'
import VDialog from 'vuetify/es5/components/VDialog'
import VSelect from 'vuetify/es5/components/VSelect'
import VSnackbar from 'vuetify/es5/components/VSnackbar'
import transitions from 'vuetify/es5/components/transitions'
// import directives from 'vuetify/es5/directives'

// import {
//   Vuetify,
//   VApp,
//   VNavigationDrawer,
//   VFooter,
//   VList,
//   VBtn,
//   VIcon,
//   VGrid,
//   VToolbar,
//   transitions,
// } from 'vuetify'

import style from '@/styles/app.styl'

Vue.use(Vuetify, {
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
    VDataIterator,
    VDialog,
    VSelect,
    VSnackbar,
    // VFooter,
    // VBtn,
    // VIcon,
    // VGrid,
    // VToolbar,
    transitions,
  },
  theme: {
    // primary: '#1976D2',
    // secondary: '#424242',
    // accent: '#82B1FF',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107',
    primary: '#00bfa5',
    secondary: '#BDBDBD',
    accent: '#F06292',
    error: '#E57373',
    warning: '#FBC02D',
    info: '#8D6E63',
    success: '#4CAF50',
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
