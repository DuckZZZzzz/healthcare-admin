import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import router from './router'
import store from './store'
// 有这个图标才能展示
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app =createApp(App)

app.use(router)
app.use(store)

app.mount('#app')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}