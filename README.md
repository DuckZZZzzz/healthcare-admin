# healthcare-admin

## 简介

healthcare-admin 是一个基于 Vue 3 和 Element Plus 的后台管理系统。它具有以下特点：

- 动态路由：根据用户权限动态创建右侧菜单栏及动态路由。
- 权限管理：包括账号管理和菜单管理。
- 陪诊管理：包括陪护管理和订单管理。
- 登录与退出：支持用户登录和退出功能。

## 功能

- 动态路由：根据用户权限动态创建右侧菜单栏及动态路由。
- 权限管理：包括账号管理和菜单管理。
- 陪诊管理：包括陪护管理和订单管理。
- 登录与退出：支持用户登录和退出功能。

## 目录结构

```
healthcare-admin/
├── .eslintrc.js
├── deploy.sh
├── package.json
├── public
│   └── images
├── README.md
├── src
│   ├── api
│   │   └── index.js
│   ├── App.vue
│   ├── assets
│   ├── components
│   │   ├── aside.vue
│   │   ├── header.vue
│   │   ├── panelHead.vue
│   │   └── treeMenu.vue
│   ├── main.js
│   ├── pages
│   │   ├── auth
│   │   │   ├── admin
│   │   │   │   └── index.vue
│   │   │   └── group
│   │   │       └── index.vue
│   │   ├── dashboard
│   │   │   └── index.vue
│   │   ├── login
│   │   │   └── index.vue
│   │   ├── Main.vue
│   │   └── vppz
│   │       ├── order
│   │       │   └── index.vue
│   │       └── staff
│   │           └── index.vue
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── menu.js
│   └── utils
│       └── request.js
└── vite.config.js
```

## 安装

1. 克隆项目到本地

```bash
git clone https://github.com/DuckZZZzzz/healthcare-admin-page.git
```

2. 进入项目目录

```bash
cd healthcare-admin-page
```

3. 安装依赖

```bash
npm install
```

4. 启动项目

```bash
npm run dev
```

## 部署

1. 打包项目

```bash
npm run build
```

2. 进入 dist 目录

```bash
cd dist
```

3. 初始化 git 仓库

```bash
git init
```

4. 添加文件到 git 仓库

```bash
git add .
```

5. 提交代码

```bash
git commit -m "deploy"
```

6. 添加远程仓库

```bash
git remote add origin git@github.com:DuckZZZzzz/healthcare-admin-page.git
```

7. 推送代码到远程仓库

```bash
git push origin master -f -u
```

8. 打开浏览器访问

```bash
https://duckzzzzzz.github.io/healthcare-admin-page/
```

## 注意事项

- 请确保你已经安装了 Node.js 和 npm。
- 在部署项目之前，请确保你已经修改了 `deploy.sh` 脚本中的远程仓库地址。
- 在部署项目之前，请确保你已经修改了 `vite.config.js` 中的 `base` 配置项。

## 贡献

如果你有任何建议或想要贡献代码，请随时提交 Pull Request 或创建 Issue。

## 许可证

本项目采用 MIT 许可证。有关详细信息，请查看 LICENSE 文件。

# 开发笔记

## `rules`、`model` 和 `ref` 都是 `el-form` 组件的一些属性，它们各自有不同的用途。

1. **rules**：

   - 这个属性是用来定义表单验证规则的。它是一个对象，包含多个字段及其对应的验证规则（如必填检查、格式检查等）。当表单需要进行验证逻辑时，就会用到这个属性。例如：

     ```javascript
     rules: {
       name: [{ required: true, message: "请输入姓名", trigger: "blur" }];
     }
     ```

     在这里，`name` 字段将被要求必须填写，否则会显示错误信息。

2. **model**：

   - `model` 属性是用来绑定表单数据源的。通常情况下，我们会用一个 Vue 实例中的 data 对象来存储表单的数据。通过设置 `model` 属性为这个 data 对象，可以实现表单控件与数据的双向绑定。例如：

     ```javascript
     data() {
       return {
         ruleForm: {
           name: ''
         }
       };
     }
     ```

     然后在模板中通过 `:model="ruleForm"` 绑定到 `el-form` 上。

