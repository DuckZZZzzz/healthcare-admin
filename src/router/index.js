import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../pages/Main.vue";
import Login from "../pages/login/index.vue";
import store from "../store/index.js";


const routes = [
  {
    path: "/",
    component: Main,
    name: "main",
    redirect: (to) => {
      const localData = localStorage.getItem("pz_v3pz");
      if (localData) {
        console.log(JSON.parse(localData));
        // 有子菜单就进入子菜单第一个，没有子菜单就进入当前第一个菜单
        const child = JSON.parse(localData).menu.routerList[0].children;
        if (child) {
          return child[0].meta.path;
        } else {
          return JSON.parse(localData).menu.routerList[0].meta.path;
        }
      } else {
        return "/login";
      }
    },
    children: [
      
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = localStorage.getItem("pz_token");
    if (token) {
      next();
      // 接下来到所去的页面会发请求，请求头会进行token的验证的
    } else {
      next("/login");
    }
  }
});
router.afterEach((to) => {
  console.log(store);
  store.commit("changeActiveMenu", to.path);
});
export default router;
