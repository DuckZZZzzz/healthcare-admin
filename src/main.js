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

// 这里只是对页面做了element-plus的引入，因此页面内组件都不需要另外引入，但是request.js不属于页面内，要额外引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}