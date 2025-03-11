import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import router from './router'
import store from './store'
// 有这个图标才能展示
import PanelHead from './components/PanelHead.vue'

// 刷新后的动态路由添加
const localData = localStorage.getItem('pz_v3pz')
if(localData) {
  store.commit('dynamicMenu', JSON.parse(localData).menu.routerList)
  store.state.menu.routerList.forEach(item => {
    router.addRoute('main', item)
  })
}




import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app =createApp(App)
// 这里只是对页面做了element-plus的引入，因此页面内组件都不需要另外引入，但是request.js不属于页面内，要额外引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.component('PanelHead',PanelHead)

// store挂载
app.use(store)
// 路由挂载
app.use(router)
app.mount('#app')


