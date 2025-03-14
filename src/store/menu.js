// 获取之前用vuex-persistedstate插件存储的数据, 没有数据就返回空对象
const localData = localStorage.getItem("pz_v3pz");

const state = localData
  ? localData
  : {
      isCollapse: false,
      selectMenu: [],
      routerList: [],
      activeMenu: '/dashboard'
    };

const mutations = {
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse;
  },
  addMenu(state, payload) {
    // 学习这句的写法
    state.selectMenu.findIndex((item) => item.path === payload.path) === -1 &&
      state.selectMenu.push(payload);
  },
  closeMenu(state, payload) {
    // 找到点击导航按钮的索引 二刷发现没必要啊！！
    // const index = state.selectMenu.findIndex(
    //   (val) => val.name === payload.name
    // );
    // 通过索引删除数组中的元素
    state.selectMenu.splice(payload, 1);
  },
  dynamicMenu(state, payload) {
    // 通过glob导入文件
    const modules = import.meta.glob("../pages/**/**/*.vue");
    // vite的glob方法拿到所有的pages，根据名称匹配然后拼接到动态路由的数据里
    console.log(modules);
    function routerSet(router) {
      router.forEach((route) => {
        // 没有子菜单，需要拼接路由数据
        if (!route.children) {
          const url = `../pages${route.meta.path}/index.vue`;
          console.log(url, modules[url]);

          // 拿到获取的vue组件
          route.component = modules[url];
        } else {
          routerSet(route.children);
        }
      });
    }
    routerSet(payload);
    // 拿到更新后的路由数据并赋值给state
    state.routerList = payload;
  },
  // resetState(state) {
  //   // 将 state 重置为初始状态
  //   state.isCollapse = false;
  //   state.selectMenu = [];
  //   state.routerList = [];
  // },
  changeActiveMenu(state, payload) {
    state.activeMenu = payload;
  }
};

export default {
  state,
  mutations,
};
