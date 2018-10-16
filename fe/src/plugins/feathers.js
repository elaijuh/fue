import Vue from 'vue'
import feathers from '@/feathers'

Vue.use(plugin, feathers)

function plugin(Vue, feathers) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.feathers = feathers

  Object.defineProperties(Vue.prototype, {
    $feathers: {
      get() {
        return feathers
      },
    },
  })
}

export default plugin