3. **ref**：

   - `ref` 是 Vue 提供的一个特性，用于给元素或子组件注册引用信息。通过设置 `ref` 属性，可以在父组件中访问到子组件或元素实例，这对于调用子组件的方法或访问其属性非常有用。比如，你可以通过 `this.$refs.ruleFormRef.validate()` 来触发整个表单的验证。在这个项目中ref只起到一个拿到实例进行表单校验的作用。

## 在终端中退出 vim

对于 vim 或 vi：
按 Esc 键回到普通模式。
输入 :q! 并回车来放弃编辑并退出。
如果您想保存编辑并退出，可以输入 :wq 或者仅仅 :w 就足够了，因为您是在写入 commit message。

## 自定义单元格模板

在 Vue.js 中，Element UI 提供了 `<el-table>` 组件来展示数据列表。通常情况下，表格中的每一列都会直接展示数据对象中的某个属性值。但是，有时候我们需要对这些数据进行格式化或者添加一些额外的操作，这时候就需要使用自定义单元格模板。

1. 如何实现

在 `<el-table-column>` 标签内，你可以使用 `<template>` 标签来定义一个自定义模板。在这个模板中，可以使用 `#default="scope"` 形式的作用域插槽来访问当前行的数据以及其它相关信息。这里的 `scope` 是一个包含当前行数据的对象。

2. 示例代码

假设你有如下的数据结构：

```javascript
data() {
  return {
    tableData: [
      { id: 1, name: '张三', permissions_id: 1 },
      { id: 2, name: '李四', permissions_id: 2 },
      // 更多数据...
    ],
    permissionsMap: {
      1: '管理员',
      2: '编辑',
      // 更多权限...
    }
  };
}
```

在你的模板中，你可以这样写：

```html
<el-table :data="tableData">
  <el-table-column prop="name" label="姓名"></el-table-column>
  <el-table-column prop="permissions_id" label="所属组别" width="500px">
    <template #default="scope">
      <!-- 使用自定义函数 permissionName 显示权限名 -->
      {{ permissionName(scope.row.permissions_id) }}
    </template>
  </el-table-column>
</el-table>
```

在 Vue 实例的方法部分，你需要定义 `permissionName` 方法：

```javascript
methods: {
  permissionName(id) {
    return this.permissionsMap[id] || '未知权限';
  }
}
```

## markdown 常用语法

[链接](https://lxblog.com/qianwen/share?shareId=8c469c32-4158-4c2b-826c-462f33108807)

# 项目难点

## 根据用户权限动态创建右侧菜单栏及动态路由

1.创建项目结构 2.加载基础路由结构 3.登录服务器端实现 4.登录获取 token
5.store 与本地存储 token 6.路由权限登录判断 7.用户权限获取 8.路由比对方法 9.路由权限配置完成 10.拷贝 UI 结构 11.路由权限管理完结

创建并添加完动态路由后，如果页面刷新，routerList 数据就会销毁掉，因此需要使用插件：vuex-persistedstate 来保持数据的持久化
如果没有使用 vuex-persistedstate 插件或者其他类似的持久化存储插件，Vuex 的数据在页面刷新时会重新初始化。这是因为 Vuex 的状态存储在内存中，当页面刷新时，内存中的数据会被重置，导致 Vuex 的状态也被重置。

## resetState 的作用

我发现退出登录时虽然用了 localStorage.remove 方法，但由于 vuex-persistedstate 的机制或者浏览器本身的其他什么原因，其实是没有清空的，表现在退出登录时如果不刷新就重新登录，浏览器还会保留上一次退出时的浏览痕迹，比如我上一次的 selectedmenu 在重新登录时应该被清空但实际没有，所以我在退出登录时用了 resetState 方法，这个方法是用来重置 Vuex 中的数据的。使用这个方法后，退出登录时，Vuex 中的数据会被重置，包括 selectedmenu，这样重新登录时就不会保留上一次的浏览痕迹了。但是产生了新的问题就是，我退出登录后，vppz的数据并没有被remove，这就导致在开发时会经常报错说找不到路由，权衡了之后我删除了ressetState方法。


### 倒计时在后台被暂停的解决办法
1. 每次更新倒计时时，使用当前系统时间与预设的结束时间计算剩余时间，而非依赖定时器的累计递减，确保时间准确性。
2. 