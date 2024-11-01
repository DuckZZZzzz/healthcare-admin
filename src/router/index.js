import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../pages/Main.vue";
import Dashboard from "../pages/dashboard/index.vue";
import Admin from "../pages/auth/admin/index.vue";
import Group from "../pages/auth/group/index.vue";
import Staff from "../pages/vppz/staff/index.vue";
import Order from "../pages/vppz/order/index.vue";
import Login from "../pages/login/index.vue";

// 当 path 直接作为一个属性存在时，它通常表示一个绝对路径或者是相对于应用根目录的路径
// 当 path 放在 meta 对象中时，这些信息不会影响路由匹配，但可以用来传递额外的信息

// 以下两种情况可以直接使用到path属性

// 1、导航守卫
// const router = new VueRouter({
//   routes: [
//     { path: '/', component: HomeComponent },
//     { path: '/about', component: AboutComponent }
//   ]
// });

// router.beforeEach((to, from, next) => {
//   console.log('即将访问的路径:', to.path);
//   next();
// });

// 2、组件中获取当前路由路径
// export default {
//   created() {
//     console.log('当前路径:', this.$route.path);
//   }
// };

const routes = [
  {
    path: "/",
    component: Main,
    name: "main",
    children: [
      {
        path: "dashboard",
        meta: {
          id: "1",
          name: "控制台",
          icon: "Platform",
          path: "/dashboard",
          describe: "用于展示当前系统中的统计数据、统计报表及重要实时数据",
        },
        component: Dashboard,
      },
      {
        path: "auth",
        meta: { id: "2", name: "权限管理", icon: "Grid" },
        children: [
          {
            path: "",
            alias: ["admin"],
            meta: {
              id: "1",
              name: "账号管理",
              icon: "Avatar",
              path: "/auth/admin",
              describe: "管理员可以进行编辑，权限修改后需要登出才会生效",
            },
            component: Admin,
          },
          {
            path: "group",
            meta: {
              id: "2",
              name: "菜单管理",
              icon: "Menu",
              path: "/auth/group",
              describe:
                "菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取",
            },
            component: Group,
          },
        ],
      },
      {
        path: "vppz",
        meta: { id: "3", name: "DUCK陪诊", icon: "BellFilled" },
        children: [
          {
            path: "",
            alias: ["staff"],
            meta: {
              id: "1",
              name: "陪护管理",
              icon: "Checked",
              path: "/vppz/staff",
              describe: "陪护师可以进行创建和修改，设置对应生效状态控制C端选择",
            },
            component: Staff,
          },
          {
            path: "order",
            meta: {
              id: "2",
              name: "订单管理",
              icon: "List",
              path: "/vppz/order",
              describe:
                "C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改",
            },
            component: Order,
          },
        ],
      },
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

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = localStorage.getItem("pz_token");
    if (token) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
