import { createStore } from 'vuex'
import menu from './menu'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [new createPersistedState({
    key: 'pz_v3pz'
  })],
  modules: {
    menu
  }
})