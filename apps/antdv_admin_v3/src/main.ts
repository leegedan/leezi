import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { App } from 'vue'
import Root from './App.vue'
import { setupI18n } from './locales'
import router from '~/router'
import { cmpts, cache, directives } from './core'

import '~/router/router-guard'
import 'ant-design-vue/dist/reset.css'
import '~/assets/styles/reset.css'
import 'uno.css'
import './app.less'

const pinia = createPinia()
async function start() {
  const app: App = createApp(Root)
  app.use(pinia)
  await setupI18n(app)
  app.use(router)
  app.use(cmpts)
  app.use(cache)
  app.use(directives)
  app.mount('#app')
  app.config.performance = true
}

start()
